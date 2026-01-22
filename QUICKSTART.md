# Quick Start Guide

## Step 1: Install Node.js

### Windows
1. Go to https://nodejs.org/
2. Download the "LTS" version (the green button)
3. Run the installer
4. Click "Next" through all the steps
5. Restart your computer

### Mac
1. Go to https://nodejs.org/
2. Download the "LTS" version (the green button)
3. Open the downloaded file
4. Follow the installation wizard
5. Restart your computer

### check Installation
Open Terminal (Mac) or Command Prompt (Windows) and type:
```bash
node --version
```

You should see something like `v18.17.0` or higher.

## step 2: Get a Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Click "Copy" to copy your key
5. Save it somewhere safe (you'll need it in Step 4)

**it's free!** Google gives you generous free usage.

## Step 3: Open the Project

1. Extract the `ai-emailgen` folder to your Desktop
2. Open Terminal (Mac) or Command Prompt (Windows)
3. Type this to navigate to the folder:

**Windows:**
```bash
cd Desktop\ai-emailgen
```

**Mac:**
```bash
cd ~/Desktop/ai-emailgen
```

## Step 4: Install Dependencies

Still in Terminal/Command Prompt, type:

```bash
npm install
```

Wait for it to finish (takes about 30 seconds).

## Step 5: Add Your API Key

1. Find the file named `.env` in the ai-emailgen folder
2. Open it with Notepad (Windows) or TextEdit (Mac)
3. Replace the text after `GEMINI_API_KEY=` with your API key from Step 2
4. Save the file

Example:
```
GEMINI_API_KEY=AIzaSyBtlPBGOZA51JGIhBOE7oAu-HkRpGxGRWo
```

## Step 6: Start the Server

In Terminal/Command Prompt (still in the ai-emailgen folder), type:

```bash
node server.js
```

You should see:
```
Server running on http://localhost:4000
GEMINI_API_KEY present: true
```

**Don't close this window!** The server needs to stay running.

## Step 7: Open the App

1. Find the file named `index.html` in the ai-emailgen folder
2. Double-click it
3. Your web browser should open
4. Start creating emails!

## How to Stop the Server

When you're done:
1. Go back to the Terminal/Command Prompt window
2. Press `Ctrl + C` (Windows) or `Command + C` (Mac)

## How to Start Again Later

1. Open Terminal/Command Prompt
2. Navigate to the folder again (see Step 3)
3. Run `node server.js` again (see Step 6)
4. Open `index.html` again (see Step 7)

## Need Help?

**"npm command not found"**
→ Node.js isn't installed correctly. Try Step 1 again.

**"Cannot find module"**
→ Dependencies aren't installed. Try Step 4 again.

**"GEMINI_API_KEY present: false"**
→ Your API key isn't set up. Check Step 5.

**Preview is blank**
→ Make sure the server is running (Step 6) and you see the success messages.

**Still stuck?**
→ Check the full README.md for detailed troubleshooting.
