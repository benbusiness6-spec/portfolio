# Ben Lewis Studios — Portfolio Site

## Quick Start (Local Development)

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Adding Your Images & Videos

1. Drop files into `public/assets/`
2. Open `src/App.jsx`
3. Find the config arrays at the top (HERO_ITEMS, WORK_ITEMS, UGC_ITEMS, EDITORIAL_ITEMS)
4. Update any item's `src` from `null` to the file path:

```js
// Before (shows gradient placeholder)
{ id: 1, label: "Cinematic Reel", color: "#1a1225", type: "video", src: null },

// After (shows your video)
{ id: 1, label: "Cinematic Reel", color: "#1a1225", type: "video", src: "/assets/cinematic-reel-1.mp4" },

// Or for an image
{ id: 2, label: "Editorial Beauty", color: "#1f1a2d", type: "image", src: "/assets/editorial-1.jpg" },
```

**Supported formats:** .jpg .jpeg .png .webp .mp4 .webm  
**Videos** autoplay muted and loop.  
**Tip:** Keep videos under 10MB. Images at 1080px wide max.

---

## Updating Links

In `src/App.jsx`, update these three lines at the top:

```js
const CALENDLY_URL = "https://calendly.com/your-link";
const LINKEDIN_URL = "https://linkedin.com/in/your-profile";
const EMAIL = "your@email.com";
```

---

## Deploy to Vercel (Free)

### Step 1: Push to GitHub
1. Go to github.com → Sign in → Click "New repository"
2. Name it `bls-portfolio`, keep it Public or Private, click "Create"
3. On the next page, click "uploading an existing file"
4. Drag and drop ALL files from this project folder
5. Click "Commit changes"

### Step 2: Deploy on Vercel
1. Go to vercel.com → Sign up with GitHub
2. Click "Add New Project"
3. Find `bls-portfolio` in the list → Click "Import"
4. Framework Preset should auto-detect "Vite" — leave defaults
5. Click "Deploy"
6. Wait ~60 seconds → Your site is live at a `.vercel.app` URL

### Step 3: Connect Your Domain
1. In Vercel dashboard → Your project → Settings → Domains
2. Type `benlewisltd.com` → Click "Add"
3. Vercel shows you DNS records to add
4. Go to your domain registrar (GoDaddy, Namecheap, etc.)
5. Find DNS settings → Add the records Vercel gave you
6. Wait 5-30 minutes for propagation
7. Done — benlewisltd.com is live

---

## Making Changes After Deployment

1. Edit files locally or on GitHub
2. Push/commit changes
3. Vercel auto-deploys within seconds

To add new portfolio pieces: drop file in `public/assets/`, update the config in `App.jsx`, commit & push.

---

## Project Structure

```
bls-deploy/
├── public/
│   ├── assets/          ← Your images & videos go here
│   └── favicon.svg
├── src/
│   ├── App.jsx          ← Main site (edit config at top)
│   └── main.jsx         ← Entry point (don't edit)
├── index.html
├── package.json
└── vite.config.js
```
