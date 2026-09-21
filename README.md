# LARP 🎭

> **Turn normal thoughts into unnecessarily elaborate personalities.**  
> *Say something normal. We’ll make it unbearable.*

LARP is a fast, viral comedy writing engine. It takes an ordinary human statement (*"I like football"*, *"I drink coffee"*, *"I play Valorant"*) and transforms it into an absurdly elaborate, hyper-specific, performative monologue — as if the speaker is deeply immersed in an insufferably sophisticated personal philosophy.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have **Node.js 18+** installed (`node -v`).

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/larp.git
cd larp
npm install
```

### 3. Obtain a Free Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Sign in with your Google account.
3. Click **Create API Key**.
4. Copy your key.

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Open `.env.local` and add your API key:
```env
GEMINI_API_KEY=AIzaSyYourActualKeyHere
```

*(Optional: For offline automated testing without an active key, you can set `GEMINI_API_KEY=demo` to test with curated artisanal LARPs).*

### 5. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## 🌐 Deployment Instructions

### Deploying to Vercel (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your `larp` repository.
4. Under **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key
5. Click **Deploy**.

### Deploying to Netlify
1. Connect your repository to Netlify.
2. Set Build Command to `npm run build` and Publish Directory to `.next`.
3. In **Site Configuration > Environment Variables**, add `GEMINI_API_KEY`.
4. Deploy site.

### Deploying to Docker / Cloud Run
Ensure `GEMINI_API_KEY` is provided via your container runtime environment or secret manager (`-e GEMINI_API_KEY=...`).

---

## 🛠️ Architecture & Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI & Components**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **AI Engine**: Google Gemini API (`gemini-2.5-flash` with graceful fallback to `gemini-1.5-flash` / `gemini-2.0-flash`)
- **Key Protections**: Server-side route handler (`/api/larp`) strictly guards API keys from browser client bundles.

---

## ⚡ Core Features

- ⚡ **Zero-Friction Loop**: No logins, no dashboard, no database — land, type, LARP, copy, share.
- 🎯 **Hyper-Specific Lore**: Domain-appropriate tactical concepts, roasting methods, compiler internals, and horological mechanics.
- 📐 **Dynamic Output Length**: Automatically scales monologue depth based on the mundanity and length of the input.
- 📋 **Native Clipboard & Sharing**: One-tap Copy with animated feedback state and native Web Share API integration on mobile devices.
- ⌨️ **Keyboard Shortcut**: Trigger generations seamlessly with `Cmd/Ctrl + Enter`.
- 🛡️ **Graceful Error Handling**: Helpful UI banners if the API key is unconfigured or if an upstream rate limit is encountered.
