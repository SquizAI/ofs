# Integration Guides
## Technical Integration Documentation

**Version:** 1.0.0
**Last Updated:** January 2025

---

## Table of Contents

1. [Overview](#overview)
2. [Authentication & Authorization](#authentication--authorization)
3. [CAD/BIM Integrations](#cadbim-integrations)
4. [CRM Integrations](#crm-integrations)
5. [ERP Integrations](#erp-integrations)
6. [Project Management Tools](#project-management-tools)
7. [Analytics & BI](#analytics--bi)
8. [Webhooks & Events](#webhooks--events)
9. [SSO Integration](#sso-integration)
10. [Custom Integrations](#custom-integrations)

---

## Overview

The OFS AI-Enhanced Platform is designed with an API-first architecture, enabling seamless integrations with existing enterprise tools and workflows.

### Integration Architecture

```
┌──────────────────────────────────────────────────────────┐
│              Partner/Enterprise Systems                   │
│  (CAD, CRM, ERP, PM Tools, BI, etc.)                     │
└──────────────────────┬───────────────────────────────────┘
                       │
                ┌──────▼─────┐
                │ API Gateway │
                │   (Kong)    │
                └──────┬──────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌────▼────┐ ┌──────▼───────┐
│  REST APIs   │ │ GraphQL │ │  Webhooks    │
└──────────────┘ └─────────┘ └──────────────┘
```

### Integration Methods

| Method | Best For | Complexity | Real-time |
|--------|----------|------------|-----------|
| **REST API** | CRUD operations, data sync | Low | Yes |
| **GraphQL** | Flexible data querying | Medium | Yes |
| **Webhooks** | Event notifications | Low | Yes |
| **OAuth 2.0** | Third-party auth | Medium | N/A |
| **SAML/SSO** | Enterprise auth | High | N/A |
| **Plugins** | Deep integrations (CAD) | High | Yes |

---

## Authentication & Authorization

### OAuth 2.0 Integration

**Use Case:** Allow third-party applications to access OFS API on behalf of users.

#### Step 1: Register Your Application

```http
POST https://api.ofs.com/v1/oauth/apps
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "name": "Acme Design Tools",
  "description": "Interior design software",
  "website": "https://acmedesign.com",
  "redirect_uris": [
    "https://acmedesign.com/oauth/callback"
  ],
  "scopes": ["projects:read", "projects:write", "products:read"]
}
```

**Response:**
```json
{
  "client_id": "ofs_app_2kJ8hD3mNp9Qr5X",
  "client_secret": "ofs_secret_abc123...",
  "redirect_uris": ["https://acmedesign.com/oauth/callback"]
}
```

#### Step 2: Authorization Flow

**1. Redirect user to OFS authorization page:**

```
https://auth.ofs.com/authorize?
  client_id=ofs_app_2kJ8hD3mNp9Qr5X&
  redirect_uri=https://acmedesign.com/oauth/callback&
  response_type=code&
  scope=projects:read projects:write&
  state=random_state_string
```

**2. User approves, OFS redirects back:**

```
https://acmedesign.com/oauth/callback?
  code=auth_code_xyz789&
  state=random_state_string
```

**3. Exchange code for access token:**

```http
POST https://api.ofs.com/v1/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=auth_code_xyz789&
client_id=ofs_app_2kJ8hD3mNp9Qr5X&
client_secret=ofs_secret_abc123&
redirect_uri=https://acmedesign.com/oauth/callback
```

**Response:**
```json
{
  "access_token": "ofs_token_...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "ofs_refresh_...",
  "scope": "projects:read projects:write"
}
```

#### Step 3: Use Access Token

```http
GET https://api.ofs.com/v1/projects
Authorization: Bearer ofs_token_...
```

---

## CAD/BIM Integrations

### Autodesk Revit Plugin

**Use Case:** Import floor plans from Revit, sync furniture families, export back to Revit.

#### Installation

```bash
# Download Revit plugin
curl -O https://downloads.ofs.com/plugins/ofs-revit-plugin-v1.0.0.zip

# Install via Revit Add-ins Manager
# File > Autodesk App Store > Install from File
```

#### Plugin Features

1. **Floor Plan Export:** Export Revit floor plans to OFS platform
2. **Family Sync:** Automatically import OFS furniture families
3. **Bidirectional Sync:** Changes in OFS reflect in Revit
4. **3D Visualization:** Launch OFS 3D viewer from Revit

#### Configuration

```csharp
// In Revit: Add-ins > OFS Platform > Settings

{
  "api_key": "your_api_key_here",
  "api_endpoint": "https://api.ofs.com/v1",
  "auto_sync": true,
  "sync_interval_minutes": 15,
  "default_project_folder": "C:\\Projects\\OFS"
}
```

#### Code Example

```csharp
using OFS.RevitPlugin;

// Export floor plan to OFS
public class ExportFloorPlanCommand : IExternalCommand
{
  public Result Execute(
    ExternalCommandData commandData,
    ref string message,
    ElementSet elements)
  {
    // Get active document
    Document doc = commandData.Application.ActiveUIDocument.Document;

    // Initialize OFS client
    var ofsClient = new OFSClient(apiKey: "your_api_key");

    // Export floor plan
    var floorPlan = doc.GetFloorPlan(Level.Ground);
    var ofsProject = ofsClient.Projects.Create(new CreateProjectRequest
    {
      Name = doc.Title,
      FloorPlan = floorPlan.ToPDF()
    });

    // Upload and trigger AI analysis
    ofsClient.FloorPlans.Analyze(ofsProject.Id);

    return Result.Succeeded;
  }
}
```

---

### AutoCAD Integration

**Use Case:** Import DWG/DXF files, export recommended layouts.

#### API Approach (No Plugin Required)

```python
import requests
import ezdxf

# Load AutoCAD file
dwg = ezdxf.readfile("floor_plan.dwg")

# Convert to PDF for upload
pdf_bytes = dwg.export_to_pdf()

# Upload to OFS
response = requests.post(
    "https://api.ofs.com/v1/floor-plans",
    headers={"Authorization": f"Bearer {api_key}"},
    files={"file": ("floor_plan.pdf", pdf_bytes, "application/pdf")},
    data={"project_id": project_id, "auto_analyze": True}
)

floor_plan_id = response.json()["id"]

# Poll for analysis completion
while True:
    analysis = requests.get(
        f"https://api.ofs.com/v1/floor-plans/{floor_plan_id}/analysis",
        headers={"Authorization": f"Bearer {api_key}"}
    ).json()

    if analysis["status"] == "completed":
        break

    time.sleep(5)

print(f"Detected {len(analysis['detected_spaces'])} spaces")
```

---

### SketchUp Extension

**Use Case:** Import 3D models, place OFS furniture, export for visualization.

#### Installation

```
Extension Warehouse > Search "OFS AI Platform" > Install
```

#### Usage

```ruby
# SketchUp Ruby API extension

module OFS
  class FurniturePlacer

    def initialize(api_key)
      @client = OFS::APIClient.new(api_key)
    end

    def place_furniture(project_id)
      # Get recommendations from OFS
      recommendations = @client.get_recommendations(project_id)

      # Place each item in SketchUp model
      model = Sketchup.active_model
      recommendations["items"].each do |item|
        # Load 3D component from OFS
        component_url = item["model_3d_url"]
        definition = model.definitions.load(component_url)

        # Place at specified location
        location = item["placement"]
        transformation = Geom::Transformation.new(
          [location["x"], location["y"], location["z"]]
        )

        model.active_entities.add_instance(definition, transformation)
      end
    end
  end
end
```

---

## CRM Integrations

### Salesforce Integration

**Use Case:** Sync projects to Salesforce opportunities, track sales pipeline.

#### Setup

1. **Install OFS App from Salesforce AppExchange**
2. **Configure OAuth Connection**
3. **Map Fields**

#### Field Mapping

| OFS Field | Salesforce Field | Sync Direction |
|-----------|------------------|----------------|
| Project Name | Opportunity Name | Bidirectional |
| Budget | Amount | Bidirectional |
| Status | Stage | Bidirectional |
| Client | Account | OFS → Salesforce |
| Owner | Opportunity Owner | Salesforce → OFS |

#### Automation Rules

```javascript
// Salesforce Apex Trigger
trigger OFSOpportunitySync on Opportunity (after insert, after update) {

  for (Opportunity opp : Trigger.new) {
    if (opp.StageName == 'Design Phase') {
      // Create OFS project
      OFS__Project__c project = new OFS__Project__c();
      project.Name = opp.Name;
      project.OFS__Budget_Min__c = opp.Amount * 0.9;
      project.OFS__Budget_Max__c = opp.Amount * 1.1;
      project.OFS__Opportunity__c = opp.Id;

      insert project;

      // Call OFS API to create project
      OFSAPIService.createProject(project);
    }
  }
}
```

#### Webhook Handler

```python
# Receive updates from OFS platform
from flask import Flask, request
import salesforce_api

app = Flask(__name__)

@app.route('/webhooks/ofs', methods=['POST'])
def ofs_webhook():
    event = request.json

    if event['type'] == 'project.approved':
        project_id = event['data']['project_id']
        opp_id = get_salesforce_opportunity_id(project_id)

        # Update Salesforce opportunity
        salesforce_api.update_opportunity(opp_id, {
            'StageName': 'Proposal Approved',
            'OFS_Estimate_Amount__c': event['data']['total_cost']
        })

    return {'status': 'success'}
```

---

### HubSpot Integration

**Use Case:** Track marketing attribution, sync contacts, manage deal pipeline.

#### Setup via Zapier

**Trigger:** New OFS Project Created
**Action:** Create HubSpot Deal

```json
{
  "trigger": {
    "app": "OFS Platform",
    "event": "New Project"
  },
  "action": {
    "app": "HubSpot",
    "event": "Create Deal",
    "mapping": {
      "dealname": "{{project.name}}",
      "amount": "{{project.budget.target}}",
      "dealstage": "quote",
      "pipeline": "sales",
      "ofs_project_id": "{{project.id}}"
    }
  }
}
```

---

## ERP Integrations

### SAP Integration

**Use Case:** Sync product catalog, push approved orders to SAP for fulfillment.

#### Architecture

```
OFS Platform → Middleware (MuleSoft) → SAP S/4HANA
```

#### Product Catalog Sync

```xml
<!-- MuleSoft Flow: Sync Products from SAP to OFS -->
<flow name="sync-products-sap-to-ofs">
  <poll frequency="3600000"> <!-- Every hour -->
    <sap:execute
      target="SAP_Materials"
      query="SELECT MATNR, MAKTX, NETPR FROM MARA WHERE MTART = 'FURN'"
    />
  </poll>

  <foreach collection="#[payload]">
    <http:request
      method="POST"
      url="https://api.ofs.com/v1/products"
      config-ref="OFS_API">
      <http:request-builder>
        <http:header name="Authorization" value="Bearer ${ofs.api.key}"/>
        <http:body>
          {
            "sku": "#[payload.MATNR]",
            "name": "#[payload.MAKTX]",
            "list_price": "#[payload.NETPR]"
          }
        </http:body>
      </http:request-builder>
    </http:request>
  </foreach>
</flow>
```

#### Order Fulfillment

```xml
<!-- MuleSoft Flow: Push Approved Orders to SAP -->
<flow name="push-order-to-sap">
  <http:listener
    path="/webhooks/ofs/project-approved"
    config-ref="Webhook_Listener"
  />

  <sap:execute target="Create_Sales_Order">
    <sap:parameters>
      <sap:parameter key="VBELN">#{project.id}</sap:parameter>
      <sap:parameter key="KUNNR">#{project.client.sap_id}</sap:parameter>
      <sap:parameter key="ITEMS">#{project.items}</sap:parameter>
    </sap:parameters>
  </sap:execute>

  <logger message="SAP Order Created: #{payload.VBELN}"/>
</flow>
```

---

### NetSuite Integration

**Use Case:** Sync customers, products, and orders between OFS and NetSuite.

#### SuiteScript Example

```javascript
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/https', 'N/record'], (https, record) => {

  function afterSubmit(context) {
    if (context.type !== context.UserEventType.CREATE) return;

    const salesOrder = context.newRecord;
    const ofsProjectId = salesOrder.getValue('custbody_ofs_project_id');

    if (ofsProjectId) {
      // Notify OFS that order was created in NetSuite
      https.post({
        url: 'https://api.ofs.com/v1/projects/' + ofsProjectId + '/order-created',
        headers: {
          'Authorization': 'Bearer ' + getOFSApiKey(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          netsuite_order_id: salesOrder.id,
          order_total: salesOrder.getValue('total'),
          status: 'processing'
        })
      });
    }
  }

  return { afterSubmit };
});
```

---

## Project Management Tools

### Asana Integration

**Use Case:** Create Asana tasks from OFS project milestones, track progress.

#### API Integration

```python
import asana
import requests

# Initialize clients
asana_client = asana.Client.access_token('asana_token')
ofs_client = requests.Session()
ofs_client.headers.update({'Authorization': f'Bearer {ofs_api_key}'})

# When OFS project is approved, create Asana tasks
def create_asana_tasks(ofs_project_id):
    # Get project details from OFS
    project = ofs_client.get(
        f'https://api.ofs.com/v1/projects/{ofs_project_id}'
    ).json()

    # Create Asana project
    asana_project = asana_client.projects.create({
        'name': f"OFS: {project['name']}",
        'workspace': 'workspace_id',
        'notes': f"Budget: ${project['budget']['target']}"
    })

    # Create tasks for each milestone
    tasks = [
        {'name': 'Generate floor plan', 'due_on': '+7d'},
        {'name': 'Review AI recommendations', 'due_on': '+14d'},
        {'name': 'Client presentation', 'due_on': '+21d'},
        {'name': 'Finalize order', 'due_on': '+30d'},
        {'name': 'Delivery & installation', 'due_on': '+60d'}
    ]

    for task_data in tasks:
        asana_client.tasks.create({
            'name': task_data['name'],
            'projects': [asana_project['gid']],
            'due_on': calculate_due_date(task_data['due_on'])
        })
```

---

### Monday.com Integration

**Use Case:** Sync OFS projects to Monday boards, track status.

#### GraphQL Integration

```javascript
const mondayClient = require('monday-sdk-js')();
mondayClient.setToken('monday_api_token');

async function syncOFSProjectToMonday(ofsProject) {
  // Create Monday item
  const query = `
    mutation {
      create_item (
        board_id: 123456789,
        group_id: "new_projects",
        item_name: "${ofsProject.name}",
        column_values: ${JSON.stringify({
          "status": "In Progress",
          "budget": ofsProject.budget.target,
          "ofs_project_id": ofsProject.id,
          "client": ofsProject.client.name
        })}
      ) {
        id
      }
    }
  `;

  const response = await mondayClient.api(query);
  return response.data.create_item.id;
}

// Listen for OFS webhook updates
app.post('/webhooks/ofs', async (req, res) => {
  const event = req.body;

  if (event.type === 'project.status_changed') {
    // Update Monday item
    await mondayClient.api(`
      mutation {
        change_column_value (
          item_id: ${event.data.monday_item_id},
          column_id: "status",
          value: "${mapOFSStatusToMonday(event.data.status)}"
        ) {
          id
        }
      }
    `);
  }

  res.json({ success: true });
});
```

---

## Analytics & BI

### Power BI Integration

**Use Case:** Create real-time dashboards of OFS metrics and KPIs.

#### Direct Query Connection

```powerquery
let
    Source = Json.Document(Web.Contents(
        "https://api.ofs.com/v1/analytics/projects",
        [
            Headers=[
                #"Authorization"="Bearer " & OFJS_API_KEY,
                #"Content-Type"="application/json"
            ],
            Query=[
                #"start_date"="2025-01-01",
                #"end_date"="2025-12-31"
            ]
        ]
    )),
    ProjectsTable = Table.FromList(
        Source[projects],
        Splitter.SplitByNothing(),
        null,
        null,
        ExtraValues.Error
    ),
    ExpandedColumns = Table.ExpandRecordColumn(
        ProjectsTable,
        "Column1",
        {"id", "name", "status", "budget", "created_at"}
    )
in
    ExpandedColumns
```

#### Scheduled Refresh

```powershell
# Power BI Service API - Schedule refresh
$headers = @{
    "Authorization" = "Bearer $powerBIToken"
    "Content-Type" = "application/json"
}

$body = @{
    "value" = @{
        "days" = @("Monday", "Tuesday", "Wednesday", "Thursday", "Friday")
        "times" = @("08:00", "12:00", "16:00")
        "enabled" = $true
        "localTimeZoneId" = "UTC"
    }
} | ConvertTo-Json

Invoke-RestMethod `
    -Uri "https://api.powerbi.com/v1.0/myorg/datasets/$datasetId/refreshSchedule" `
    -Method PATCH `
    -Headers $headers `
    -Body $body
```

---

### Tableau Integration

**Use Case:** Visualize OFS data in Tableau dashboards.

#### Web Data Connector

```javascript
// Tableau Web Data Connector (WDC)
(function() {
  const myConnector = tableau.makeConnector();

  myConnector.getSchema = function(schemaCallback) {
    const projectSchema = {
      id: "ofs_projects",
      alias: "OFS Projects",
      columns: [
        { id: "id", dataType: tableau.dataType.string },
        { id: "name", dataType: tableau.dataType.string },
        { id: "status", dataType: tableau.dataType.string },
        { id: "budget", dataType: tableau.dataType.float },
        { id: "created_at", dataType: tableau.dataType.datetime }
      ]
    };

    schemaCallback([projectSchema]);
  };

  myConnector.getData = function(table, doneCallback) {
    fetch('https://api.ofs.com/v1/projects', {
      headers: { 'Authorization': 'Bearer ' + tableau.password }
    })
    .then(response => response.json())
    .then(data => {
      const tableData = data.projects.map(project => ({
        id: project.id,
        name: project.name,
        status: project.status,
        budget: project.budget.target,
        created_at: new Date(project.created_at)
      }));

      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);
})();
```

---

## Webhooks & Events

### Event Types

| Event Type | Triggered When | Payload Includes |
|------------|---------------|------------------|
| `project.created` | New project created | Project details |
| `project.updated` | Project modified | Changed fields |
| `project.approved` | Project approved by client | Final selections, budget |
| `floor_plan.uploaded` | Floor plan file uploaded | File URL, metadata |
| `floor_plan.analyzed` | AI analysis complete | Detected spaces, dimensions |
| `recommendation.generated` | AI creates recommendations | Items, pricing, sustainability |
| `visualization.completed` | 3D render finished | Render URLs |

### Webhook Configuration

```http
POST https://api.ofs.com/v1/webhooks
Authorization: Bearer {token}
Content-Type: application/json

{
  "url": "https://your-domain.com/webhooks/ofs",
  "events": [
    "project.approved",
    "recommendation.generated"
  ],
  "secret": "your_webhook_secret"
}
```

### Webhook Handler Example

```python
from flask import Flask, request, abort
import hmac
import hashlib

app = Flask(__name__)
WEBHOOK_SECRET = "your_webhook_secret"

@app.route('/webhooks/ofs', methods=['POST'])
def handle_ofs_webhook():
    # Verify signature
    signature = request.headers.get('X-OFS-Signature')
    body = request.get_data()

    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode(),
        body,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected_signature):
        abort(401, "Invalid signature")

    # Process event
    event = request.json
    event_type = event['type']

    if event_type == 'project.approved':
        handle_project_approved(event['data'])
    elif event_type == 'recommendation.generated':
        handle_recommendation_generated(event['data'])

    return {'status': 'success'}

def handle_project_approved(data):
    # Send email, create order, update CRM, etc.
    print(f"Project {data['project_id']} approved for ${data['total_cost']}")
```

---

## SSO Integration

### SAML 2.0 Setup

**Use Case:** Enterprise SSO using SAML 2.0 (Okta, Azure AD, OneLogin).

#### Configuration (Azure AD Example)

**1. Register OFS as Enterprise Application in Azure AD**

**2. Configure SAML Settings:**

```
Entity ID: https://auth.ofs.com/saml/metadata
Reply URL: https://auth.ofs.com/saml/acs
Sign-on URL: https://app.ofs.com
```

**3. Attribute Mapping:**

| Azure AD Attribute | OFS Claim |
|-------------------|-----------|
| user.mail | email |
| user.givenname | first_name |
| user.surname | last_name |
| user.companyname | organization |

**4. Test SSO Flow:**

```bash
# User clicks "Sign in with SSO"
https://app.ofs.com/sso/initiate?domain=acmecorp.com

# Redirected to Azure AD
https://login.microsoftonline.com/...

# After authentication, redirected back with SAML assertion
https://auth.ofs.com/saml/acs
```

---

## Custom Integrations

### Building a Custom Integration

**Example: Integrate with proprietary space planning tool**

#### Step 1: Understand the API

Review API documentation at https://docs.ofs.com/api

#### Step 2: Authentication

```python
import requests

OFS_API_KEY = "your_api_key"
OFS_API_BASE = "https://api.ofs.com/v1"

headers = {
    "Authorization": f"Bearer {OFS_API_KEY}",
    "Content-Type": "application/json"
}
```

#### Step 3: Create Project

```python
def create_ofs_project(space_data):
    response = requests.post(
        f"{OFS_API_BASE}/projects",
        headers=headers,
        json={
            "name": space_data["project_name"],
            "requirements": {
                "space_type": space_data["type"],
                "employee_count": space_data["employees"],
                "workstation_count": space_data["workstations"]
            },
            "budget": {
                "min": space_data["budget"] * 0.9,
                "max": space_data["budget"] * 1.1
            }
        }
    )

    return response.json()["id"]
```

#### Step 4: Upload Floor Plan

```python
def upload_floor_plan(project_id, floor_plan_file):
    with open(floor_plan_file, 'rb') as f:
        response = requests.post(
            f"{OFS_API_BASE}/projects/{project_id}/floor-plans",
            headers={"Authorization": f"Bearer {OFS_API_KEY}"},
            files={"file": f},
            data={"auto_analyze": True}
        )

    return response.json()["id"]
```

#### Step 5: Get Recommendations

```python
def get_recommendations(project_id):
    response = requests.post(
        f"{OFS_API_BASE}/ai/recommendations",
        headers=headers,
        json={
            "project_id": project_id,
            "preferences": {
                "sustainability_weight": 0.8
            }
        }
    )

    return response.json()
```

#### Step 6: Complete Integration

```python
def complete_integration_workflow(space_data, floor_plan_file):
    # Create project
    project_id = create_ofs_project(space_data)
    print(f"Created project: {project_id}")

    # Upload floor plan
    floor_plan_id = upload_floor_plan(project_id, floor_plan_file)
    print(f"Uploaded floor plan: {floor_plan_id}")

    # Wait for analysis
    time.sleep(10)  # Or poll until complete

    # Get recommendations
    recommendations = get_recommendations(project_id)
    print(f"Generated {len(recommendations['items'])} recommendations")

    return {
        "project_id": project_id,
        "recommendations": recommendations
    }
```

---

## Support & Resources

- **API Documentation:** https://docs.ofs.com/api
- **Integration Forum:** https://community.ofs.com/integrations
- **Technical Support:** integrations@ofs.com
- **Office Hours:** Tuesdays 2-4pm ET (book at https://cal.ofs.com/integrations)

---

## Changelog

### v1.0.0 (January 2025)
- Initial integration guide release
- OAuth 2.0 implementation
- CAD/BIM integrations (Revit, AutoCAD, SketchUp)
- CRM integrations (Salesforce, HubSpot)
- ERP integrations (SAP, NetSuite)
- Project management tools (Asana, Monday)
- BI tools (Power BI, Tableau)
- Webhook system
- SSO/SAML support
