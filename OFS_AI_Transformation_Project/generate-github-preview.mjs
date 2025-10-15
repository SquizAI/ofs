#!/usr/bin/env node

/**
 * Generate GitHub Social Preview Image
 * Dimensions: 1280x640px (2:1 aspect ratio)
 *
 * Usage: node generate-github-preview.mjs
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { config } from 'dotenv';

// Load environment variables
config();

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('❌ Error: GEMINI_API_KEY not found in .env file');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Detailed prompt for OFS GitHub social preview
const PROMPT = `Create a professional GitHub repository social media preview image with exact 2:1 aspect ratio (1280x640px or similar widescreen).

LAYOUT:
- Modern gradient background: Deep navy blue (#003D5C) transitioning to bright blue (#0085C7) from left to right
- Split design: Left 60% for text/metrics, Right 40% for visual

LEFT SECTION (Text & Metrics):
- Top: Bold white text "OFS AI Transformation" (large, 72pt equivalent)
- Subtitle: "AI-Enhanced Platform" in light blue (#66C4F3), 36pt
- Metrics row (3 cards with rounded corners):
  * Card 1: "1,144%" large number, "Year 1 ROI" small text
  * Card 2: "$264M" large number, "5-Year NPV" small text
  * Card 3: "10 mo" large number, "Payback" small text
- Feature badges (4 small pills):
  * "🤖 Multi-Agent AI"
  * "💡 Smart Recommendations"
  * "📊 Budget Optimization"
  * "🌱 Sustainability"

RIGHT SECTION (Visual):
- Isometric 3D illustration of modern office workspace:
  * Minimalist desk with computer monitor
  * Ergonomic office chair
  * Floating holographic UI elements (semi-transparent blue panels)
  * Chat bubbles with AI indicators
  * Small analytics graphs floating nearby
  * Subtle glow effects in blue/purple

BOTTOM BAR:
- Dark semi-transparent overlay
- Left: GitHub icon + "SquizAI/ofs"
- Right: "650 pages • 15 documents • Complete guide"

STYLE:
- Ultra-modern, professional tech aesthetic
- Clean sans-serif typography (similar to Inter or SF Pro)
- High contrast for social media thumbnail readability
- Subtle gradients and shadows for depth
- Blue color scheme with white text
- Corporate but innovative feel
- Optimized for 1280x640px social preview display`;

async function generateGitHubPreview() {
  try {
    console.log('🎨 Generating GitHub social preview image...');
    console.log('📐 Target dimensions: 1280x640px (2:1 aspect ratio)');

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image"
    });

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: PROMPT }]
      }],
      generationConfig: {
        responseModalities: ["Image"],
        imageConfig: {
          aspectRatio: "16:9"  // Closest to 2:1, generates 1344x768
        }
      }
    });

    const response = await result.response;
    const imageData = response.candidates[0].content.parts[0].inlineData.data;
    const imageBuffer = Buffer.from(imageData, 'base64');

    // Ensure output directory exists
    if (!fs.existsSync('generated-images')) {
      fs.mkdirSync('generated-images', { recursive: true });
    }

    // Save image
    const outputPath = 'generated-images/ofs-github-preview-16x9.png';
    fs.writeFileSync(outputPath, imageBuffer);

    console.log(`✅ Image generated successfully!`);
    console.log(`📁 Saved to: ${outputPath}`);
    console.log(`📊 Generated dimensions: ~1344x768 (16:9)`);
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Open the image to verify quality');
    console.log('2. Optionally resize to exactly 1280x640px using:');
    console.log('   sips -z 640 1280 generated-images/ofs-github-preview-16x9.png --out generated-images/ofs-github-preview-1280x640.png');
    console.log('3. Upload to GitHub: Repository Settings > Social preview');

  } catch (error) {
    console.error('❌ Error generating image:', error.message);
    if (error.message.includes('API key')) {
      console.error('💡 Tip: Make sure GEMINI_API_KEY is set in .env file');
    }
    process.exit(1);
  }
}

// Run the generator
generateGitHubPreview();
