# API Documentation
## OFS AI-Enhanced Platform API Reference

**Version:** 1.0.0
**Last Updated:** January 2025
**Base URL:** `https://api.ofs.com/v1`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Core APIs](#core-apis)
3. [AI Services APIs](#ai-services-apis)
4. [Webhook APIs](#webhook-apis)
5. [Rate Limits & Quotas](#rate-limits--quotas)
6. [Error Codes](#error-codes)
7. [SDKs & Libraries](#sdks--libraries)

---

## Authentication

All API requests require authentication using JWT tokens or API keys.

### OAuth 2.0 Flow

```http
POST /auth/token
Content-Type: application/json

{
  "grant_type": "client_credentials",
  "client_id": "your_client_id",
  "client_secret": "your_client_secret"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### API Key Authentication

Include the API key in the request header:

```http
Authorization: Bearer your_api_key_here
X-OFS-API-Key: your_api_key_here
```

---

## Core APIs

### Projects API

#### Create Project

```http
POST /projects
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Corporate HQ Renovation",
  "description": "Complete office furniture for 10,000 sq ft space",
  "client": {
    "name": "Acme Corporation",
    "email": "facilities@acme.com",
    "phone": "+1-555-123-4567"
  },
  "budget": {
    "min": 500000,
    "max": 750000,
    "currency": "USD"
  },
  "requirements": {
    "space_type": "open_office",
    "employee_count": 150,
    "workstation_count": 120,
    "meeting_rooms": 8,
    "collaboration_spaces": 5
  },
  "timeline": {
    "delivery_date": "2025-06-15",
    "installation_date": "2025-06-20"
  }
}
```

**Response (201 Created):**
```json
{
  "id": "proj_2kJ8hD3mNp9Qr5X",
  "name": "Corporate HQ Renovation",
  "status": "draft",
  "created_at": "2025-01-14T10:30:00Z",
  "updated_at": "2025-01-14T10:30:00Z",
  "owner_id": "user_5Km2nP8qRt4Vx7Y",
  "urls": {
    "self": "/projects/proj_2kJ8hD3mNp9Qr5X",
    "floor_plans": "/projects/proj_2kJ8hD3mNp9Qr5X/floor-plans",
    "recommendations": "/projects/proj_2kJ8hD3mNp9Qr5X/recommendations"
  }
}
```

#### Get Project Details

```http
GET /projects/{project_id}
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": "proj_2kJ8hD3mNp9Qr5X",
  "name": "Corporate HQ Renovation",
  "status": "in_progress",
  "progress": {
    "floor_plan_uploaded": true,
    "space_analyzed": true,
    "products_recommended": true,
    "budget_optimized": false,
    "compliance_checked": false
  },
  "floor_plan": {
    "id": "fp_3mK9jE4oQs0Rt6Y",
    "file_url": "https://s3.amazonaws.com/ofs-floor-plans/...",
    "dimensions": {
      "total_area_sqft": 10000,
      "usable_area_sqft": 8500
    },
    "spaces": [
      {
        "id": "space_1",
        "type": "open_office",
        "area_sqft": 6000,
        "workstations": 120
      },
      {
        "id": "space_2",
        "type": "meeting_room",
        "area_sqft": 400,
        "capacity": 12
      }
    ]
  },
  "recommendations": {
    "summary": {
      "total_items": 245,
      "total_cost": 625000,
      "sustainability_score": 87
    },
    "categories": [
      {
        "category": "workstations",
        "item_count": 120,
        "subtotal": 360000
      },
      {
        "category": "seating",
        "item_count": 180,
        "subtotal": 180000
      }
    ]
  },
  "budget_scenarios": [
    {
      "id": "scenario_base",
      "name": "Base Configuration",
      "total": 625000,
      "roi_years_3": 1250000,
      "payback_months": 18
    },
    {
      "id": "scenario_premium",
      "name": "Premium with Sustainability",
      "total": 725000,
      "roi_years_3": 1450000,
      "payback_months": 16
    }
  ]
}
```

#### Update Project

```http
PATCH /projects/{project_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "approved",
  "budget": {
    "selected_scenario": "scenario_premium"
  }
}
```

#### Delete Project

```http
DELETE /projects/{project_id}
Authorization: Bearer {token}
```

**Response (204 No Content)**

---

### Floor Plans API

#### Upload Floor Plan

```http
POST /projects/{project_id}/floor-plans
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "file": <binary_data>,
  "format": "pdf",
  "scale": "1/4 inch = 1 foot",
  "auto_analyze": true
}
```

**Response (201 Created):**
```json
{
  "id": "fp_3mK9jE4oQs0Rt6Y",
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "file_url": "https://s3.amazonaws.com/ofs-floor-plans/...",
  "file_name": "hq-floor-plan.pdf",
  "file_size_bytes": 2458624,
  "status": "processing",
  "created_at": "2025-01-14T10:35:00Z",
  "analysis_job_id": "job_4nL0kF5pRt1Su7Z"
}
```

#### Get Floor Plan Analysis

```http
GET /floor-plans/{floor_plan_id}/analysis
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "floor_plan_id": "fp_3mK9jE4oQs0Rt6Y",
  "status": "completed",
  "analysis": {
    "dimensions": {
      "total_area_sqft": 10000,
      "usable_area_sqft": 8500,
      "circulation_area_sqft": 1500
    },
    "detected_spaces": [
      {
        "id": "space_1",
        "type": "open_office",
        "confidence": 0.94,
        "bbox": [120, 80, 800, 600],
        "area_sqft": 6000,
        "suggested_capacity": 120
      }
    ],
    "structural_elements": [
      {
        "type": "column",
        "locations": [[200, 200], [400, 200], [600, 200]]
      },
      {
        "type": "window",
        "locations": [[0, 100], [0, 300], [0, 500]]
      }
    ],
    "compliance": {
      "ada_compliant": true,
      "egress_compliant": true,
      "issues": []
    }
  },
  "processing_time_ms": 4532,
  "completed_at": "2025-01-14T10:35:45Z"
}
```

---

### Products API

#### Search Products

```http
GET /products?category=seating&price_max=500&sustainability_min=70
Authorization: Bearer {token}
```

**Query Parameters:**
- `category` (string): Product category filter
- `price_min` (number): Minimum price filter
- `price_max` (number): Maximum price filter
- `sustainability_min` (number): Minimum sustainability score (0-100)
- `query` (string): Text search query
- `limit` (number): Results per page (default: 50, max: 200)
- `offset` (number): Pagination offset

**Response (200 OK):**
```json
{
  "total": 147,
  "limit": 50,
  "offset": 0,
  "products": [
    {
      "id": "prod_5oM1lG6qSu2Tv8A",
      "sku": "OFS-CHAIR-EXC-001",
      "name": "Executive Task Chair with Arms",
      "category": "seating",
      "description": "Ergonomic executive chair with adjustable lumbar support",
      "price": {
        "list": 495.00,
        "dealer": 346.50,
        "currency": "USD"
      },
      "specifications": {
        "dimensions": {
          "width_in": 26,
          "depth_in": 26,
          "height_in": 41
        },
        "weight_lbs": 45,
        "weight_capacity_lbs": 300,
        "materials": ["aluminum", "mesh", "recycled_plastic"]
      },
      "sustainability": {
        "score": 87,
        "certifications": ["BIFMA LEVEL 3", "GREENGUARD Gold"],
        "recycled_content_pct": 45,
        "recyclable_pct": 95
      },
      "images": [
        {
          "url": "https://cdn.ofs.com/products/chair-exec-001-front.jpg",
          "type": "front"
        }
      ],
      "availability": {
        "in_stock": true,
        "lead_time_days": 14,
        "moq": 1
      }
    }
  ]
}
```

#### Get Product Details

```http
GET /products/{product_id}
Authorization: Bearer {token}
```

---

## AI Services APIs

### Conversational AI API

#### Start Conversation

```http
POST /ai/conversations
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "initial_message": "I need furniture for a 10,000 sq ft office space with 150 employees"
}
```

**Response (201 Created):**
```json
{
  "conversation_id": "conv_6pN2mH7rTv3Uw9B",
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "messages": [
    {
      "id": "msg_1",
      "role": "user",
      "content": "I need furniture for a 10,000 sq ft office space with 150 employees",
      "timestamp": "2025-01-14T10:40:00Z"
    },
    {
      "id": "msg_2",
      "role": "assistant",
      "content": "I'd be happy to help you furnish your office space! To provide the best recommendations, I have a few questions:\n\n1. What type of work environment are you creating? (open office, private offices, hybrid)\n2. What's your budget range?\n3. Do you have any sustainability goals?\n4. When do you need delivery?",
      "timestamp": "2025-01-14T10:40:02Z",
      "confidence": 0.96
    }
  ],
  "extracted_requirements": {
    "space_size_sqft": 10000,
    "employee_count": 150,
    "confidence": 0.92
  }
}
```

#### Continue Conversation

```http
POST /ai/conversations/{conversation_id}/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "We need an open office with 120 workstations and 8 meeting rooms. Budget is around $600k. Sustainability is important to us.",
  "context": {
    "include_project_data": true
  }
}
```

**Response (200 OK):**
```json
{
  "message_id": "msg_3",
  "role": "assistant",
  "content": "Perfect! Based on your requirements, I've updated your project:\n\n- 120 workstations for open office\n- 8 meeting rooms (varying sizes)\n- Budget: $600,000\n- High sustainability priority\n\nI can now analyze your space and provide furniture recommendations. Would you like to upload a floor plan, or should I generate layout options based on your 10,000 sq ft space?",
  "timestamp": "2025-01-14T10:42:15Z",
  "actions_taken": [
    {
      "type": "update_project",
      "project_id": "proj_2kJ8hD3mNp9Qr5X",
      "updates": {
        "requirements.workstation_count": 120,
        "requirements.meeting_rooms": 8,
        "budget.target": 600000,
        "preferences.sustainability": "high"
      }
    }
  ],
  "extracted_requirements": {
    "workstation_count": 120,
    "meeting_rooms": 8,
    "budget": 600000,
    "sustainability_priority": "high",
    "confidence": 0.94
  },
  "suggested_next_steps": [
    "upload_floor_plan",
    "view_recommendations",
    "explore_sustainability_options"
  ]
}
```

---

### Product Recommendation API

#### Get AI Recommendations

```http
POST /ai/recommendations
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "preferences": {
    "style": ["modern", "minimalist"],
    "sustainability_weight": 0.8,
    "budget_flexibility": 0.1,
    "prioritize_ergonomics": true
  },
  "constraints": {
    "max_lead_time_days": 30,
    "preferred_brands": ["OFS", "HBF", "KI"]
  }
}
```

**Response (200 OK):**
```json
{
  "recommendation_id": "rec_7qO3nI8sUw4Vx0C",
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "generated_at": "2025-01-14T10:45:00Z",
  "summary": {
    "total_items": 245,
    "total_cost": 587500,
    "budget_variance_pct": -2.1,
    "avg_sustainability_score": 84,
    "avg_lead_time_days": 21
  },
  "recommendations": [
    {
      "category": "workstations",
      "items": [
        {
          "product_id": "prod_WS-001",
          "quantity": 120,
          "unit_price": 2500,
          "total_price": 300000,
          "confidence_score": 0.91,
          "reasoning": "Height-adjustable workstations match your ergonomic priority and sustainability goals (BIFMA LEVEL 3 certified). Popular choice for open office environments.",
          "alternatives": [
            {
              "product_id": "prod_WS-002",
              "price_diff": -500,
              "sustainability_diff": -12,
              "lead_time_diff": +7
            }
          ]
        }
      ]
    }
  ],
  "insights": [
    {
      "type": "cost_optimization",
      "message": "Switching to the alternative seating option could save $18,000 while maintaining 95% of functionality.",
      "impact": "medium",
      "suggested_action": "review_alternative"
    },
    {
      "type": "sustainability",
      "message": "Your selection achieves 84% average sustainability score, exceeding industry average of 67%.",
      "impact": "positive"
    }
  ],
  "ml_model_info": {
    "model_version": "v2.3.1",
    "training_date": "2025-01-01",
    "confidence": 0.89
  }
}
```

---

### Space Analysis API

#### Analyze Space with AI

```http
POST /ai/space-analysis
Authorization: Bearer {token}
Content-Type: application/json

{
  "floor_plan_id": "fp_3mK9jE4oQs0Rt6Y",
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "analysis_options": {
    "optimize_layout": true,
    "ergonomics_check": true,
    "collaboration_zones": true,
    "privacy_analysis": true
  }
}
```

**Response (200 OK):**
```json
{
  "analysis_id": "analysis_8rP4oJ9tVx5Wy1D",
  "floor_plan_id": "fp_3mK9jE4oQs0Rt6Y",
  "status": "completed",
  "results": {
    "space_utilization": {
      "overall_efficiency": 0.85,
      "workstation_density": 14.2,
      "circulation_ratio": 0.15,
      "collaboration_space_pct": 12
    },
    "layout_recommendations": [
      {
        "zone": "main_workspace",
        "current_capacity": 120,
        "optimized_capacity": 135,
        "reasoning": "Adjusting workstation layout to 120-degree clusters can increase capacity by 12% while improving collaboration.",
        "confidence": 0.87
      }
    ],
    "ergonomics": {
      "natural_light_coverage_pct": 78,
      "avg_distance_to_window_ft": 22,
      "noise_zones": [
        {
          "zone": "near_kitchen",
          "noise_level": "high",
          "recommendation": "Add acoustic panels and quiet zones"
        }
      ]
    },
    "collaboration_zones": [
      {
        "id": "collab_1",
        "type": "informal_meeting",
        "capacity": 6,
        "location": [400, 300],
        "reasoning": "High-traffic intersection with natural light"
      }
    ],
    "compliance_check": {
      "ada_compliant": true,
      "fire_code_compliant": true,
      "egress_paths_clear": true,
      "issues": []
    }
  },
  "visualizations": [
    {
      "type": "heatmap",
      "metric": "natural_light",
      "url": "https://cdn.ofs.com/analysis/heatmap-light-..."
    },
    {
      "type": "layout_proposal",
      "url": "https://cdn.ofs.com/analysis/layout-proposal-..."
    }
  ]
}
```

---

### Budget Optimization API

#### Optimize Budget

```http
POST /ai/budget-optimization
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "recommendation_id": "rec_7qO3nI8sUw4Vx0C",
  "optimization_goals": {
    "target_budget": 600000,
    "flexibility_pct": 5,
    "maintain_quality_threshold": 0.8,
    "sustainability_min": 75
  },
  "scenarios": ["conservative", "balanced", "aggressive"]
}
```

**Response (200 OK):**
```json
{
  "optimization_id": "opt_9sQ5pK0uWy6Xz2E",
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "scenarios": [
    {
      "id": "scenario_conservative",
      "name": "Conservative - Core Essentials",
      "total_cost": 575000,
      "savings_pct": 4.2,
      "quality_score": 85,
      "sustainability_score": 78,
      "roi_analysis": {
        "payback_months": 22,
        "roi_3_year": 1150000,
        "roi_5_year": 2300000
      },
      "trade_offs": [
        {
          "category": "seating",
          "change": "Standard mesh chairs instead of premium ergonomic",
          "cost_impact": -15000,
          "quality_impact": -8
        }
      ]
    },
    {
      "id": "scenario_balanced",
      "name": "Balanced - Optimal Mix",
      "total_cost": 600000,
      "savings_pct": 0,
      "quality_score": 92,
      "sustainability_score": 84,
      "roi_analysis": {
        "payback_months": 18,
        "roi_3_year": 1350000,
        "roi_5_year": 2700000
      },
      "trade_offs": []
    },
    {
      "id": "scenario_aggressive",
      "name": "Aggressive - Premium Investment",
      "total_cost": 630000,
      "additional_cost_pct": 5,
      "quality_score": 96,
      "sustainability_score": 89,
      "roi_analysis": {
        "payback_months": 16,
        "roi_3_year": 1575000,
        "roi_5_year": 3150000
      },
      "premium_benefits": [
        {
          "benefit": "Advanced ergonomic seating reduces injury claims",
          "value_estimate": 75000
        },
        {
          "benefit": "Premium sustainability earns LEED credits",
          "value_estimate": 50000
        }
      ]
    }
  ],
  "recommendation": {
    "suggested_scenario": "scenario_aggressive",
    "reasoning": "Despite 5% higher upfront cost, premium scenario offers best ROI (16-month payback) and aligns with stated sustainability priorities. Employee health benefits justify incremental investment.",
    "confidence": 0.88
  }
}
```

---

### Sustainability Intelligence API

#### Get Sustainability Analysis

```http
POST /ai/sustainability-analysis
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "recommendation_id": "rec_7qO3nI8sUw4Vx0C"
}
```

**Response (200 OK):**
```json
{
  "analysis_id": "sust_0tR6qL1vXz7Y03F",
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "overall_score": 84,
  "grade": "A-",
  "certifications": {
    "achievable": ["LEED Silver", "WELL Building Standard"],
    "potential_with_changes": ["LEED Gold"]
  },
  "metrics": {
    "recycled_content_pct": 52,
    "recyclable_at_eol_pct": 87,
    "voc_emissions": "low",
    "carbon_footprint_kg": 28500,
    "carbon_offset_cost_usd": 855
  },
  "breakdown": [
    {
      "category": "workstations",
      "avg_score": 86,
      "certifications": ["BIFMA LEVEL 3", "FSC Certified"],
      "highlights": [
        "45% recycled aluminum content",
        "95% recyclable at end of life"
      ]
    }
  ],
  "recommendations": [
    {
      "action": "swap_lighting",
      "description": "Switch to LED lighting with daylight sensors",
      "cost_impact": +12000,
      "score_improvement": +4,
      "payback_months": 18,
      "priority": "high"
    }
  ],
  "lifecycle_analysis": {
    "manufacturing_impact_pct": 35,
    "transportation_impact_pct": 15,
    "usage_impact_pct": 45,
    "eol_impact_pct": 5,
    "total_lifecycle_years": 15
  },
  "carbon_comparison": {
    "your_project_kg": 28500,
    "industry_average_kg": 42000,
    "reduction_pct": 32,
    "equivalent_trees_planted": 475
  }
}
```

---

### 3D Visualization API

#### Generate 3D Visualization

```http
POST /ai/visualization/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "project_id": "proj_2kJ8hD3mNp9Qr5X",
  "floor_plan_id": "fp_3mK9jE4oQs0Rt6Y",
  "recommendation_id": "rec_7qO3nI8sUw4Vx0C",
  "render_options": {
    "quality": "high",
    "lighting": "natural_daytime",
    "camera_angles": ["isometric", "walkthrough"],
    "include_people": true,
    "style": "photorealistic"
  }
}
```

**Response (202 Accepted):**
```json
{
  "job_id": "viz_1uS7rM2wYa8Z14G",
  "status": "processing",
  "estimated_completion_time": "2025-01-14T10:52:00Z",
  "status_url": "/ai/visualization/jobs/viz_1uS7rM2wYa8Z14G"
}
```

#### Get Visualization Status

```http
GET /ai/visualization/jobs/{job_id}
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "job_id": "viz_1uS7rM2wYa8Z14G",
  "status": "completed",
  "created_at": "2025-01-14T10:50:00Z",
  "completed_at": "2025-01-14T10:51:45Z",
  "renders": [
    {
      "id": "render_1",
      "type": "isometric",
      "url": "https://cdn.ofs.com/visualizations/render-iso-...",
      "thumbnail_url": "https://cdn.ofs.com/visualizations/thumb-iso-...",
      "format": "png",
      "resolution": "3840x2160",
      "file_size_mb": 12.4
    },
    {
      "id": "render_2",
      "type": "walkthrough",
      "url": "https://cdn.ofs.com/visualizations/walkthrough-...",
      "format": "mp4",
      "duration_seconds": 45,
      "file_size_mb": 87.6
    }
  ],
  "interactive_model": {
    "url": "https://viewer.ofs.com/3d/viz_1uS7rM2wYa8Z14G",
    "format": "gltf",
    "supports_ar": true,
    "supports_vr": true
  }
}
```

---

## Webhook APIs

### Configure Webhooks

```http
POST /webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-domain.com/ofs-webhook",
  "events": [
    "project.created",
    "project.updated",
    "floor_plan.analyzed",
    "recommendation.generated",
    "visualization.completed"
  ],
  "secret": "your_webhook_secret",
  "active": true
}
```

### Webhook Event Payload Example

```json
{
  "id": "evt_2vT8sN3xZb9A25H",
  "type": "recommendation.generated",
  "created_at": "2025-01-14T10:45:00Z",
  "data": {
    "project_id": "proj_2kJ8hD3mNp9Qr5X",
    "recommendation_id": "rec_7qO3nI8sUw4Vx0C",
    "summary": {
      "total_items": 245,
      "total_cost": 587500
    }
  },
  "signature": "sha256=..."
}
```

---

## Rate Limits & Quotas

### Rate Limits

| Plan | Requests/minute | Requests/hour | Requests/day |
|------|----------------|---------------|--------------|
| Free | 60 | 1,000 | 10,000 |
| Professional | 300 | 10,000 | 100,000 |
| Enterprise | 1,000 | 50,000 | 1,000,000 |

### Quota Limits

| Resource | Free | Professional | Enterprise |
|----------|------|--------------|-----------|
| Projects | 10 | 100 | Unlimited |
| Floor Plans | 50 MB/month | 500 MB/month | Unlimited |
| AI Requests | 100/month | 1,000/month | Unlimited |
| 3D Renders | 5/month | 50/month | Unlimited |

### Rate Limit Headers

```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 285
X-RateLimit-Reset: 1705233600
```

---

## Error Codes

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 202 | Accepted | Request accepted for processing |
| 204 | No Content | Request succeeded with no response body |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but not authorized |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource conflict |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

### Error Response Format

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "budget.min",
        "issue": "must be less than budget.max",
        "value": 750000
      }
    ],
    "request_id": "req_3wU9tO4yAc0B36I",
    "documentation_url": "https://docs.ofs.com/errors/validation_error"
  }
}
```

### Error Codes Reference

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `authentication_required` | 401 | Missing authentication credentials |
| `invalid_token` | 401 | Invalid or expired authentication token |
| `insufficient_permissions` | 403 | User lacks required permissions |
| `resource_not_found` | 404 | Requested resource doesn't exist |
| `validation_error` | 422 | Request validation failed |
| `rate_limit_exceeded` | 429 | Too many requests |
| `quota_exceeded` | 429 | Usage quota exceeded |
| `processing_error` | 500 | Error processing request |
| `ai_service_error` | 503 | AI service temporarily unavailable |

---

## SDKs & Libraries

### Official SDKs

**JavaScript/TypeScript:**
```bash
npm install @ofs/api-client
```

```typescript
import { OFSClient } from '@ofs/api-client';

const client = new OFSClient({
  apiKey: process.env.OFS_API_KEY
});

const project = await client.projects.create({
  name: 'Corporate HQ Renovation',
  budget: { min: 500000, max: 750000 }
});

const recommendations = await client.ai.getRecommendations({
  projectId: project.id,
  preferences: {
    sustainability_weight: 0.8
  }
});
```

**Python:**
```bash
pip install ofs-api-client
```

```python
from ofs import OFSClient

client = OFSClient(api_key=os.environ['OFS_API_KEY'])

project = client.projects.create(
    name='Corporate HQ Renovation',
    budget={'min': 500000, 'max': 750000}
)

recommendations = client.ai.get_recommendations(
    project_id=project.id,
    preferences={'sustainability_weight': 0.8}
)
```

**C# (.NET):**
```bash
dotnet add package OFS.ApiClient
```

```csharp
using OFS.ApiClient;

var client = new OFSClient(Environment.GetEnvironmentVariable("OFS_API_KEY"));

var project = await client.Projects.CreateAsync(new CreateProjectRequest
{
    Name = "Corporate HQ Renovation",
    Budget = new Budget { Min = 500000, Max = 750000 }
});
```

---

## Support & Resources

- **Documentation:** https://docs.ofs.com
- **API Status:** https://status.ofs.com
- **Support:** api-support@ofs.com
- **Developer Portal:** https://developers.ofs.com
- **Community Forum:** https://community.ofs.com
- **Changelog:** https://docs.ofs.com/changelog

---

## Changelog

### v1.0.0 (January 2025)
- Initial API release
- Core project management endpoints
- AI services (conversation, recommendations, space analysis)
- 3D visualization support
- Webhook support
