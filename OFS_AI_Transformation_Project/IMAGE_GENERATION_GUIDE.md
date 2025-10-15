# Image Generation Guide
## Using Gemini API for GitHub Social Preview Images

This guide explains how to generate images using the Gemini API for your GitHub repository.

---

## Setup

### 1. Environment Variables

The API key is stored in `.env` file (already configured):

```bash
# .env
GEMINI_API_KEY=your_api_key_here
```

**⚠️ Security:** The `.env` file is excluded from git via `.gitignore`

### 2. Directory Structure

```
OFS_AI_Transformation_Project/
├── .env                          # API credentials (gitignored)
├── .gitignore                    # Excludes .env and generated images
├── generated-images/             # Output directory (gitignored)
│   └── ofs-github-preview.png   # Generated image
└── IMAGE_GENERATION_GUIDE.md    # This file
```

---

## Generate Image (Basic)

### Using curl with .env

```bash
# Load environment variables
source .env

# Generate image
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}" \
-H 'Content-Type: application/json' \
-d '{
  "contents": [{
    "parts": [{
      "text": "Your detailed image prompt here"
    }]
  }],
  "generationConfig": {
    "response_modalities": ["image"]
  }
}' -o /tmp/gemini_response.json

# Extract and save image
cat /tmp/gemini_response.json | python3 -c "
import json, base64, sys
data = json.load(sys.stdin)
image_data = data['candidates'][0]['content']['parts'][0]['inlineData']['data']
with open('generated-images/output.png', 'wb') as f:
    f.write(base64.b64decode(image_data))
print('✅ Image saved!')
"
```

---

## OFS GitHub Preview Image

### Generated Image Details

**File:** `generated-images/ofs-github-preview.png`
**Size:** 1.0 MB
**Dimensions:** ~1024x1024 (Gemini default)

### Prompt Used

```
Create a professional GitHub repository social media preview image (1200x630px)
for an AI transformation project. Modern design with deep navy blue to light blue
gradient background (#003D5C to #0085C7).

Left side (60%):
- Bold white title "OFS AI Transformation"
- Subtitle "AI-Enhanced Platform" in light blue
- 3 key metrics: "1,144% ROI" (Year 1), "$264M NPV" (5 Years), "10 Months" (Payback)
- 4 feature icons: Multi-Agent AI, Smart Recommendations, Budget Optimization, Sustainability

Right side (40%):
- Isometric illustration of modern office furniture
- Floating AI elements (chat bubbles, analytics graphs)
- Holographic interface

Bottom bar:
- GitHub logo with "SquizAI/ofs"
- Text "650 pages • 15 documents • Complete implementation guide"

Style: Professional tech aesthetic, high contrast, Inter font, subtle shadows
```

---

## Advanced Usage

### Reusable Script

Create `generate-image.sh`:

```bash
#!/bin/bash

# Load API key
source .env

# Prompt from command line argument or default
PROMPT="${1:-A modern tech company logo}"

# Generate image
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}" \
-H 'Content-Type: application/json' \
-d "{
  \"contents\": [{
    \"parts\": [{
      \"text\": \"${PROMPT}\"
    }]
  }],
  \"generationConfig\": {
    \"response_modalities\": [\"image\"]
  }
}" -o /tmp/response.json

# Save image
python3 -c "
import json, base64
with open('/tmp/response.json') as f:
    data = json.load(f)
image_data = data['candidates'][0]['content']['parts'][0]['inlineData']['data']
with open('generated-images/latest.png', 'wb') as out:
    out.write(base64.b64decode(image_data))
print('✅ Saved to generated-images/latest.png')
"
```

Make executable and use:

```bash
chmod +x generate-image.sh
./generate-image.sh "A sunset over mountains"
```

---

## Using Generated Image on GitHub

### Option 1: Manual Upload (Recommended)

1. Go to GitHub repository settings
2. Navigate to "Social preview" section
3. Upload `generated-images/ofs-github-preview.png`

### Option 2: Using GitHub API

```bash
# Install GitHub CLI
brew install gh

# Authenticate
gh auth login

# Update social preview (requires GraphQL)
# Note: This feature may require GitHub Enterprise
```

### Option 3: README Badge

Add to README.md:

```markdown
<p align="center">
  <img src="generated-images/ofs-github-preview.png" alt="OFS AI Transformation" width="600"/>
</p>
```

---

## API Reference

### Gemini Image Generation API

**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent`

**Model:** `gemini-2.5-flash-image`

**Cost:** ~$0.04 per image (1,290 tokens)

**Limitations:**
- Default resolution: 1024x1024
- REST API does NOT support aspect ratio (use SDK for 16:9, etc.)
- Maximum 3 input images per request

**For aspect ratio control**, use the official SDK:

```bash
npm install @google/generative-ai
```

```javascript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });

const result = await model.generateContent({
  contents: [{
    role: "user",
    parts: [{ text: "A panoramic landscape" }]
  }],
  generationConfig: {
    responseModalities: ["Image"],
    imageConfig: {
      aspectRatio: "16:9"  // ✅ Works in SDK
    }
  }
});
```

---

## Best Practices

### 1. Be Specific

```
❌ "A logo"
✅ "A minimalist tech company logo, blue gradient, geometric shapes, modern sans-serif font"
```

### 2. Include Style Details

- Color palette
- Typography style
- Lighting/mood
- Composition
- Technical details (portrait/landscape, resolution)

### 3. Iterate

- Generate base image
- Refine with specific changes
- Adjust colors, contrast, details

---

## Security Checklist

- ✅ `.env` file is gitignored
- ✅ `generated-images/` directory is gitignored
- ✅ API key never committed to version control
- ✅ Only share images, not credentials

---

## Troubleshooting

### Error: "Invalid API key"

```bash
# Check .env file
cat .env

# Verify environment variable loaded
echo $GEMINI_API_KEY
```

### Error: "Unknown name aspect_ratio"

You're using REST API syntax. Aspect ratio only works with SDK.

### Image not generated

Check response for errors:

```bash
cat /tmp/gemini_response.json | python3 -m json.tool
```

---

## Additional Resources

- **API Documentation:** `/Users/mattysquarzoni/Documents/OFS/docs/api/gemini-image-gen-api-docs.md`
- **Gemini API Docs:** https://ai.google.dev/gemini-api/docs/image-generation
- **Get API Key:** https://aistudio.google.com/apikey

---

**Last Updated:** October 14, 2025
