# OFS AI Capabilities Analysis & Transformation Strategy

**Version:** 1.0
**Date:** October 14, 2025
**Classification:** Internal - Strategic Planning
**Authors:** AI Strategy Team, Product Engineering

---

## Table of Contents

1. [Executive Overview](#executive-overview)
2. [Current State Assessment](#current-state-assessment)
3. [AI Agent Architecture](#ai-agent-architecture)
4. [Detailed Agent Specifications](#detailed-agent-specifications)
5. [Machine Learning Models](#machine-learning-models)
6. [Data Strategy](#data-strategy)
7. [Integration Architecture](#integration-architecture)
8. [AI Ethics & Governance](#ai-ethics--governance)
9. [Competitive Intelligence](#competitive-intelligence)
10. [Implementation Roadmap](#implementation-roadmap)
11. [ROI Analysis](#roi-analysis)

---

## Executive Overview

### Transformation Thesis

The furniture industry is on the cusp of an AI-driven transformation. Companies that treat furniture specification as a **data science problem** rather than a **catalog browsing exercise** will capture outsized market share and margin expansion.

OFS has a unique advantage: **60+ years of project data, deep manufacturing expertise, and customer relationships**. This analysis outlines how to weaponize these assets with artificial intelligence.

### Strategic Imperatives

1. **From Tool to Platform:** Transform the estimator from a calculator into an intelligent platform
2. **From Reactive to Predictive:** Move from quote responses to proactive recommendations
3. **From Siloed to Orchestrated:** Connect fragmented systems with AI agents
4. **From Manual to Autonomous:** Automate 80% of routine specification work
5. **From Product to Service:** Shift from selling furniture to selling optimized workspace outcomes

### Investment & Returns

| Phase | Investment | Timeline | Expected Return | Payback |
|-------|-----------|----------|-----------------|---------|
| Phase 1: MVP | $1.2M | 4 months | $3M/year cost savings | 5 months |
| Phase 2: Intelligence | $1.5M | 4 months | $15M/year revenue lift | 7 months |
| Phase 3: Ecosystem | $1.8M | 4 months | $50M/year attribution | 12 months |
| **Total (Year 1)** | **$4.5M** | **12 months** | **$68M** | **8 months** |

---

## Current State Assessment

### Existing Capabilities Audit

#### Fast Furniture Estimator (Current)

**Strengths:**
- ✅ Reduces estimate time vs. fully manual process
- ✅ Pre-configured templates for common spaces
- ✅ Integrates with product catalog
- ✅ Generates 3D asset exports

**Weaknesses:**
- ❌ Form-based UI is tedious and error-prone
- ❌ No intelligence or learning
- ❌ Static templates don't adapt to context
- ❌ Rep-gated access limits adoption
- ❌ Disconnected from broader sales/manufacturing systems
- ❌ No mobile support
- ❌ Limited visualization capabilities
- ❌ No collaboration features

**Technical Debt:**
- Legacy codebase (likely PHP or .NET)
- Monolithic architecture
- Manual updates required for product changes
- No API or integration points
- Limited analytics/telemetry

**User Sentiment (Estimated):**
- Designers: "Better than nothing, but still painful"
- Sales Reps: "Useful but doesn't close deals faster"
- Clients: "Never see it - just get a PDF output"

---

### Gap Analysis: Current vs. Desired State

| Capability | Current | Desired | Gap |
|------------|---------|---------|-----|
| **Input Method** | Manual forms | Natural language + multi-modal | Large |
| **Intelligence** | None | Context-aware recommendations | Critical |
| **Visualization** | Basic 3D exports | Real-time rendering + AR/VR | Large |
| **Collaboration** | Email-based | Real-time platform | Large |
| **Integration** | Standalone | Ecosystem hub | Critical |
| **Mobile** | Web-only | Native mobile + voice | Medium |
| **Learning** | Static | Continuous improvement | Critical |
| **Compliance** | Manual checking | Automated validation | Large |
| **Sustainability** | Not tracked | Embedded ESG analysis | Medium |
| **Procurement** | Disconnected | End-to-end automation | Large |

---

### Competitive Landscape

#### Herman Miller

**Digital Capabilities:**
- Herman Miller Live OS: Configuration tool with 3D
- Dealer portal with pricing and availability
- Some AR capabilities for consumers
- Limited AI/ML visible

**Assessment:** Strong on consumer-facing tools, weak on B2B intelligence

---

#### Steelcase

**Digital Capabilities:**
- Steelcase Flex Collection configurator
- Workspace planning tools
- Integration with Microsoft Teams
- Some workplace analytics

**Assessment:** Focus on workplace analytics, limited AI in specification process

---

#### Haworth

**Digital Capabilities:**
- Idea Starters (template library)
- 3D CAD models available
- Dealer tools
- Basic configurators

**Assessment:** Behind in digital maturity

---

#### Emerging Threats

**Software-First Entrants:**
- **WeWork Workplace:** Software platform for workspace management
- **Robin Powered:** AI-powered space booking + analytics
- **Density:** Occupancy analytics with furniture recommendations

**Assessment:** These companies don't manufacture furniture but could partner with OEMs to disintermediate traditional manufacturers

---

### OFS Unique Advantages

1. **Data Moat:** 60+ years of project data (win/loss, usage patterns, customizations)
2. **Manufacturing Insight:** Real costs, lead times, feasibility constraints
3. **Customer Relationships:** Direct access to designers, dealers, end-users
4. **Vertical Integration:** Control from design → manufacturing → delivery
5. **Brand Trust:** Family-owned, sustainability focus, American-made
6. **Product Breadth:** Office, education, healthcare verticals

**Strategic Insight:** OFS can build AI models that competitors cannot replicate without similar data access.

---

## AI Agent Architecture

### Multi-Agent System Design

Instead of a monolithic AI system, we architect **specialized agents** that collaborate to solve complex workflows. This approach provides:

- **Modularity:** Easy to update individual agents
- **Scalability:** Agents can run independently and in parallel
- **Explainability:** Each agent's reasoning is isolated
- **Fault Tolerance:** One agent failure doesn't crash the system
- **Specialization:** Each agent uses optimal techniques for its domain

### Agent Orchestration Framework

We use **LangGraph** (or similar) to orchestrate agents in a stateful workflow:

```python
from langgraph.graph import StateGraph
from typing import TypedDict, List, Optional

class ProjectState(TypedDict):
    # Input
    user_input: str
    floor_plan: Optional[bytes]

    # Context
    project_requirements: dict
    space_analysis: dict
    user_preferences: dict

    # Recommendations
    product_recommendations: List[dict]
    layout_options: List[dict]
    budget_scenarios: List[dict]

    # Validation
    compliance_issues: List[dict]
    sustainability_scores: dict

    # Output
    final_proposal: dict
    next_actions: List[str]

# Define workflow
workflow = StateGraph(ProjectState)

# Add agents as nodes
workflow.add_node("intake", conversational_intake_agent)
workflow.add_node("space_analyzer", spatial_intelligence_agent)
workflow.add_node("recommender", product_recommendation_agent)
workflow.add_node("layout", layout_generation_agent)
workflow.add_node("budgeting", budget_optimization_agent)
workflow.add_node("compliance", compliance_validation_agent)
workflow.add_node("sustainability", esg_analysis_agent)
workflow.add_node("visualization", rendering_agent)

# Define edges (flow)
workflow.add_edge("intake", "space_analyzer")
workflow.add_conditional_edges(
    "space_analyzer",
    lambda state: "layout" if state["floor_plan"] else "recommender"
)
workflow.add_edge("layout", "recommender")
workflow.add_edge("recommender", "budgeting")
workflow.add_edge("budgeting", "compliance")
workflow.add_edge("compliance", "sustainability")
workflow.add_edge("sustainability", "visualization")

# Compile
app = workflow.compile()
```

### Agent Communication Protocol

Agents communicate via a **shared state object** that flows through the graph. Each agent:

1. Reads relevant fields from state
2. Performs its specialized task
3. Writes results back to state
4. Returns control to orchestrator

Benefits:
- No tight coupling between agents
- Easy to debug (inspect state at any node)
- Supports human-in-the-loop (pause and resume)
- Enables A/B testing (swap agent implementations)

---

## Detailed Agent Specifications

### Agent 1: Conversational Intake Agent

**Purpose:** Extract structured project requirements from natural language conversation.

#### Capabilities

**Input Understanding:**
- Processes free-form text describing project needs
- Handles ambiguous or incomplete information gracefully
- Supports follow-up questions for clarification
- Multi-turn conversation with context retention

**Entity Extraction:**
- **Space Type:** Office, conference room, open workspace, etc.
- **Dimensions:** Square footage, number of workstations
- **Budget:** Total budget or per-seat budget
- **Timeline:** Move-in date, procurement deadlines
- **Industry:** Tech, finance, healthcare, education, etc.
- **Culture Signals:** Collaborative, formal, creative, etc.
- **Constraints:** Must-have features, brand standards, color palettes

**Example Interaction:**
```
User: "We're furnishing a tech startup office, about 8000 sq ft,
       budget is flexible but probably around $300K. Need to be
       ready by March 1st. Hybrid work setup for 60 people."

Agent: "Got it! A few clarifying questions:

1. For your hybrid model, what's your expected in-office
   attendance? (e.g., 60% on a typical day)

2. Any specific collaboration needs? Focus rooms, phone booths,
   huddle spaces?

3. Brand aesthetic? (modern/minimalist, industrial, warm/homey)

4. Any sustainability goals or certifications you're targeting?"

[State updated with extracted entities + confidence scores]
```

#### Technical Implementation

**LLM Stack:**
- **Primary:** GPT-4 or Claude 3.5 Sonnet (reasoning + instruction following)
- **Fallback:** Llama 3 (70B) for cost optimization
- **Fine-tuning:** Domain-specific model on OFS project descriptions

**Structured Output:**
```python
from pydantic import BaseModel, Field
from enum import Enum

class IndustryVertical(str, Enum):
    TECH = "tech"
    FINANCE = "finance"
    HEALTHCARE = "healthcare"
    EDUCATION = "education"
    LEGAL = "legal"
    OTHER = "other"

class SpaceType(str, Enum):
    PRIVATE_OFFICE = "private_office"
    OPEN_WORKSPACE = "open_workspace"
    CONFERENCE_ROOM = "conference_room"
    TRAINING_ROOM = "training_room"
    LOUNGE = "lounge"
    RECEPTION = "reception"

class ProjectRequirements(BaseModel):
    space_type: SpaceType
    square_footage: Optional[int] = Field(description="Total area in sq ft")
    headcount: Optional[int] = Field(description="Number of people")
    budget_total: Optional[int] = Field(description="Total budget in USD")
    budget_per_seat: Optional[int] = Field(description="Budget per workstation")
    deadline: Optional[date] = Field(description="Move-in or completion date")
    industry: IndustryVertical
    work_model: Optional[str] = Field(description="Remote, hybrid, in-office")
    culture_keywords: List[str] = Field(default=[], description="Adjectives describing culture")
    sustainability_goals: Optional[str] = None
    constraints: List[str] = Field(default=[], description="Must-have requirements")
    confidence_score: float = Field(ge=0.0, le=1.0, description="Confidence in extraction")
```

**Prompt Engineering:**
```python
SYSTEM_PROMPT = """You are an expert furniture specification assistant for OFS.
Your role is to understand project requirements through conversation and extract
structured data.

Key principles:
1. Ask clarifying questions if information is ambiguous
2. Never assume - confirm details with the user
3. Use industry knowledge to suggest options
4. Be concise but thorough
5. Extract information into the ProjectRequirements schema

Available space types: {space_types}
Available industries: {industries}

Current conversation context:
{conversation_history}
"""

def generate_response(user_message: str, context: dict) -> dict:
    response = llm.invoke(
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT.format(**context)},
            {"role": "user", "content": user_message}
        ],
        response_format=ProjectRequirements  # Structured output
    )
    return response
```

**Conversation Management:**
- Session storage in Redis (15-minute TTL)
- Conversation history limited to last 10 turns
- Automatic save-draft every 30 seconds
- Resume capability with session ID

**Quality Assurance:**
- Confidence scoring on extracted entities
- Human review triggered for confidence <0.7
- A/B testing of prompt variations
- User feedback loop ("Was this interpretation correct?")

---

### Agent 2: Spatial Intelligence Agent

**Purpose:** Analyze floor plans to extract geometry, detect constraints, and generate layout recommendations.

#### Capabilities

**Floor Plan Processing:**

1. **Format Support:**
   - PDF (raster and vector)
   - Image files (PNG, JPG, TIFF)
   - CAD files (DWG, DXF via Open Design Alliance)
   - BIM files (RVT via Revit API, IFC standard)

2. **Dimension Extraction:**
   - OCR for dimension text
   - Scale detection (e.g., "1/4\" = 1'")
   - Wall length calculation from vectors
   - Area calculation for rooms

3. **Feature Detection:**
   - Walls (interior and exterior)
   - Doors (swing direction, width)
   - Windows (size, location)
   - Columns
   - Stairs and elevators
   - Electrical outlets
   - Data/telecom outlets
   - HVAC elements

4. **Space Classification:**
   - Room type detection (office, conference, open area)
   - Usable vs. circulation area
   - Adjacency relationships
   - Natural light exposure

#### Technical Implementation

**Computer Vision Pipeline:**

```python
class FloorPlanAnalyzer:
    def __init__(self):
        self.ocr_engine = TesseractOCR()
        self.object_detector = load_detectron_model('floor_plan_detector')
        self.scale_detector = ScaleParser()

    async def analyze(self, file_bytes: bytes, file_type: str) -> FloorPlanAnalysis:
        # Step 1: Convert to standard format
        image = self.convert_to_image(file_bytes, file_type)

        # Step 2: Detect scale
        scale_info = self.scale_detector.extract(image)
        pixels_per_foot = scale_info['pixels_per_foot']

        # Step 3: OCR for dimensions
        dimension_annotations = self.ocr_engine.extract_dimensions(image)

        # Step 4: Object detection
        detections = self.object_detector.detect(image)
        # Returns: [
        #   {'class': 'wall', 'bbox': [x1,y1,x2,y2], 'confidence': 0.95},
        #   {'class': 'door', 'bbox': [...], 'confidence': 0.89},
        #   ...
        # ]

        # Step 5: Vectorize and measure
        walls = self.vectorize_walls(detections, pixels_per_foot)
        doors = self.extract_doors(detections)
        windows = self.extract_windows(detections)

        # Step 6: Create spatial graph
        spatial_graph = self.build_spatial_graph(walls, doors, windows)

        # Step 7: Room segmentation
        rooms = self.segment_rooms(spatial_graph)

        # Step 8: Calculate metrics
        for room in rooms:
            room['area'] = self.calculate_area(room['polygon'], pixels_per_foot)
            room['usable_area'] = room['area'] * 0.75  # Heuristic
            room['perimeter'] = self.calculate_perimeter(room['polygon'])
            room['natural_light_score'] = self.score_natural_light(room, windows)

        return FloorPlanAnalysis(
            dimensions=dimension_annotations,
            rooms=rooms,
            walls=walls,
            doors=doors,
            windows=windows,
            total_area=sum(r['area'] for r in rooms),
            scale_factor=pixels_per_foot
        )
```

**ML Model Training:**

**Dataset:**
- 10,000+ labeled floor plans from OFS projects
- Augmentation: rotation, scaling, noise, different scales
- Synthetic data generation with procedural floor plans

**Architecture:**
- Detectron2 with Mask R-CNN backbone
- ResNet-101 feature extractor
- Custom head for furniture-specific classes

**Training:**
- 100 epochs with early stopping
- Data augmentation: AutoAugment policy
- Loss: Focal loss for class imbalance
- Metrics: mAP@0.5, mAP@0.75

**Performance Targets:**
- Dimension extraction accuracy: 98% (±2% tolerance)
- Wall detection mAP: >0.90
- Door detection mAP: >0.85
- Processing time: <30 seconds per plan

#### Layout Generation

Once spatial understanding is complete, generate furniture layouts:

**Algorithm:**
1. **Space Allocation:** Assign furniture types to rooms based on requirements
2. **Packing:** Use constraint-based optimization to place furniture
3. **Clearance Validation:** Check ADA and fire code requirements
4. **Ergonomics:** Validate sight lines, reach distances, acoustics
5. **Aesthetics:** Apply design rules (symmetry, focal points, rhythm)

**Constraint Programming:**
```python
from ortools.sat.python import cp_model

def generate_layout(room: Room, furniture_list: List[Furniture]) -> Layout:
    model = cp_model.CpModel()

    # Variables: (x, y, rotation) for each furniture piece
    placements = {}
    for item in furniture_list:
        placements[item.id] = {
            'x': model.NewIntVar(0, room.width, f'{item.id}_x'),
            'y': model.NewIntVar(0, room.height, f'{item.id}_y'),
            'rotation': model.NewIntVar(0, 3, f'{item.id}_rot')  # 0°, 90°, 180°, 270°
        }

    # Constraint: No overlaps
    for item1, item2 in combinations(furniture_list, 2):
        # Add non-overlap constraints
        model.AddNoOverlap2D(...)

    # Constraint: ADA clearances
    for door in room.doors:
        # Ensure 18" clearance on latch side
        model.Add(...)

    # Constraint: Minimum circulation paths (36" width)
    # ...

    # Objective: Maximize space utilization + aesthetic score
    model.Maximize(
        space_utilization_score + aesthetic_score
    )

    solver = cp_model.CpSolver()
    status = solver.Solve(model)

    if status == cp_model.OPTIMAL:
        return extract_layout(solver, placements)
    else:
        return fallback_heuristic_layout(room, furniture_list)
```

---

### Agent 3: Product Recommendation Agent

**Purpose:** Recommend optimal furniture products based on project context, user preferences, and historical data.

#### Capabilities

**Context-Aware Recommendations:**
- Industry-specific defaults (healthcare vs. tech vs. finance)
- Space type matching (private office vs. open plan)
- Ergonomic requirements (task seating vs. guest seating)
- Budget constraints (economy vs. premium)
- Sustainability preferences (certifications, recycled content)
- Aesthetic alignment (modern, traditional, transitional)

**Personalization:**
- Learn individual user preferences over time
- Remember previous selections and favorites
- Adapt to company/dealer standards
- Suggest "similar to" based on past projects

**Intelligent Upselling:**
- Complementary products (desk + storage + seating bundle)
- Accessories (monitor arms, task lighting, power modules)
- Upgrade suggestions with ROI justification
- Volume discounts and package deals

#### Technical Implementation

**Recommendation Engine Architecture:**

**Approach 1: Collaborative Filtering**
- "Users who specified Product A also specified Product B"
- Matrix factorization (SVD) on project-product matrix
- Handles cold start with content-based fallback

**Approach 2: Content-Based Filtering**
- Match product attributes to project requirements
- Embedding space for products and projects
- Cosine similarity for ranking

**Approach 3: Hybrid Ensemble**
- Combine collaborative + content-based + business rules
- Weighted scoring based on confidence

**Implementation:**

```python
class ProductRecommender:
    def __init__(self):
        self.cf_model = CollaborativeFilteringModel()
        self.content_model = ContentBasedModel()
        self.product_embeddings = load_embeddings('product_embeddings.pkl')
        self.project_embeddings = load_embeddings('project_embeddings.pkl')

    def recommend(
        self,
        project_requirements: ProjectRequirements,
        user_profile: UserProfile,
        n_recommendations: int = 20
    ) -> List[ProductRecommendation]:

        # Get candidates from multiple sources
        cf_candidates = self.cf_model.predict(user_profile, n=50)
        content_candidates = self.content_model.predict(project_requirements, n=50)

        # Score each candidate
        scored_products = []
        for product in set(cf_candidates + content_candidates):
            score = self.compute_score(
                product,
                project_requirements,
                user_profile
            )
            scored_products.append((product, score))

        # Rank and filter
        ranked = sorted(scored_products, key=lambda x: x[1], reverse=True)
        top_n = ranked[:n_recommendations]

        # Explain recommendations
        recommendations = []
        for product, score in top_n:
            explanation = self.generate_explanation(
                product,
                project_requirements
            )
            recommendations.append(
                ProductRecommendation(
                    product=product,
                    score=score,
                    explanation=explanation
                )
            )

        return recommendations

    def compute_score(
        self,
        product: Product,
        requirements: ProjectRequirements,
        user_profile: UserProfile
    ) -> float:
        """Multi-factor scoring function"""

        # Factor 1: Collaborative filtering score
        cf_score = self.cf_model.score(product, user_profile)

        # Factor 2: Content similarity
        project_emb = self.project_embeddings[requirements.id]
        product_emb = self.product_embeddings[product.id]
        content_score = cosine_similarity(project_emb, product_emb)

        # Factor 3: Budget fit
        budget_score = self.score_budget_fit(product.price, requirements.budget_per_seat)

        # Factor 4: Availability
        availability_score = 1.0 if product.in_stock else 0.7

        # Factor 5: Sustainability
        if requirements.sustainability_goals:
            sustainability_score = product.sustainability_score
        else:
            sustainability_score = 1.0  # Neutral

        # Factor 6: Past user preferences
        preference_score = self.score_user_preference(product, user_profile)

        # Weighted combination
        final_score = (
            0.25 * cf_score +
            0.25 * content_score +
            0.20 * budget_score +
            0.10 * availability_score +
            0.10 * sustainability_score +
            0.10 * preference_score
        )

        return final_score

    def generate_explanation(
        self,
        product: Product,
        requirements: ProjectRequirements
    ) -> str:
        """Generate human-readable explanation using LLM"""

        prompt = f"""Explain why {product.name} is recommended for this project:

Project context:
- Space type: {requirements.space_type}
- Industry: {requirements.industry}
- Budget per seat: ${requirements.budget_per_seat}
- Culture: {", ".join(requirements.culture_keywords)}

Product attributes:
- Category: {product.category}
- Price: ${product.price}
- Key features: {", ".join(product.features)}
- Certifications: {", ".join(product.certifications)}

Write a concise 1-2 sentence explanation focusing on the most relevant factors.
"""

        explanation = llm.invoke(prompt, max_tokens=100)
        return explanation
```

**Training Data:**
- Historical project data (10,000+ projects)
- Product specifications (5,000+ SKUs)
- User interaction logs (clicks, saves, purchases)
- Win/loss data (what was specified vs. what was purchased)

**Model Performance:**
- Precision@10: >0.60 (6 out of 10 recommendations are adopted)
- nDCG@20: >0.70 (relevant items ranked highly)
- Coverage: >80% (recommends diverse products, not just popular)
- Serendipity: >0.30 (introduces new products to users)

**Business Rules Layer:**
- Never recommend discontinued products
- Prioritize in-stock items (unless special order is acceptable)
- Apply volume discounts automatically
- Enforce dealer-specific product restrictions
- Flag items requiring custom quotes

---

### Agent 4: Budget Optimization Agent

**Purpose:** Generate multiple budget scenarios (Economy, Standard, Premium) with intelligent product selection and cost optimization.

#### Capabilities

**Scenario Generation:**
1. **Economy Tier (Budget-Conscious):**
   - Price target: 80-90% of stated budget
   - Focus on value and availability
   - Minimize lead times
   - Standard finishes and configurations

2. **Standard Tier (Balanced):**
   - Price target: 95-105% of stated budget
   - Balance quality, aesthetics, and cost
   - Popular finishes
   - Some upgrades where high impact

3. **Premium Tier (Best-in-Class):**
   - Price target: 110-130% of stated budget
   - Top-tier products
   - Premium finishes and features
   - Highlight ROI and long-term value

**Optimization Techniques:**
- **Value Engineering:** Identify equivalent products at lower cost
- **Bundle Discounts:** Package items for volume pricing
- **Phased Procurement:** Split orders to spread costs
- **Make/Buy Analysis:** Custom vs. standard configurations
- **Freight Optimization:** Consolidate shipments

**Dynamic Pricing:**
- Real-time pricing from ERP
- Volume discount calculation
- Dealer margin management
- Promotional pricing integration
- Currency conversion (for international)

#### Technical Implementation

```python
class BudgetOptimizer:
    def __init__(self):
        self.pricing_engine = PricingEngine()
        self.discount_engine = DiscountEngine()
        self.product_catalog = ProductCatalog()

    def generate_scenarios(
        self,
        furniture_list: List[FurnitureItem],
        project_requirements: ProjectRequirements
    ) -> List[BudgetScenario]:

        scenarios = []

        # Economy Scenario
        economy = self.optimize_for_budget(
            furniture_list,
            target_budget=project_requirements.budget_total * 0.85,
            optimization_goal='minimize_cost',
            constraints=['in_stock_only', 'standard_finishes']
        )
        scenarios.append(economy)

        # Standard Scenario
        standard = self.optimize_for_budget(
            furniture_list,
            target_budget=project_requirements.budget_total * 1.0,
            optimization_goal='balanced',
            constraints=['popular_finishes', 'reasonable_lead_time']
        )
        scenarios.append(standard)

        # Premium Scenario
        premium = self.optimize_for_budget(
            furniture_list,
            target_budget=project_requirements.budget_total * 1.2,
            optimization_goal='maximize_value',
            constraints=['premium_features', 'best_sustainability']
        )
        scenarios.append(premium)

        return scenarios

    def optimize_for_budget(
        self,
        furniture_list: List[FurnitureItem],
        target_budget: float,
        optimization_goal: str,
        constraints: List[str]
    ) -> BudgetScenario:
        """Use genetic algorithm to find optimal product mix"""

        # Define search space
        alternatives = {}
        for item in furniture_list:
            alternatives[item.id] = self.find_alternatives(item, constraints)

        # Genetic algorithm
        population = self.initialize_population(alternatives, size=100)

        for generation in range(50):
            # Evaluate fitness
            fitness_scores = [
                self.evaluate_fitness(individual, target_budget, optimization_goal)
                for individual in population
            ]

            # Selection (tournament)
            selected = self.tournament_selection(population, fitness_scores)

            # Crossover
            offspring = self.crossover(selected)

            # Mutation
            mutated = self.mutate(offspring, mutation_rate=0.1)

            # Next generation
            population = mutated

        # Return best solution
        best_individual = max(
            population,
            key=lambda x: self.evaluate_fitness(x, target_budget, optimization_goal)
        )

        return self.build_scenario(best_individual, target_budget)

    def evaluate_fitness(
        self,
        individual: Dict[str, Product],
        target_budget: float,
        optimization_goal: str
    ) -> float:
        """Fitness function for genetic algorithm"""

        total_cost = sum(product.price * quantity for product, quantity in individual.items())

        # Penalty for exceeding budget
        budget_penalty = max(0, total_cost - target_budget) * 10

        # Reward based on goal
        if optimization_goal == 'minimize_cost':
            cost_score = target_budget - total_cost
        elif optimization_goal == 'balanced':
            cost_score = -abs(total_cost - target_budget)  # Close to target
        else:  # maximize_value
            # Value = quality score / price
            quality_score = sum(p.quality_rating * qty for p, qty in individual.items())
            cost_score = quality_score / total_cost * 10000

        # Additional factors
        lead_time_penalty = self.calculate_lead_time_penalty(individual)
        sustainability_bonus = self.calculate_sustainability_bonus(individual)

        fitness = cost_score - budget_penalty - lead_time_penalty + sustainability_bonus

        return fitness

    def build_scenario(
        self,
        product_selection: Dict[str, Product],
        target_budget: float
    ) -> BudgetScenario:
        """Convert optimized selection to budget scenario"""

        line_items = []
        for product, quantity in product_selection.items():
            price = self.pricing_engine.get_price(product, quantity)
            discount = self.discount_engine.calculate_discount(product, quantity)

            line_items.append(LineItem(
                product=product,
                quantity=quantity,
                unit_price=price,
                discount=discount,
                extended_price=price * quantity * (1 - discount)
            ))

        subtotal = sum(item.extended_price for item in line_items)
        freight = self.estimate_freight(line_items)
        tax = subtotal * 0.0  # Varies by location
        total = subtotal + freight + tax

        # Generate explanation
        explanation = self.generate_scenario_explanation(
            line_items,
            target_budget,
            total
        )

        return BudgetScenario(
            name=self.get_tier_name(total, target_budget),
            line_items=line_items,
            subtotal=subtotal,
            freight=freight,
            tax=tax,
            total=total,
            explanation=explanation,
            lead_time_weeks=self.calculate_max_lead_time(line_items)
        )
```

**Freight Estimation:**
- Integrate with freight carriers (FedEx Freight, etc.)
- Calculate volumetric weight from product dimensions
- Consider consolidation opportunities
- Factor in white glove delivery if needed

**Real-Time Pricing:**
- Cache pricing for 1 hour
- Fallback to last known price if ERP unavailable
- Flag stale pricing in UI

---

### Agent 5: Compliance Validation Agent

**Purpose:** Automatically verify that furniture layouts comply with ADA, fire codes, and building standards.

#### Capabilities

**Code Coverage:**

**ADA (Americans with Disabilities Act):**
- Minimum clear floor space (30" x 48" at each accessible element)
- Accessible routes (36" minimum width, 60" passing clearance)
- Reach ranges (15-48" side reach, 15-48" forward reach)
- Knee and toe clearance at work surfaces (27" high, 30" wide, 19" deep)
- Door maneuvering clearances (18" latch side, 60" for front approach)
- Turning space (60" diameter or T-shaped turn)

**International Building Code (IBC):**
- Egress width (36" minimum for corridors, wider based on occupant load)
- Exit access travel distance (<200 ft unsprinklered, <250 ft sprinklered)
- Dead-end corridors (<20 ft in most occupancies)
- Protruding objects (4" max below 80" head clearance)

**NFPA Life Safety Code:**
- Means of egress capacity
- Smoke compartmentation in healthcare
- Exit signage and lighting

**WELL Building Standard (Optional):**
- Desk height adjustability
- Lighting levels (300+ lux at work surfaces)
- Acoustic requirements (< 45 dB background noise)

#### Technical Implementation

```python
class ComplianceValidator:
    def __init__(self):
        self.ada_rules = load_ada_rules()
        self.ibc_rules = load_ibc_rules()
        self.nfpa_rules = load_nfpa_rules()

    def validate(
        self,
        layout: Layout,
        floor_plan: FloorPlanAnalysis
    ) -> ComplianceReport:

        violations = []
        warnings = []

        # ADA Checks
        ada_violations = self.check_ada_compliance(layout, floor_plan)
        violations.extend([v for v in ada_violations if v.severity == 'violation'])
        warnings.extend([v for v in ada_violations if v.severity == 'warning'])

        # Fire Code Checks
        fire_violations = self.check_fire_code_compliance(layout, floor_plan)
        violations.extend([v for v in fire_violations if v.severity == 'violation'])
        warnings.extend([v for v in fire_violations if v.severity == 'warning'])

        # Generate report
        report = ComplianceReport(
            is_compliant=len(violations) == 0,
            violations=violations,
            warnings=warnings,
            suggestions=self.generate_fix_suggestions(violations)
        )

        return report

    def check_ada_compliance(
        self,
        layout: Layout,
        floor_plan: FloorPlanAnalysis
    ) -> List[ComplianceIssue]:

        issues = []

        # Check 1: Door maneuvering clearances
        for door in floor_plan.doors:
            clearance = self.measure_clearance_at_door(door, layout)
            if clearance.latch_side < 18:  # inches
                issues.append(ComplianceIssue(
                    code='ADA_404.2.4',
                    severity='violation',
                    location=door.location,
                    description=f'Door requires 18" latch-side clearance, found {clearance.latch_side}"',
                    suggested_fix='Move furniture away from door'
                ))

        # Check 2: Accessible route width
        accessible_routes = self.identify_accessible_routes(layout, floor_plan)
        for route in accessible_routes:
            if route.min_width < 36:
                issues.append(ComplianceIssue(
                    code='ADA_403.5.1',
                    severity='violation',
                    location=route.narrowest_point,
                    description=f'Accessible route requires 36" width, found {route.min_width}"',
                    suggested_fix='Reconfigure furniture arrangement'
                ))

        # Check 3: Knee clearance at desks
        for desk in layout.get_furniture_by_type('desk'):
            if desk.is_assigned_workspace:
                knee_clearance = self.measure_knee_clearance(desk)
                if knee_clearance.height < 27 or knee_clearance.depth < 19:
                    issues.append(ComplianceIssue(
                        code='ADA_306.3',
                        severity='warning',
                        location=desk.location,
                        description='Desk may not provide adequate knee clearance',
                        suggested_fix='Use height-adjustable desk or cantilever design'
                    ))

        # ... additional checks

        return issues

    def generate_fix_suggestions(
        self,
        violations: List[ComplianceIssue]
    ) -> List[str]:
        """Use LLM to generate actionable fix suggestions"""

        suggestions = []

        for violation in violations:
            prompt = f"""Given this code violation, suggest a specific fix:

Violation: {violation.description}
Code: {violation.code}
Location: {violation.location}

Suggest a specific, actionable fix that maintains design intent while achieving compliance.
"""

            suggestion = llm.invoke(prompt, max_tokens=150)
            suggestions.append(suggestion)

        return suggestions
```

**Auto-Fix Capability:**
For common violations, attempt automatic fixes:

```python
def auto_fix_layout(
    self,
    layout: Layout,
    violations: List[ComplianceIssue]
) -> Layout:
    """Attempt to automatically fix violations"""

    fixed_layout = layout.copy()

    for violation in violations:
        if violation.code == 'ADA_404.2.4':  # Door clearance
            # Move nearest furniture away from door
            door = violation.location
            nearby_items = fixed_layout.get_items_near(door, radius=48)
            for item in nearby_items:
                if item.is_movable:
                    fixed_layout.move(item, direction='away_from_door', distance=12)

        elif violation.code == 'ADA_403.5.1':  # Route width
            # Narrow the furniture causing the bottleneck
            route = violation.location
            blocking_items = fixed_layout.get_items_blocking(route)
            for item in blocking_items:
                # Try smaller alternative
                smaller_alternative = self.find_smaller_alternative(item)
                if smaller_alternative:
                    fixed_layout.replace(item, smaller_alternative)

        # ... additional auto-fix rules

    return fixed_layout
```

**Visualization:**
- Highlight violations in red in 3D view
- Show clearance zones as transparent overlays
- Annotate with code references and measurements
- Before/after comparison for auto-fixes

---

### Agent 6: Sustainability Intelligence Agent

**Purpose:** Calculate and report environmental impact of furniture selections, enable ESG-driven decision making.

#### Capabilities

**Environmental Metrics:**

1. **Carbon Footprint:**
   - Manufacturing emissions (Scope 1 & 2)
   - Transportation emissions (supplier → factory → customer)
   - End-of-life disposal emissions
   - Carbon sequestration (wood products)

2. **Material Health:**
   - Red List chemical avoidance (Living Building Challenge)
   - VOC emissions (GREENGUARD certification)
   - Heavy metal content
   - Flame retardant disclosure

3. **Circularity:**
   - Recycled content (% pre-consumer + post-consumer)
   - Recyclability at end-of-life
   - Disassembly ease (Design for Disassembly)
   - Take-back programs available

4. **Certifications:**
   - GREENGUARD Gold
   - Cradle to Cradle
   - FSC (Forest Stewardship Council)
   - SCS Indoor Advantage
   - BIFMA LEVEL
   - Environmental Product Declarations (EPDs)

**Reporting:**
- Project-level carbon footprint (tons CO2e)
- Comparison to industry benchmarks
- LEED credit contributions (MR credits)
- WELL Building Standard credits
- Custom sustainability scorecards

#### Technical Implementation

```python
class SustainabilityAnalyzer:
    def __init__(self):
        self.lca_database = LifeCycleDatabase()
        self.certification_db = CertificationDatabase()
        self.carbon_factors = load_carbon_emission_factors()

    def analyze(
        self,
        budget_scenario: BudgetScenario,
        project_location: Location
    ) -> SustainabilityReport:

        # Calculate carbon footprint
        carbon_footprint = self.calculate_carbon_footprint(
            budget_scenario.line_items,
            project_location
        )

        # Aggregate certifications
        certifications = self.aggregate_certifications(budget_scenario.line_items)

        # Calculate recycled content
        recycled_content = self.calculate_recycled_content(budget_scenario.line_items)

        # Score circularity
        circularity_score = self.calculate_circularity_score(budget_scenario.line_items)

        # Check for Red List chemicals
        red_list_status = self.check_red_list_chemicals(budget_scenario.line_items)

        # Calculate LEED credits
        leed_credits = self.calculate_leed_credits(
            carbon_footprint,
            recycled_content,
            certifications
        )

        # Generate recommendations
        recommendations = self.generate_eco_recommendations(budget_scenario)

        return SustainabilityReport(
            carbon_footprint_kg=carbon_footprint,
            carbon_footprint_comparison=self.benchmark_carbon(carbon_footprint),
            certifications=certifications,
            recycled_content_pct=recycled_content,
            circularity_score=circularity_score,
            red_list_free=red_list_status.is_clean,
            leed_credits=leed_credits,
            recommendations=recommendations
        )

    def calculate_carbon_footprint(
        self,
        line_items: List[LineItem],
        project_location: Location
    ) -> float:
        """Calculate total carbon footprint in kg CO2e"""

        total_emissions = 0.0

        for item in line_items:
            product = item.product
            quantity = item.quantity

            # Manufacturing emissions
            manufacturing_emissions = (
                product.lca_data.get('embodied_carbon_kg_co2e', 0) * quantity
            )

            # Transportation emissions
            transport_emissions = self.calculate_transport_emissions(
                product.manufacturing_location,
                project_location,
                product.weight_kg * quantity
            )

            # End-of-life emissions (negative if recycled)
            eol_emissions = product.lca_data.get('eol_carbon_kg_co2e', 0) * quantity

            total_emissions += manufacturing_emissions + transport_emissions + eol_emissions

        return total_emissions

    def calculate_transport_emissions(
        self,
        origin: Location,
        destination: Location,
        weight_kg: float
    ) -> float:
        """Calculate transportation emissions"""

        # Calculate distance
        distance_km = self.calculate_distance(origin, destination)

        # Emission factor (kg CO2e per ton-km)
        # Truck: 0.062, Rail: 0.022, Ship: 0.010
        if distance_km < 500:
            mode = 'truck'
            emission_factor = 0.062
        elif distance_km < 2000:
            mode = 'rail'
            emission_factor = 0.022
        else:
            mode = 'ship'
            emission_factor = 0.010

        emissions = (weight_kg / 1000) * distance_km * emission_factor

        return emissions

    def generate_eco_recommendations(
        self,
        scenario: BudgetScenario
    ) -> List[EcoRecommendation]:
        """Suggest more sustainable alternatives"""

        recommendations = []

        for item in scenario.line_items:
            # Find more sustainable alternatives
            alternatives = self.find_sustainable_alternatives(
                item.product,
                criteria=['lower_carbon', 'higher_recycled_content', 'more_certifications']
            )

            for alt in alternatives[:3]:  # Top 3
                carbon_savings = item.product.lca_data['embodied_carbon_kg_co2e'] - \
                                 alt.lca_data['embodied_carbon_kg_co2e']

                price_delta = alt.price - item.product.price

                if carbon_savings > 0:  # Only suggest if actually better
                    recommendations.append(EcoRecommendation(
                        original_product=item.product,
                        alternative_product=alt,
                        carbon_savings_kg=carbon_savings * item.quantity,
                        price_delta=price_delta * item.quantity,
                        explanation=self.generate_eco_explanation(item.product, alt)
                    ))

        # Sort by carbon savings
        recommendations.sort(key=lambda x: x.carbon_savings_kg, reverse=True)

        return recommendations[:10]  # Top 10
```

**Data Sources:**
- Product EPDs (Environmental Product Declarations)
- OFS manufacturing data (energy use, material inputs)
- Supplier sustainability reports
- Third-party LCA databases (ecoinvent, GaBi)
- Certification bodies (UL, NSF, FSC)

**Visualization:**
- Carbon footprint breakdown chart (manufacturing vs. transport vs. EOL)
- Comparison bar chart (this project vs. industry average)
- Certification badges
- Material composition pie chart
- Trade-off scatter plot (cost vs. carbon)

---

### Agent 7: Visualization & Rendering Agent

**Purpose:** Generate photorealistic visualizations and interactive 3D experiences.

#### Capabilities

**Real-Time 3D:**
- Interactive scene navigation (pan, zoom, rotate)
- Material/finish swapping in real-time
- Lighting adjustments (time of day, artificial lighting)
- Measurement tools
- Section cuts and exploded views
- Annotations and callouts

**High-Quality Rendering:**
- Photorealistic ray-traced images (4K resolution)
- 360° panoramas
- Walkthrough animations
- Cloud-based GPU rendering (scales to 100+ concurrent jobs)

**AR/VR:**
- Mobile AR (iOS, Android) for on-site visualization
- VR experiences (Meta Quest, Vision Pro)
- Multi-user collaborative VR
- Hand tracking and gesture controls

#### Technical Implementation

**Real-Time Engine (Three.js):**

```typescript
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class FurnitureSceneRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;

  constructor(canvasElement: HTMLCanvasElement) {
    // Setup scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // Setup camera
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(10, 5, 10);

    // Setup renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvasElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Setup controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Add lighting
    this.setupLighting();

    // Start render loop
    this.animate();
  }

  setupLighting() {
    // Ambient light
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambient);

    // Directional light (sun)
    const sun = new THREE.DirectionalLight(0xffffff, 1.0);
    sun.position.set(10, 20, 10);
    sun.castShadow = true;
    sun.shadow.camera.left = -20;
    sun.shadow.camera.right = 20;
    sun.shadow.camera.top = 20;
    sun.shadow.camera.bottom = -20;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    this.scene.add(sun);

    // Hemisphere light (sky)
    const sky = new THREE.HemisphereLight(0xffffff, 0x444444, 0.3);
    this.scene.add(sky);
  }

  async loadFurnitureLayout(layout: Layout) {
    const loader = new GLTFLoader();

    for (const item of layout.items) {
      // Load 3D model
      const gltf = await loader.loadAsync(item.product.model_url);
      const model = gltf.scene;

      // Position and rotate
      model.position.set(item.x, 0, item.y);
      model.rotation.y = item.rotation * Math.PI / 180;

      // Enable shadows
      model.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      // Add to scene
      this.scene.add(model);

      // Store reference for later
      item.threeObject = model;
    }
  }

  changeMaterial(item: FurnitureItem, materialId: string) {
    const model = item.threeObject;

    // Load new texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(this.getMaterialTextureUrl(materialId));

    // Apply to mesh
    model.traverse((node) => {
      if (node instanceof THREE.Mesh && node.material.name === 'fabric') {
        node.material.map = texture;
        node.material.needsUpdate = true;
      }
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  takeScreenshot(): Promise<Blob> {
    return new Promise((resolve) => {
      this.renderer.domElement.toBlob((blob) => {
        resolve(blob!);
      });
    });
  }
}
```

**Cloud Rendering (V-Ray or Arnold):**

```python
import boto3
from typing import List

class CloudRenderingService:
    def __init__(self):
        self.s3 = boto3.client('s3')
        self.batch = boto3.client('batch')

    async def submit_render_job(
        self,
        scene_file: str,
        camera_angles: List[CameraAngle],
        resolution: tuple = (3840, 2160),  # 4K
        samples: int = 1000
    ) -> str:
        """Submit high-quality rendering job to AWS Batch"""

        # Upload scene file to S3
        scene_key = f'scenes/{uuid.uuid4()}.ma'  # Maya scene
        self.s3.upload_file(scene_file, 'ofs-render-bucket', scene_key)

        # Submit batch job
        response = self.batch.submit_job(
            jobName=f'render-{uuid.uuid4()}',
            jobQueue='gpu-render-queue',
            jobDefinition='vray-render-job',
            containerOverrides={
                'vcpus': 8,
                'memory': 32000,
                'command': [
                    'python', 'render.py',
                    '--scene', scene_key,
                    '--cameras', json.dumps([c.dict() for c in camera_angles]),
                    '--resolution', f'{resolution[0]}x{resolution[1]}',
                    '--samples', str(samples)
                ]
            }
        )

        job_id = response['jobId']

        return job_id

    async def get_render_status(self, job_id: str) -> RenderStatus:
        """Check status of rendering job"""

        response = self.batch.describe_jobs(jobs=[job_id])
        job = response['jobs'][0]

        status = job['status']  # SUBMITTED, PENDING, RUNNING, SUCCEEDED, FAILED

        if status == 'SUCCEEDED':
            # Download rendered images from S3
            output_keys = self.list_output_files(job_id)
            return RenderStatus(
                status='complete',
                image_urls=[self.get_presigned_url(key) for key in output_keys]
            )
        elif status == 'FAILED':
            return RenderStatus(status='failed', error=job['statusReason'])
        else:
            return RenderStatus(status='in_progress', progress=self.estimate_progress(job))
```

**AR Implementation (React Native + ARKit/ARCore):**

```typescript
import { ViroARSceneNavigator } from '@viro-community/react-viro';

const ARFurnitureViewer = () => {
  const [furnitureModels, setFurnitureModels] = useState<FurnitureModel[]>([]);

  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: ARScene
      }}
      viroAppProps={{ models: furnitureModels }}
    />
  );
};

const ARScene = (props: any) => {
  const [anchorPosition, setAnchorPosition] = useState<number[]>([0, 0, -2]);

  return (
    <ViroARScene>
      {props.arSceneNavigator.viroAppProps.models.map((model, index) => (
        <Viro3DObject
          key={index}
          source={{ uri: model.modelUrl }}
          type="GLB"
          position={[
            anchorPosition[0] + model.x,
            anchorPosition[1],
            anchorPosition[2] + model.y
          ]}
          scale={[1, 1, 1]}
          rotation={[0, model.rotation, 0]}
          onDrag={(dragToPos) => {
            // Update position in real-time
            model.x = dragToPos[0];
            model.y = dragToPos[2];
          }}
        />
      ))}

      {/* Ground plane for reference */}
      <ViroQuad
        position={[0, 0, 0]}
        rotation={[-90, 0, 0]}
        width={10}
        height={10}
        materials={["grid"]}
      />
    </ViroARScene>
  );
};
```

---

### Agent 8: Procurement & Logistics Agent

**Purpose:** Automate order processing, track shipments, and coordinate installation.

#### Capabilities

**Order Management:**
- Auto-generate purchase orders from approved budgets
- Send orders to manufacturers via EDI or API
- Track order acknowledgments and confirmations
- Manage change orders and cancellations
- Handle split shipments and backorders

**Inventory Visibility:**
- Real-time stock levels from ERP
- Lead time tracking (standard vs. custom)
- Production capacity monitoring
- Alternative suggestions for out-of-stock items

**Shipment Tracking:**
- Integration with freight carriers (FedEx, UPS, etc.)
- Real-time GPS tracking for deliveries
- Proactive delay notifications
- Delivery window coordination
- White glove service scheduling

**Installation Coordination:**
- Crew scheduling based on delivery arrivals
- Site access coordination
- Punch list management
- Photographic documentation
- As-built reconciliation

#### Technical Implementation

```python
class ProcurementOrchestrator:
    def __init__(self):
        self.erp_client = ERPClient()
        self.edi_client = EDIClient()
        self.shipping_tracker = ShippingTracker()
        self.notification_service = NotificationService()

    async def process_order(
        self,
        approved_budget: BudgetScenario,
        customer_info: CustomerInfo,
        delivery_info: DeliveryInfo
    ) -> PurchaseOrder:
        """Convert approved budget to purchase order"""

        # Generate PO number
        po_number = self.generate_po_number()

        # Create PO in ERP
        po = PurchaseOrder(
            po_number=po_number,
            customer=customer_info,
            delivery_address=delivery_info.address,
            requested_delivery_date=delivery_info.requested_date,
            line_items=[]
        )

        for item in approved_budget.line_items:
            # Check inventory
            stock_info = await self.erp_client.check_inventory(item.product.sku)

            if stock_info.available_quantity >= item.quantity:
                lead_time = stock_info.standard_lead_time
                ship_date = date.today() + timedelta(days=lead_time)
            else:
                # Trigger production order
                production_order = await self.erp_client.create_production_order(
                    item.product.sku,
                    item.quantity
                )
                lead_time = production_order.estimated_lead_time
                ship_date = production_order.estimated_completion_date

            po.line_items.append(POLineItem(
                product=item.product,
                quantity=item.quantity,
                unit_price=item.unit_price,
                extended_price=item.extended_price,
                estimated_ship_date=ship_date
            ))

        # Submit to ERP
        await self.erp_client.submit_purchase_order(po)

        # Send EDI 850 (Purchase Order) to suppliers if needed
        if self.requires_supplier_po(po):
            await self.edi_client.send_850(po)

        # Notify stakeholders
        await self.notification_service.notify_order_placed(po)

        return po

    async def track_shipments(self, po_number: str) -> List[Shipment]:
        """Track all shipments for a PO"""

        # Get shipment details from ERP
        shipments = await self.erp_client.get_shipments(po_number)

        # Enrich with carrier tracking
        enriched_shipments = []
        for shipment in shipments:
            tracking_info = await self.shipping_tracker.get_tracking(
                carrier=shipment.carrier,
                tracking_number=shipment.tracking_number
            )

            shipment.current_location = tracking_info.current_location
            shipment.estimated_delivery = tracking_info.estimated_delivery
            shipment.delivery_exceptions = tracking_info.exceptions

            enriched_shipments.append(shipment)

        return enriched_shipments

    async def monitor_delays(self):
        """Background job to monitor for delays and proactively notify"""

        # Get all active orders
        active_orders = await self.erp_client.get_active_orders()

        for order in active_orders:
            shipments = await self.track_shipments(order.po_number)

            for shipment in shipments:
                # Check for delays
                if shipment.estimated_delivery > shipment.original_estimated_delivery:
                    delay_days = (shipment.estimated_delivery - shipment.original_estimated_delivery).days

                    # Notify customer
                    await self.notification_service.notify_delay(
                        customer=order.customer,
                        order_number=order.po_number,
                        delay_days=delay_days,
                        new_estimated_delivery=shipment.estimated_delivery,
                        reason=shipment.delivery_exceptions[0] if shipment.delivery_exceptions else "Carrier delay"
                    )

                    # Suggest mitigation
                    if delay_days > 7:
                        alternatives = await self.find_alternative_products(shipment.line_items)
                        if alternatives:
                            await self.notification_service.notify_alternatives(
                                customer=order.customer,
                                delayed_items=shipment.line_items,
                                alternatives=alternatives
                            )
```

**EDI Integration:**
- EDI 850: Purchase Order
- EDI 855: Purchase Order Acknowledgment
- EDI 856: Advance Ship Notice
- EDI 810: Invoice
- EDI 997: Functional Acknowledgment

**Notification Channels:**
- Email (SendGrid)
- SMS (Twilio)
- Slack webhooks
- Push notifications (mobile app)
- In-app notifications

---

## Machine Learning Models

### Model 1: Product Recommendation Model

**Architecture:** Two-tower neural network with user and product embeddings

**Training Data:**
- 50,000+ historical projects
- 10M+ product selections
- User interaction logs (views, saves, purchases)
- Contextual features (industry, space type, budget)

**Features:**

**User Features:**
- Industry vertical (one-hot encoded)
- Company size (log-scaled)
- Geographic region
- Past product preferences (embedding)
- Budget range (binned)

**Product Features:**
- Category (one-hot encoded)
- Price (log-scaled)
- Sustainability score
- Lead time
- Product features (TF-IDF + embedding)
- Image embeddings (ResNet-50)

**Model Architecture:**
```python
import torch
import torch.nn as nn

class TwoTowerRecommender(nn.Module):
    def __init__(
        self,
        n_users: int,
        n_products: int,
        embedding_dim: int = 128,
        hidden_dims: List[int] = [256, 128, 64]
    ):
        super().__init__()

        # User tower
        self.user_embedding = nn.Embedding(n_users, embedding_dim)
        self.user_tower = self.build_tower(
            embedding_dim + user_feature_dim,
            hidden_dims
        )

        # Product tower
        self.product_embedding = nn.Embedding(n_products, embedding_dim)
        self.product_tower = self.build_tower(
            embedding_dim + product_feature_dim,
            hidden_dims
        )

    def build_tower(self, input_dim, hidden_dims):
        layers = []
        prev_dim = input_dim
        for hidden_dim in hidden_dims:
            layers.append(nn.Linear(prev_dim, hidden_dim))
            layers.append(nn.ReLU())
            layers.append(nn.BatchNorm1d(hidden_dim))
            layers.append(nn.Dropout(0.2))
            prev_dim = hidden_dim
        return nn.Sequential(*layers)

    def forward(self, user_ids, user_features, product_ids, product_features):
        # User embeddings
        user_emb = self.user_embedding(user_ids)
        user_input = torch.cat([user_emb, user_features], dim=1)
        user_vec = self.user_tower(user_input)

        # Product embeddings
        product_emb = self.product_embedding(product_ids)
        product_input = torch.cat([product_emb, product_features], dim=1)
        product_vec = self.product_tower(product_input)

        # Dot product for similarity
        scores = (user_vec * product_vec).sum(dim=1)

        return scores
```

**Training:**
- Loss: BPR (Bayesian Personalized Ranking) or BCE
- Optimizer: Adam with lr=0.001
- Batch size: 1024
- Negative sampling: 4 negatives per positive
- Evaluation: Precision@10, nDCG@20, Hit Rate@10

**Serving:**
- Batch prediction for candidate generation (nightly)
- Store top-500 candidates per user in Redis
- Real-time re-ranking with contextual features
- Sub-100ms latency

---

### Model 2: Layout Generation Model

**Architecture:** Conditional GAN or Transformer-based layout generator

**Approach:** Use a seq2seq model that treats furniture layout as a sequence generation problem.

**Training Data:**
- 20,000+ floor plans with furniture layouts
- Layouts labeled by designer expertise (good vs. bad)
- Space constraints and requirements

**Model: Layout Transformer**

```python
class LayoutTransformer(nn.Module):
    """
    Generates furniture layouts as sequences of placement actions.
    Each action: (furniture_type, x, y, rotation)
    """

    def __init__(
        self,
        vocab_size: int,  # Number of furniture types
        d_model: int = 512,
        nhead: int = 8,
        num_layers: int = 6
    ):
        super().__init__()

        # Encoder: Floor plan features
        self.floor_plan_encoder = nn.Sequential(
            nn.Conv2d(1, 64, 7, 2, 3),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(64, 128, 3, 1, 1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Flatten(),
            nn.Linear(128 * 16 * 16, d_model)
        )

        # Decoder: Sequential layout generation
        self.furniture_embedding = nn.Embedding(vocab_size, d_model)
        self.position_embedding = PositionalEncoding(d_model)

        decoder_layer = nn.TransformerDecoderLayer(d_model, nhead)
        self.transformer_decoder = nn.TransformerDecoder(decoder_layer, num_layers)

        # Output heads
        self.furniture_head = nn.Linear(d_model, vocab_size)
        self.position_head = nn.Linear(d_model, 2)  # (x, y)
        self.rotation_head = nn.Linear(d_model, 4)  # 0°, 90°, 180°, 270°

    def forward(self, floor_plan, furniture_sequence):
        # Encode floor plan
        floor_plan_feat = self.floor_plan_encoder(floor_plan)
        memory = floor_plan_feat.unsqueeze(0)  # (1, batch, d_model)

        # Embed furniture sequence
        tgt = self.furniture_embedding(furniture_sequence)
        tgt = self.position_embedding(tgt)

        # Decode
        output = self.transformer_decoder(tgt, memory)

        # Predict next placement
        furniture_logits = self.furniture_head(output)
        position = self.position_head(output)
        rotation_logits = self.rotation_head(output)

        return furniture_logits, position, rotation_logits
```

**Training:**
- Teacher forcing with scheduled sampling
- Loss: Cross-entropy (furniture type, rotation) + MSE (position)
- Data augmentation: Flip, rotate, scale floor plans
- Validation: IoU (intersection over union) with ground truth

**Inference:**
- Autoregressive generation
- Beam search with beam width=5
- Post-processing: Constraint satisfaction (no overlaps, clearances)

---

### Model 3: Demand Forecasting Model

**Purpose:** Predict future demand for products and project volume.

**Architecture:** Time series forecasting with LSTMs or Transformers

**Training Data:**
- 5 years of sales history
- Seasonality (end-of-year budgets, summer lull)
- Economic indicators (GDP, unemployment, office vacancy rates)
- Leading indicators (estimates created, quote requests)

**Features:**
- Lagged sales (t-1, t-2, ..., t-12 months)
- Moving averages (3-month, 6-month)
- Trend (linear, polynomial)
- Seasonality (monthly dummies, Fourier terms)
- External regressors (macro indicators)

**Model:**
```python
import torch
import torch.nn as nn

class DemandForecaster(nn.Module):
    def __init__(
        self,
        input_dim: int,
        hidden_dim: int = 128,
        num_layers: int = 2,
        forecast_horizon: int = 6
    ):
        super().__init__()

        self.lstm = nn.LSTM(
            input_dim,
            hidden_dim,
            num_layers,
            batch_first=True,
            dropout=0.2
        )

        self.fc = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim // 2, forecast_horizon)
        )

    def forward(self, x):
        # x: (batch, seq_len, input_dim)
        lstm_out, _ = self.lstm(x)

        # Use last hidden state
        last_hidden = lstm_out[:, -1, :]

        # Forecast next N months
        forecast = self.fc(last_hidden)

        return forecast
```

**Training:**
- Loss: RMSE or MAPE
- Walk-forward validation (no data leakage)
- Ensembling with XGBoost and Prophet

**Performance:**
- MAPE (Mean Absolute Percentage Error) < 15%
- Forecast horizon: 6 months
- Update frequency: Monthly with new data

---

## Data Strategy

### Data Assets

**1. Project Data (Crown Jewel):**
- 60+ years of project history
- 50,000+ completed projects
- Win/loss data (what was quoted vs. purchased)
- Design iterations and changes
- Client feedback and satisfaction scores

**Value:** Train models on "what works" in real-world projects

---

**2. Product Data:**
- 5,000+ SKUs with detailed attributes
- Dimensions, weights, materials, finishes
- Pricing and cost data
- Lead times and availability
- 3D models and images
- Sustainability data (LCA, certifications)

**Value:** Enable intelligent product recommendations and filtering

---

**3. User Interaction Data:**
- Page views, clicks, time spent
- Search queries
- Saved projects and favorites
- Abandoned estimates
- A/B test results

**Value:** Personalization and UX optimization

---

**4. Manufacturing Data:**
- Production costs and capacity
- Quality control metrics
- Supply chain disruptions
- Customization feasibility

**Value:** Real-time feasibility checking and cost estimation

---

**5. Market Data:**
- Competitor products and pricing
- Industry trends (remote work, hoteling)
- Economic indicators
- Real estate data (office leasing activity)

**Value:** Strategic insights and demand forecasting

---

### Data Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Data Sources                           │
├─────────────────────────────────────────────────────────────┤
│  ERP  │  CRM  │  Website  │  Mobile App  │  External APIs  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Data Ingestion (CDC)                       │
│              Debezium + Kafka / AWS Kinesis                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Data Lake (S3 / Azure Blob)                │
│         Raw data stored in Parquet/ORC format               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│            ETL Orchestration (Airflow / Prefect)            │
│  - Data cleaning          - Feature engineering             │
│  - Deduplication          - Aggregations                    │
│  - Schema validation      - ML feature generation           │
└─────────────────────────────────────────────────────────────┘
                            │
          ┌─────────────────┴─────────────────┐
          ▼                                    ▼
┌──────────────────────┐          ┌──────────────────────┐
│   Data Warehouse     │          │   Feature Store      │
│ (Snowflake/BigQuery) │          │  (Feast / Tecton)    │
│                      │          │                      │
│  - Historical data   │          │  - Real-time features│
│  - Aggregated metrics│          │  - Batch features    │
│  - Business reports  │          │  - Feature lineage   │
└──────────────────────┘          └──────────────────────┘
          │                                    │
          ▼                                    ▼
┌──────────────────────┐          ┌──────────────────────┐
│    BI Tools          │          │   ML Models          │
│  (Looker/Tableau)    │          │ (Training & Serving) │
└──────────────────────┘          └──────────────────────┘
```

### Data Governance

**Privacy & Security:**
- PII encryption at rest and in transit
- Role-based access control (RBAC)
- Data masking for non-production environments
- Audit logs for all data access
- Regular security reviews

**Quality:**
- Data validation rules (Great Expectations)
- Anomaly detection
- Schema evolution management
- Data lineage tracking (Apache Atlas)

**Compliance:**
- GDPR right to erasure
- CCPA data export
- Data retention policies
- Cross-border transfer restrictions

---

## AI Ethics & Governance

### Ethical Principles

1. **Transparency:** Explain AI recommendations clearly
2. **Fairness:** Avoid bias in product recommendations
3. **Privacy:** Minimize data collection, respect user rights
4. **Safety:** Human oversight for high-stakes decisions
5. **Accountability:** Clear ownership for AI decisions

### Bias Mitigation

**Potential Biases:**
- Product recommendations favor popular items (filter bubble)
- Layout generation trained on limited design styles
- Pricing algorithms disadvantage small buyers

**Mitigation Strategies:**
- Diverse training data across industries, regions, project sizes
- Fairness metrics in evaluation (disparate impact)
- Regular audits by independent reviewers
- User feedback mechanism to report bias
- Ensemble models to reduce single-source bias

### Human Oversight

**Low-Risk Decisions (Automated):**
- Product suggestions
- Budget scenarios
- Compliance warnings
- Sustainability scores

**High-Risk Decisions (Human-in-Loop):**
- Custom orders >$100K
- Layouts with compliance violations
- Unusual project requirements
- First-time customers

**Override Capability:**
- Users can always override AI suggestions
- Track override rate as signal of model quality
- Learn from overrides to improve models

### AI Incident Response

**Monitoring:**
- Model performance dashboards
- Alert on degradation (accuracy drop >5%)
- User feedback sentiment analysis
- A/B test statistical significance

**Incident Protocol:**
1. Detect: Automated monitoring triggers alert
2. Assess: On-call ML engineer investigates
3. Contain: Rollback to previous model or disable feature
4. Fix: Retrain or patch model
5. Review: Post-mortem document lessons learned

---

## Competitive Intelligence

### Market Landscape

**Traditional Competitors:**
1. Herman Miller (MillerKnoll)
2. Steelcase
3. Haworth
4. Knoll (Teknion)
5. Kimball International

**Software/Platform Competitors:**
1. WeWork Workplace
2. Robin Powered
3. Density
4. OfficeSpace
5. Managed by Q

### Competitive Analysis: AI Capabilities

| Company | AI Maturity | Key Capabilities | OFS Position |
|---------|-------------|------------------|--------------|
| **Herman Miller** | Medium | AR product viewer, basic configurators | OFS differentiation: End-to-end AI agents |
| **Steelcase** | Medium | Workplace analytics, occupancy prediction | OFS differentiation: AI-driven specification |
| **Haworth** | Low | Basic digital tools, template libraries | OFS advantage: 2-3 years ahead |
| **WeWork** | High | AI space optimization, demand forecasting | Different market (facility management vs. furniture) |
| **Robin** | High | Occupancy ML, meeting room booking AI | Potential partner or acquirer |

### Competitive Moats

**Data Moat (Strong):**
- 60 years of OFS project data inaccessible to competitors
- Manufacturing cost data enables accurate pricing
- Customer relationship data for personalization

**Technology Moat (Moderate):**
- 12-18 month lead on multi-agent architecture
- Proprietary ML models trained on OFS data
- Patents pending on key innovations

**Network Effects (Weak Initially, Strong Long-Term):**
- More projects → better models → better recommendations → more projects
- Third-party integrations create switching costs
- Dealer ecosystem lock-in

**Brand Moat (Moderate):**
- Family-owned, American-made positioning
- Sustainability leadership
- "AI-first" furniture company perception

---

## Implementation Roadmap

### Phase 1: MVP (Months 1-4) - $1.2M

**Objective:** Replace current estimator with AI-enhanced version

**Team:**
- 1 Product Manager
- 1 Product Designer
- 3 Frontend Engineers (React/TypeScript)
- 3 Backend Engineers (Node.js/Python)
- 2 ML Engineers
- 1 DevOps Engineer
- 1 QA Engineer
- **Total: 12 FTE**

**Key Deliverables:**
- ✅ Conversational intake interface (GPT-4 powered)
- ✅ Floor plan upload and basic parsing
- ✅ Product recommendation MVP (collaborative filtering)
- ✅ Budget scenario generation (3 tiers)
- ✅ Basic 3D visualization (Three.js)
- ✅ User authentication and project storage
- ✅ API infrastructure
- ✅ Analytics and monitoring

**Success Criteria:**
- 500 MAU
- 5,000 estimates created
- <10 min average time per estimate
- 60+ NPS
- <5% error rate

**Risks:**
- LLM hallucination in conversational interface
- Floor plan parsing accuracy <80%
- ERP integration delays

**Mitigation:**
- Structured output + validation rules for LLM
- Manual fallback UI for floor plan review
- Mock data for MVP, real integration in Phase 2

---

### Phase 2: Intelligence (Months 5-8) - $1.5M

**Objective:** Add AI recommendations and collaboration

**Team:**
- Same core team
- +1 Mobile Engineer (React Native)
- +1 ML Engineer
- **Total: 14 FTE**

**Key Deliverables:**
- ✅ Design recommendation engine (neural network)
- ✅ Voice input (Whisper API)
- ✅ Compliance checking automation
- ✅ Multi-user collaboration platform
- ✅ Version control and approvals
- ✅ Sustainability tracking
- ✅ Cloud rendering integration
- ✅ Mobile app (iOS, Android)

**Success Criteria:**
- 2,500 MAU
- 65% AI recommendation acceptance
- 4+ scenarios explored per project
- 70+ NPS
- 70% mobile MAU

**Risks:**
- Recommendation model underperforms (< 50% acceptance)
- Compliance rule complexity
- Mobile app performance issues

**Mitigation:**
- A/B test multiple recommendation algorithms
- Partner with compliance consultant for rule validation
- Performance testing on low-end devices

---

### Phase 3: Ecosystem (Months 9-12) - $1.8M

**Objective:** Build platform and integrations

**Team:**
- Same core team
- +2 Integration Engineers
- +1 VR Developer (Unity)
- +1 Data Analyst
- **Total: 17 FTE**

**Key Deliverables:**
- ✅ Public API and developer portal
- ✅ Revit plugin (C# + Forge API)
- ✅ SketchUp plugin (Ruby API)
- ✅ Salesforce connector
- ✅ AR capabilities (ARKit, ARCore)
- ✅ VR experience (Quest, Vision Pro)
- ✅ Procurement automation
- ✅ Predictive analytics dashboard

**Success Criteria:**
- 10,000 MAU
- 50+ third-party integrations
- $50M revenue attribution
- 75+ NPS
- API usage: 1M+ calls/month

**Risks:**
- Third-party adoption slow
- VR experience motion sickness issues
- Procurement integration complexity

**Mitigation:**
- Partner with 5 key integrators for co-development
- VR comfort mode settings (teleportation, vignetting)
- Phase procurement by manufacturer (OFS first, suppliers later)

---

### Phase 4: Scale (Year 2) - $3M

**Objective:** Global expansion and advanced capabilities

**Key Deliverables:**
- Multi-language support (Spanish, French, German, Chinese, Japanese)
- Advanced ML (reinforcement learning for layout optimization)
- White-label platform for large dealers
- Marketplace for third-party plugins
- IoT integration (space utilization sensors)
- Automated installation planning

**Success Criteria:**
- 50,000 MAU
- 30% international revenue
- Platform fee revenue >$5M/year

---

## ROI Analysis

### Cost-Benefit Model

**Investment Summary:**
| Phase | Investment | Timeline |
|-------|-----------|----------|
| Phase 1 | $1.2M | Months 1-4 |
| Phase 2 | $1.5M | Months 5-8 |
| Phase 3 | $1.8M | Months 9-12 |
| **Total Year 1** | **$4.5M** | **12 months** |

**Revenue Impact:**

**Direct Revenue Attribution:**
- Increased win rate: 36% → 45% = +25% wins
  - Baseline: 1,000 proposals @ $150K avg = $150M quote value
  - Current win: $150M × 36% = $54M
  - New win: $150M × 45% = $67.5M
  - **Incremental: $13.5M/year**

**Indirect Revenue Attribution:**
- Expanded reach: 500 → 10,000 users = 20x adoption
  - Additional $30M in self-service orders
- Intelligent upselling: 15% average deal size increase
  - $67.5M × 15% = **$10M/year**

**Total Revenue Impact: $53.5M/year**

---

**Cost Savings:**

**Operational Efficiency:**
- Sales rep time savings: 3 hours → 0.5 hours per estimate
  - 10,000 estimates/year × 2.5 hours saved × $75/hour = **$1.9M/year**

**Reduced Errors:**
- Change order reduction: 8% error rate → 2%
  - Avg change order cost: $10K
  - Projects with change orders: 500/year
  - Change orders avoided: 500 × (8% - 2%) = 30/year
  - Savings: 30 × $10K = **$300K/year**

**Manufacturing Efficiency:**
- Better demand forecasting reduces overproduction
  - **$500K/year**

**Total Cost Savings: $2.7M/year**

---

**Total Year 1 Benefit: $56.2M**

**Payback Period: 4.5M / 56.2M × 12 months = 0.96 months**

*(Note: Conservative estimate assuming only partial realization of benefits in Year 1)*

**More Realistic Payback: 8-10 months** (accounting for ramp-up)

---

### 5-Year Financial Projection

| Year | Investment | Revenue Impact | Cost Savings | Net Benefit | Cumulative ROI |
|------|-----------|----------------|--------------|-------------|----------------|
| 1 | $4.5M | $30M | $2.7M | $28.2M | 527% |
| 2 | $3M | $53M | $3.5M | $53.5M | 1,617% |
| 3 | $2M | $75M | $4M | $77M | 2,973% |
| 4 | $1.5M | $95M | $4.5M | $98M | 4,573% |
| 5 | $1M | $115M | $5M | $119M | 6,500% |
| **Total** | **$12M** | **$368M** | **$19.7M** | **$375.7M** | **3,031%** |

---

### Risk-Adjusted ROI

**Downside Scenario (30% probability):**
- Adoption slower than expected (5,000 MAU vs. 10,000)
- Revenue impact: $25M (vs. $53M)
- Cost savings: $1.5M (vs. $2.7M)
- Net benefit Year 1: $22M
- ROI: 389%

**Base Case (50% probability):**
- As modeled above
- ROI: 527%

**Upside Scenario (20% probability):**
- Viral adoption (20,000 MAU)
- Platform revenue from APIs and integrations ($5M)
- Revenue impact: $70M
- Cost savings: $4M
- Net benefit Year 1: $69.5M
- ROI: 1,444%

**Expected Value:**
- 0.30 × $22M + 0.50 × $28M + 0.20 × $69.5M = **$34.5M**
- **Expected ROI: 667%**

---

## Conclusion

The AI transformation of OFS represents a **once-in-a-generation opportunity** to redefine the furniture industry through technology. By implementing a multi-agent AI architecture, OFS can:

1. **Differentiate:** Become the only furniture manufacturer with comprehensive AI-powered specification
2. **Accelerate:** Reduce time-to-quote by 6-12x
3. **Scale:** Enable 20x more users without proportional cost increase
4. **Monetize Data:** Turn 60 years of project data into competitive advantage
5. **Future-Proof:** Build a platform for continuous innovation

**The window of opportunity is narrow.** Competitors are investing in digital, and software-first entrants are eyeing the furniture space. Moving now positions OFS as the **AI-first furniture company**, a brand position that will compound over decades.

**Recommended Action:** Approve Phase 1 funding ($1.2M) and form cross-functional team to begin implementation immediately.

---

**Document Control:**
- **Last Updated:** October 14, 2025
- **Next Review:** November 15, 2025
- **Approvals Required:** CEO, CTO, CFO, VP Product, VP Sales
- **Classification:** Internal - Strategic
