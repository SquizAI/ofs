# Data Models & Database Schemas
## OFS AI-Enhanced Platform Data Architecture

**Version:** 1.0.0
**Last Updated:** January 2025
**Database:** PostgreSQL 15+ (Primary), ClickHouse (Analytics), Redis (Cache)

---

## Table of Contents

1. [Database Architecture](#database-architecture)
2. [Core Domain Models](#core-domain-models)
3. [AI & ML Data Models](#ai--ml-data-models)
4. [Analytics Models](#analytics-models)
5. [Indexes & Performance](#indexes--performance)
6. [Data Relationships](#data-relationships)
7. [Migration Strategy](#migration-strategy)

---

## Database Architecture

### Multi-Database Strategy

```
┌─────────────────────────────────────────────────────────┐
│                    Application Layer                     │
└─────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┼───────────────┐
            │               │               │
┌───────────▼──────┐ ┌──────▼──────┐ ┌─────▼──────┐
│   PostgreSQL     │ │  ClickHouse  │ │   Redis    │
│   (OLTP/Core)    │ │  (Analytics) │ │  (Cache)   │
└──────────────────┘ └──────────────┘ └────────────┘
```

**PostgreSQL 15+ (Primary OLTP)**
- Core transactional data
- User accounts, projects, products
- Strong consistency requirements
- JSONB for flexible schema fields

**ClickHouse (Analytics OLAP)**
- Event tracking and analytics
- Time-series data
- High-volume read queries
- Aggregated reports

**Redis 7+ (Cache & Session)**
- Session management
- Real-time data caching
- Rate limiting
- Message queues

---

## Core Domain Models

### Users & Authentication

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  email_verified_at TIMESTAMP,
  password_hash VARCHAR(255),

  -- Profile
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  company VARCHAR(255),
  title VARCHAR(100),

  -- User type
  user_type VARCHAR(50) NOT NULL, -- 'designer', 'dealer', 'sales_rep', 'facilities_manager', 'architect'

  -- OAuth providers
  google_id VARCHAR(255) UNIQUE,
  microsoft_id VARCHAR(255) UNIQUE,

  -- Preferences
  preferences JSONB DEFAULT '{}'::jsonb,
  -- Example: {"theme": "dark", "units": "imperial", "notifications": {"email": true}}

  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'inactive', 'suspended'
  last_login_at TIMESTAMP,

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_type ON users(user_type) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status ON users(status);

-- User roles & permissions
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'admin', 'user', 'viewer', 'contributor'
  resource_type VARCHAR(50), -- 'organization', 'project', 'team'
  resource_id UUID,
  granted_by UUID REFERENCES users(id),
  granted_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,

  UNIQUE(user_id, role, resource_type, resource_id)
);

CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_resource ON user_roles(resource_type, resource_id);

-- Organizations/Teams
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- 'dealer', 'design_firm', 'corporate', 'ofs_internal'

  -- Billing
  subscription_tier VARCHAR(50) DEFAULT 'free', -- 'free', 'professional', 'enterprise'
  subscription_status VARCHAR(50) DEFAULT 'active',
  billing_email VARCHAR(255),

  -- Contact
  website VARCHAR(255),
  phone VARCHAR(20),
  address JSONB,

  -- Settings
  settings JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Organization memberships
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'owner', 'admin', 'member', 'viewer'
  joined_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(organization_id, user_id)
);

CREATE INDEX idx_org_members_org ON organization_members(organization_id);
CREATE INDEX idx_org_members_user ON organization_members(user_id);
```

---

### Projects & Workspaces

```sql
-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Ownership
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,

  -- Basic info
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'in_progress', 'approved', 'completed', 'archived'

  -- Client information
  client JSONB,
  -- Example: {"name": "Acme Corp", "email": "contact@acme.com", "phone": "+1-555-123-4567"}

  -- Project requirements (captured from conversation)
  requirements JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "space_type": "open_office",
  --   "employee_count": 150,
  --   "workstation_count": 120,
  --   "meeting_rooms": 8,
  --   "special_requirements": ["standing_desks", "collaboration_zones"]
  -- }

  -- Budget
  budget JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "min": 500000,
  --   "max": 750000,
  --   "target": 600000,
  --   "currency": "USD",
  --   "selected_scenario": "scenario_balanced"
  -- }

  -- Timeline
  timeline JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "delivery_date": "2025-06-15",
  --   "installation_date": "2025-06-20",
  --   "flexibility_days": 14
  -- }

  -- Preferences
  preferences JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "sustainability_priority": "high",
  --   "style": ["modern", "minimalist"],
  --   "ergonomics": true,
  --   "preferred_brands": ["OFS", "HBF"]
  -- }

  -- Current state
  current_step VARCHAR(100), -- Tracks where in the workflow they are
  progress_pct SMALLINT DEFAULT 0,

  -- Metadata
  tags TEXT[],
  metadata JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_projects_owner ON projects(owner_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_org ON projects(organization_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_created ON projects(created_at DESC);
CREATE INDEX idx_projects_tags ON projects USING GIN(tags);

-- Project collaborators
CREATE TABLE project_collaborators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50) NOT NULL, -- 'owner', 'editor', 'viewer', 'commenter'
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMP DEFAULT NOW(),
  accepted_at TIMESTAMP,

  UNIQUE(project_id, user_id)
);

CREATE INDEX idx_proj_collab_project ON project_collaborators(project_id);
CREATE INDEX idx_proj_collab_user ON project_collaborators(user_id);

-- Project versions/snapshots
CREATE TABLE project_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  snapshot JSONB NOT NULL, -- Full project state at this version
  change_summary TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(project_id, version_number)
);

CREATE INDEX idx_proj_versions_project ON project_versions(project_id, version_number DESC);
```

---

### Floor Plans & Space Data

```sql
-- Floor plans
CREATE TABLE floor_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- File information
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  file_format VARCHAR(10), -- 'pdf', 'png', 'jpg', 'dwg', 'dxf'

  -- Processing status
  status VARCHAR(50) DEFAULT 'uploaded', -- 'uploaded', 'processing', 'analyzed', 'failed'
  processing_started_at TIMESTAMP,
  processing_completed_at TIMESTAMP,
  processing_error TEXT,

  -- Analysis results
  analysis JSONB,
  -- Example: {
  --   "dimensions": {"total_area_sqft": 10000, "usable_area_sqft": 8500},
  --   "detected_spaces": [...],
  --   "structural_elements": [...],
  --   "compliance": {...}
  -- }

  -- Metadata
  scale VARCHAR(50), -- "1/4 inch = 1 foot"
  uploaded_by UUID REFERENCES users(id),

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

CREATE INDEX idx_floor_plans_project ON floor_plans(project_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_floor_plans_status ON floor_plans(status);

-- Detected spaces from floor plan
CREATE TABLE spaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  floor_plan_id UUID NOT NULL REFERENCES floor_plans(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Space identification
  name VARCHAR(255),
  type VARCHAR(100), -- 'open_office', 'private_office', 'meeting_room', 'collaboration', 'breakroom', etc.

  -- Dimensions
  area_sqft NUMERIC(10, 2),
  dimensions JSONB, -- {"width_ft": 80, "length_ft": 75, "height_ft": 9}

  -- Location on floor plan
  bbox JSONB, -- Bounding box coordinates [x, y, width, height]
  polygon JSONB, -- More precise boundary points

  -- Capacity & characteristics
  suggested_capacity INTEGER,
  characteristics JSONB,
  -- Example: {
  --   "natural_light": "high",
  --   "windows": 4,
  --   "doors": 2,
  --   "columns": [{"x": 200, "y": 200}],
  --   "hvac_zones": 2
  -- }

  -- AI detection confidence
  detection_confidence NUMERIC(3, 2), -- 0.00 to 1.00

  -- Manual overrides
  manually_edited BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_spaces_floor_plan ON spaces(floor_plan_id);
CREATE INDEX idx_spaces_project ON spaces(project_id);
CREATE INDEX idx_spaces_type ON spaces(type);
```

---

### Products & Catalog

```sql
-- Products catalog
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Product identification
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- 'seating', 'desks', 'tables', 'storage', 'accessories', etc.
  subcategory VARCHAR(100),

  -- Brand
  brand VARCHAR(100) DEFAULT 'OFS',
  manufacturer VARCHAR(100),
  collection VARCHAR(100),

  -- Pricing
  list_price NUMERIC(10, 2) NOT NULL,
  dealer_price NUMERIC(10, 2),
  msrp NUMERIC(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',

  -- Specifications
  specifications JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "dimensions": {"width_in": 26, "depth_in": 26, "height_in": 41},
  --   "weight_lbs": 45,
  --   "weight_capacity_lbs": 300,
  --   "materials": ["aluminum", "mesh", "recycled_plastic"],
  --   "colors_available": ["black", "gray", "blue"],
  --   "features": ["adjustable_height", "lumbar_support", "armrests"]
  -- }

  -- Sustainability
  sustainability JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "score": 87,
  --   "certifications": ["BIFMA LEVEL 3", "GREENGUARD Gold"],
  --   "recycled_content_pct": 45,
  --   "recyclable_pct": 95,
  --   "carbon_footprint_kg": 12.5
  -- }

  -- Availability
  in_stock BOOLEAN DEFAULT true,
  lead_time_days INTEGER DEFAULT 14,
  moq INTEGER DEFAULT 1, -- Minimum order quantity

  -- Media
  images JSONB DEFAULT '[]'::jsonb,
  -- Example: [{"url": "https://...", "type": "front", "alt": "..."}, ...]
  model_3d_url TEXT,
  ar_asset_url TEXT,

  -- Search & discovery
  tags TEXT[],
  search_vector TSVECTOR,

  -- ML embeddings for recommendation
  embedding VECTOR(384), -- Using pgvector extension

  -- Status
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'discontinued', 'archived'

  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_products_sku ON products(sku) WHERE deleted_at IS NULL;
CREATE INDEX idx_products_category ON products(category) WHERE status = 'active';
CREATE INDEX idx_products_brand ON products(brand) WHERE status = 'active';
CREATE INDEX idx_products_search ON products USING GIN(search_vector);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_products_embedding ON products USING ivfflat (embedding vector_cosine_ops); -- For similarity search

-- Product relationships (e.g., "pairs well with", "part of set")
CREATE TABLE product_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  relationship_type VARCHAR(50) NOT NULL, -- 'compatible', 'alternative', 'accessory', 'collection', 'bundle'
  strength NUMERIC(3, 2), -- Relationship strength 0.00 to 1.00

  UNIQUE(product_id, related_product_id, relationship_type)
);

CREATE INDEX idx_prod_rel_product ON product_relationships(product_id);
CREATE INDEX idx_prod_rel_related ON product_relationships(related_product_id);

-- Product variants (colors, finishes, configurations)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,

  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255),

  -- Variant attributes
  attributes JSONB DEFAULT '{}'::jsonb,
  -- Example: {"color": "blue", "finish": "matte", "configuration": "with_arms"}

  -- Pricing (if different from base)
  price_adjustment NUMERIC(10, 2) DEFAULT 0,

  -- Availability
  in_stock BOOLEAN DEFAULT true,
  lead_time_days INTEGER,

  -- Media
  images JSONB DEFAULT '[]'::jsonb,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_prod_variants_product ON product_variants(product_id);
CREATE INDEX idx_prod_variants_sku ON product_variants(sku);
```

---

### Recommendations & Estimates

```sql
-- AI-generated recommendations
CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Generation metadata
  generated_by VARCHAR(50) DEFAULT 'ai', -- 'ai', 'manual', 'hybrid'
  model_version VARCHAR(50),
  generation_timestamp TIMESTAMP DEFAULT NOW(),

  -- Input parameters
  input_parameters JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "preferences": {"style": ["modern"], "sustainability_weight": 0.8},
  --   "constraints": {"max_lead_time_days": 30}
  -- }

  -- Overall summary
  summary JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "total_items": 245,
  --   "total_cost": 587500,
  --   "avg_sustainability_score": 84,
  --   "avg_lead_time_days": 21
  -- }

  -- Recommendation status
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'presented', 'approved', 'rejected'

  -- AI confidence
  confidence_score NUMERIC(3, 2),

  -- User feedback
  user_rating SMALLINT, -- 1-5 stars
  user_feedback TEXT,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_recommendations_project ON recommendations(project_id);
CREATE INDEX idx_recommendations_status ON recommendations(status);

-- Individual recommended items
CREATE TABLE recommendation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id UUID NOT NULL REFERENCES recommendations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Product reference
  product_id UUID NOT NULL REFERENCES products(id),
  variant_id UUID REFERENCES product_variants(id),

  -- Placement
  space_id UUID REFERENCES spaces(id), -- Which space this item goes in
  placement JSONB, -- Specific location/coordinates if available

  -- Quantity & pricing
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,

  -- AI reasoning
  reasoning TEXT,
  confidence_score NUMERIC(3, 2),

  -- Alternative suggestions
  alternatives JSONB DEFAULT '[]'::jsonb,
  -- Example: [
  --   {"product_id": "...", "price_diff": -500, "sustainability_diff": -12}
  -- ]

  -- Status
  status VARCHAR(50) DEFAULT 'proposed', -- 'proposed', 'accepted', 'rejected', 'substituted'

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rec_items_recommendation ON recommendation_items(recommendation_id);
CREATE INDEX idx_rec_items_project ON recommendation_items(project_id);
CREATE INDEX idx_rec_items_product ON recommendation_items(product_id);
CREATE INDEX idx_rec_items_space ON recommendation_items(space_id);

-- Budget scenarios
CREATE TABLE budget_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  recommendation_id UUID REFERENCES recommendations(id) ON DELETE CASCADE,

  -- Scenario details
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50), -- 'conservative', 'balanced', 'aggressive'

  -- Financial summary
  total_cost NUMERIC(12, 2) NOT NULL,
  variance_from_target_pct NUMERIC(5, 2),

  -- Quality & sustainability
  quality_score SMALLINT,
  sustainability_score SMALLINT,

  -- ROI analysis
  roi_analysis JSONB DEFAULT '{}'::jsonb,
  -- Example: {
  --   "payback_months": 18,
  --   "roi_3_year": 1350000,
  --   "roi_5_year": 2700000,
  --   "annual_savings": 75000
  -- }

  -- Trade-offs and changes
  trade_offs JSONB DEFAULT '[]'::jsonb,

  -- Selection
  is_selected BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_budget_scenarios_project ON budget_scenarios(project_id);
CREATE INDEX idx_budget_scenarios_recommendation ON budget_scenarios(recommendation_id);
```

---

## AI & ML Data Models

### Conversations & NLP

```sql
-- AI conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Conversation state
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'abandoned'

  -- Context
  context JSONB DEFAULT '{}'::jsonb,
  -- Stores conversation context for continuity

  -- Summary
  summary TEXT,

  -- Extracted requirements
  extracted_requirements JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conversations_project ON conversations(project_id);
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_conversations_status ON conversations(status);

-- Conversation messages
CREATE TABLE conversation_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,

  -- Message content
  role VARCHAR(50) NOT NULL, -- 'user', 'assistant', 'system'
  content TEXT NOT NULL,

  -- NLP analysis
  intent VARCHAR(100),
  entities JSONB DEFAULT '[]'::jsonb,
  -- Example: [{"type": "number", "value": 150, "field": "employee_count"}]

  confidence NUMERIC(3, 2),

  -- Actions triggered
  actions JSONB DEFAULT '[]'::jsonb,
  -- Example: [{"type": "update_project", "updates": {...}}]

  -- Model info
  model_used VARCHAR(100),
  tokens_used INTEGER,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_conv_messages_conversation ON conversation_messages(conversation_id, created_at);
CREATE INDEX idx_conv_messages_created ON conversation_messages(created_at DESC);

-- AI model performance tracking
CREATE TABLE ai_model_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  model_name VARCHAR(100) NOT NULL,
  model_version VARCHAR(50) NOT NULL,
  task_type VARCHAR(100) NOT NULL, -- 'conversation', 'recommendation', 'space_analysis', etc.

  -- Performance metrics
  latency_ms INTEGER,
  tokens_used INTEGER,
  confidence_score NUMERIC(3, 2),

  -- Quality metrics
  user_rating SMALLINT, -- 1-5 stars, if available
  user_accepted BOOLEAN,

  -- Context
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),

  -- Cost tracking
  cost_usd NUMERIC(10, 4),

  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ai_metrics_model ON ai_model_metrics(model_name, model_version, timestamp DESC);
CREATE INDEX idx_ai_metrics_task ON ai_model_metrics(task_type, timestamp DESC);
CREATE INDEX idx_ai_metrics_project ON ai_model_metrics(project_id);
```

---

### ML Training Data & Feedback

```sql
-- Training data for ML models
CREATE TABLE ml_training_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Data source
  source_type VARCHAR(100) NOT NULL, -- 'user_project', 'manual_entry', 'synthetic', 'imported'
  source_id UUID,

  -- Training example
  model_type VARCHAR(100) NOT NULL, -- 'recommendation', 'space_analysis', 'budget_optimization'
  input_features JSONB NOT NULL,
  output_labels JSONB NOT NULL,

  -- Quality
  quality_score NUMERIC(3, 2),
  verified BOOLEAN DEFAULT false,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP,

  -- Usage
  used_in_training BOOLEAN DEFAULT false,
  training_runs UUID[], -- Array of training run IDs

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_ml_training_model ON ml_training_data(model_type);
CREATE INDEX idx_ml_training_verified ON ml_training_data(verified) WHERE verified = true;

-- User feedback on AI recommendations
CREATE TABLE recommendation_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  recommendation_id UUID NOT NULL REFERENCES recommendations(id) ON DELETE CASCADE,
  recommendation_item_id UUID REFERENCES recommendation_items(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),

  -- Feedback type
  feedback_type VARCHAR(50) NOT NULL, -- 'rating', 'acceptance', 'rejection', 'modification'

  -- Rating (1-5 stars)
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),

  -- Specific feedback
  feedback_text TEXT,
  feedback_categories TEXT[], -- ['inaccurate_pricing', 'wrong_style', 'better_alternative', etc.]

  -- Actions taken
  accepted BOOLEAN,
  modified BOOLEAN,
  modification_details JSONB,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_rec_feedback_recommendation ON recommendation_feedback(recommendation_id);
CREATE INDEX idx_rec_feedback_user ON recommendation_feedback(user_id);
CREATE INDEX idx_rec_feedback_created ON recommendation_feedback(created_at DESC);
```

---

## Analytics Models

### Event Tracking (ClickHouse)

```sql
-- Events table (ClickHouse)
CREATE TABLE events (
  event_id UUID,
  event_name String,
  event_type String, -- 'page_view', 'action', 'error', etc.

  -- User & session
  user_id Nullable(UUID),
  session_id UUID,
  anonymous_id String,

  -- Context
  project_id Nullable(UUID),
  organization_id Nullable(UUID),

  -- Event properties
  properties String, -- JSON string

  -- Page/app context
  page_url String,
  page_title String,
  referrer String,

  -- Device & browser
  user_agent String,
  device_type String,
  browser String,
  os String,

  -- Location
  ip_address String,
  country String,
  region String,
  city String,

  -- Timestamp
  timestamp DateTime64(3),
  date Date DEFAULT toDate(timestamp),

  -- Ingest metadata
  ingested_at DateTime DEFAULT now()
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, user_id, session_id, timestamp)
TTL date + INTERVAL 2 YEAR;

-- Product views (ClickHouse)
CREATE TABLE product_views (
  view_id UUID,
  product_id UUID,
  user_id Nullable(UUID),
  session_id UUID,

  -- Context
  project_id Nullable(UUID),
  viewed_from String, -- 'search', 'recommendation', 'related_products', 'direct'

  -- Engagement
  view_duration_seconds UInt32,
  clicked_images Boolean,
  clicked_3d_model Boolean,
  clicked_specs Boolean,

  -- Timestamp
  timestamp DateTime64(3),
  date Date DEFAULT toDate(timestamp)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (product_id, date, timestamp)
TTL date + INTERVAL 2 YEAR;

-- Recommendation performance (ClickHouse)
CREATE TABLE recommendation_metrics (
  recommendation_id UUID,
  project_id UUID,
  user_id UUID,

  -- Metrics
  total_items UInt32,
  total_cost Decimal(12, 2),
  sustainability_score UInt8,

  -- User actions
  presented_at DateTime,
  viewed_at Nullable(DateTime),
  modified_at Nullable(DateTime),
  approved_at Nullable(DateTime),
  rejected_at Nullable(DateTime),

  -- Time to action
  time_to_decision_minutes Nullable(UInt32),

  -- Rating
  user_rating Nullable(UInt8),

  date Date DEFAULT toDate(presented_at)
)
ENGINE = MergeTree()
PARTITION BY toYYYYMM(date)
ORDER BY (date, recommendation_id);
```

---

## Indexes & Performance

### Critical Indexes

```sql
-- Composite indexes for common queries
CREATE INDEX idx_projects_owner_status ON projects(owner_id, status) WHERE deleted_at IS NULL;
CREATE INDEX idx_projects_org_created ON projects(organization_id, created_at DESC) WHERE deleted_at IS NULL;

-- Full-text search
CREATE INDEX idx_products_fulltext ON products USING GIN(
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
);

-- JSONB indexes for frequent queries
CREATE INDEX idx_products_specs_materials ON products USING GIN((specifications->'materials'));
CREATE INDEX idx_projects_requirements ON projects USING GIN(requirements);

-- Partial indexes for active records
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active' AND deleted_at IS NULL;
CREATE INDEX idx_active_products ON products(category, brand) WHERE status = 'active';
```

### Query Optimization Examples

```sql
-- Efficient project listing for user
-- Bad:
SELECT * FROM projects WHERE owner_id = ? OR id IN (SELECT project_id FROM project_collaborators WHERE user_id = ?);

-- Good:
WITH user_projects AS (
  SELECT id, name, status, created_at, 'owner' as role
  FROM projects
  WHERE owner_id = ? AND deleted_at IS NULL

  UNION ALL

  SELECT p.id, p.name, p.status, p.created_at, pc.role
  FROM projects p
  INNER JOIN project_collaborators pc ON p.id = pc.project_id
  WHERE pc.user_id = ? AND p.deleted_at IS NULL
)
SELECT * FROM user_projects ORDER BY created_at DESC LIMIT 50;

-- Product recommendation query with vector similarity
SELECT
  p.*,
  1 - (p.embedding <=> ?) as similarity_score
FROM products p
WHERE
  p.status = 'active'
  AND p.category = ?
  AND p.list_price BETWEEN ? AND ?
ORDER BY p.embedding <=> ?
LIMIT 20;
```

---

## Data Relationships

### Entity Relationship Diagram

```
users
  ├── organizations (via organization_members)
  ├── projects (owner_id)
  ├── conversations
  └── recommendation_feedback

projects
  ├── floor_plans
  ├── spaces
  ├── recommendations
  ├── budget_scenarios
  ├── conversations
  └── project_collaborators

floor_plans
  └── spaces

products
  ├── product_variants
  ├── product_relationships
  └── recommendation_items

recommendations
  ├── recommendation_items
  ├── budget_scenarios
  └── recommendation_feedback

conversations
  └── conversation_messages
```

---

## Migration Strategy

### Database Migrations

```sql
-- Migration tracking
CREATE TABLE schema_migrations (
  version VARCHAR(50) PRIMARY KEY,
  description TEXT,
  applied_at TIMESTAMP DEFAULT NOW(),
  checksum VARCHAR(64)
);

-- Example migration: Add sustainability scoring
-- migrations/20250114_add_sustainability_scoring.sql

BEGIN;

-- Add sustainability columns to projects
ALTER TABLE projects
ADD COLUMN sustainability_targets JSONB DEFAULT '{}'::jsonb;

-- Add sustainability metrics table
CREATE TABLE sustainability_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  overall_score SMALLINT CHECK (overall_score >= 0 AND overall_score <= 100),
  carbon_footprint_kg NUMERIC(12, 2),
  recycled_content_pct NUMERIC(5, 2),
  recyclable_pct NUMERIC(5, 2),

  certifications_achieved TEXT[],
  leed_points INTEGER,

  calculated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sustainability_project ON sustainability_metrics(project_id);

-- Insert migration record
INSERT INTO schema_migrations (version, description, checksum)
VALUES ('20250114_001', 'Add sustainability scoring', 'abc123...');

COMMIT;
```

---

## Data Retention & Archival

### Retention Policies

| Data Type | Retention Period | Archive Strategy |
|-----------|-----------------|------------------|
| Active projects | Indefinite | N/A |
| Completed projects | 7 years | Cold storage after 2 years |
| User conversations | 2 years | Aggregate insights, delete details |
| Event logs | 2 years | ClickHouse TTL, aggregate to daily |
| AI model metrics | 1 year | Aggregate to weekly, keep samples |
| Floor plan files | 5 years | S3 Glacier after 1 year |
| 3D renders | 90 days | Delete after project completion |

### Archival Script Example

```sql
-- Archive old completed projects to cold storage
WITH old_projects AS (
  SELECT id
  FROM projects
  WHERE status = 'completed'
    AND updated_at < NOW() - INTERVAL '2 years'
  LIMIT 1000
)
UPDATE projects
SET metadata = jsonb_set(
  COALESCE(metadata, '{}'::jsonb),
  '{archived}',
  'true'::jsonb
)
WHERE id IN (SELECT id FROM old_projects);
```

---

## Summary

This data model supports:
- ✅ Multi-tenant architecture with organizations
- ✅ Flexible project requirements via JSONB
- ✅ AI conversation tracking and NLP
- ✅ Product catalog with ML embeddings
- ✅ Recommendation engine with feedback loops
- ✅ Space analysis and floor plan processing
- ✅ Budget scenarios and ROI analysis
- ✅ Sustainability metrics and certifications
- ✅ Analytics and event tracking
- ✅ Performance optimization via strategic indexing
