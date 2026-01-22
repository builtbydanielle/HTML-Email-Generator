# HTML Email Generator

A professional HTML email generator for creating clean, branded email campaigns with consistent formatting and tone.

![Built with Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

## Features

- **Automated Content Generation**: Generate professional email copy automatically
- **Branded Templates**: Built-in responsive email template with dark mode support
- **Safe HTML**: Automatic sanitization to prevent XSS and ensure email client compatibility
- **Responsive Design**: Mobile-friendly emails that look great on all devices
- **Brand Voice Control**: Specify phrases to use or avoid for consistent messaging
- **Easy Export**: Copy HTML or download as a file
- **Live Preview**: See your email as you build it

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **A Gemini API Key** - [Get one free here](https://aistudio.google.com/app/apikey)

## Installation

### Step 1: Download the Project

Download and extract this project to your computer.

### Step 2: Install Dependencies

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and navigate to the project folder:

```bash
cd path/to/ai-emailgen
```

Install the required packages:

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variable management

### Step 3: Set Up Your API Key

Create a file named `.env` in the project root:

```bash
GEMINI_API_KEY=your-api-key-here
```

Replace `your-api-key-here` with your actual Gemini API key.

## Usage

### Start the Server

```bash
npm start
```

The server will start at `http://localhost:4000`

### Access the Generator

Open your web browser and go to:

```
http://localhost:4000
```

### Generate an Email

1. Fill in the email details:
   - **Subject**: Your email subject line
   - **Audience**: Who you're writing to (e.g., "current clients", "partners")
   - **Tone**: The voice you want (e.g., "friendly, professional")
   - **Goal**: What you want to accomplish
   - **Key Points**: The main information (one point per line)
   - **Company Name**: Your organization name
   - **Logo URL**: Link to your logo image
   - **Sender**: Who the email is from

2. Optional settings:
   - **Phrases to Use**: Specific terms or phrases you want included
   - **Phrases to Avoid**: Terms to exclude from the copy
   - **CTA**: Call-to-action button/link
   - **Custom Template**: Use your own HTML template

3. Click **Generate Email**

4. Review the preview and copy or download the HTML

## Template Customization

The generator uses a responsive email template optimized for:
- Desktop and mobile devices
- Light and dark mode
- All major email clients (Gmail, Outlook, Apple Mail, etc.)

### Using Your Own Template

You can provide a custom HTML template. Include `{{BODY_HTML}}` where you want the AI-generated content to appear:

```html
<!DOCTYPE html>
<html>
<body>
  <div style="max-width: 600px; margin: 0 auto;">
    {{BODY_HTML}}
  </div>
</body>
</html>
```

## Email Content Guidelines

For best results:

- **Be specific with dates**: Include exact dates and times for events
- **Keep it concise**: 150-220 words is ideal
- **Use clear language**: Avoid jargon unless it's industry-standard
- **Include one CTA**: One clear call-to-action per email
- **Specify your audience**: The more context you provide, the better the output

## API Reference

### POST /api/generate

Generate an email.

**Request Body:**
```json
{
  "subject": "Important Update",
  "audience": "current clients",
  "goal": "inform about changes",
  "tone": "friendly, professional",
  "keyPoints": [
    "System update on January 25, 2026 at 10:00 PM EST",
    "New features launching February 1, 2026"
  ],
  "brand": {
    "company": "Your Company",
    "logoUrl": "https://example.com/logo.png"
  },
  "sender": "The Team",
  "cta": {
    "label": "Learn More",
    "url": "https://example.com/info"
  },
  "extra": "Keep paragraphs short",
  "brandVoice": {
    "use": "streamlined, efficient",
    "avoid": "revolutionary, game-changing"
  },
  "baseTemplateHtml": null
}
```

**Response:**
```json
{
  "ok": true,
  "subject": "Important Update",
  "html": "<full HTML email>",
  "rawBodyFragment": "<generated content>",
  "sanitized": "<sanitized content>"
}
```

## Security Features

- **HTML Sanitization**: Strips potentially dangerous tags and attributes
- **XSS Prevention**: Blocks script injection attempts
- **Link Validation**: Ensures all links use HTTPS
- **Content Length Limits**: Prevents excessive content generation
- **Allowed Tags Only**: Restricts to safe HTML elements (`<p>`, `<ul>`, `<li>`, `<strong>`, `<em>`, `<a>`)

## Troubleshooting

### Server won't start
- Make sure Node.js is installed: `node --version`
- Check that port 4000 is available
- Verify your `.env` file exists with a valid API key

### Generation fails
- Check your Gemini API key is valid
- Ensure you have internet connectivity
- Review the server console for error messages

### Preview doesn't update
- Try clicking "Generate Email" again
- Check your browser console for errors
- Make sure the server is still running

## Technical Details

**Stack:**
- Node.js with Express
- Gemini 2.5 Flash-Lite model
- Vanilla JavaScript (no framework dependencies)

**Email Template:**
- 600px responsive width
- Table-based layout for compatibility
- Inline CSS for reliable rendering
- Dark mode support using `prefers-color-scheme`

## License

This project is provided as-is for email generation purposes.

## Support

For issues or questions, check the console logs for detailed error messages.
# HTML-Email-Generator
# HTML-Email-Generator
