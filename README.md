# OneEleven – Webhook Sorting API (ASP.NET Core)

## Overview

This repository contains a small ASP.NET Core Web API that exposes a single public endpoint to validate an application task. It accepts a string and returns its characters sorted alphabetically.

- Language/Runtime: .NET 9 (ASP.NET Core)
- Project: `Backend/Backend`
- Primary endpoint: `POST /webhook`

Useful code entry points:

- Startup pipeline: [Program.cs](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Program.cs)
- Webhook logic: [WebhookController.cs](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Controllers/WebhookController.cs)
- Project file: [Backend.csproj](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Backend.csproj)

## Quick Start (TL;DR)

Backend

```bash
cd Backend/Backend
dotnet run
# API listens on http://localhost:5282
```

Frontend

```bash
cd Frontend/validator
npm install
npm run dev
# Open http://localhost:3000
```

## Requirements

- .NET SDK 9.x
- Windows, macOS, or Linux

Check your SDK:

```bash
dotnet --version
```

## Getting Started

1) Navigate to the project:

```bash
cd Backend/Backend
```

2) Run the API:

```bash
dotnet run
```

By default (see launch settings), it listens on:

- HTTP: `http://localhost:5282`

> If HTTPS is enabled in your environment, the app may also advertise an HTTPS port. For the validator and simple local tests, HTTP is sufficient.

## API Reference

### POST `/webhook`

- Purpose: Accept an input string and return its characters sorted (lowercased).
- Content types accepted:
  - `application/json` with a `data` field
  - `application/x-www-form-urlencoded` with a `data` field

Request (JSON):

```json
{
  "data": "example"
}
```

Response (200 OK):

```json
{
  "word": ["a","e","e","l","m","p","x"]
}
```

Possible errors:

- 400 Bad Request when `data` is missing or not a string

Request (Form-encoded):

```
data=example
```

Response (200 OK):

```json
{
  "word": ["a","e","e","l","m","p","x"]
}
```

### POST `/webhook/echo`

- Purpose: Lightweight health check
- Response:

```json
{ "ok": true }
```

## Testing Locally

With the app running on `http://localhost:5282`:

### PowerShell (Windows)

JSON:

```powershell
$json = @{ data = 'example' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri http://localhost:5282/webhook -ContentType 'application/json' -Body $json
```

Form:

```powershell
Invoke-RestMethod -Method Post -Uri http://localhost:5282/webhook -ContentType 'application/x-www-form-urlencoded' -Body 'data=example'
```

### Bash (curl)

JSON:

```bash
curl -s -X POST http://localhost:5282/webhook \
  -H "Content-Type: application/json" \
  -d '{"data":"example"}'
```

Form:

```bash
curl -s -X POST http://localhost:5282/webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d 'data=example'
```

## External Validator

When deployed with a public URL, you can validate your endpoint using the provided function:

```
https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=YOUR_PUBLIC_WEBHOOK_URL&email=YOUR_EMAIL
```

Example:

```
https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=https://your-host.tld/webhook&email=you@example.com
```

## Frontend Bonus (Next.js)

Although the main task is the API, a tiny frontend makes review painless and helps your submission stand out. A simple Next.js page is enough:

### Goals
- One page with Email and URL inputs and a Test button
- On click, call the validator URL shown above
- Render the raw response JSON on the page

### Minimal Page Example (App Router)

```tsx
// app/page.tsx
"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [out, setOut] = useState<string>("Idle");
  const onTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setOut("Running...");
    try {
      const u = new URL("https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task");
      u.searchParams.set("url", url);
      u.searchParams.set("email", email);
      const res = await fetch(u.toString());
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setOut(JSON.stringify(json, null, 2));
      } catch {
        setOut(text);
      }
    } catch (err: any) {
      setOut(String(err));
    }
  };
  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", fontFamily: "system-ui, Arial, sans-serif" }}>
      <h1>Validate API</h1>
      <form onSubmit={onTest}>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} required />
        <label>API URL</label>
        <input value={url} onChange={e => setUrl(e.target.value)} required placeholder="https://your-host.tld/webhook" />
        <button type="submit">Test</button>
      </form>
      <h2>Response</h2>
      <pre>{out}</pre>
    </main>
  );
}
```

### Deploy
- API: Render (free) or any host that exposes a public URL
  - Set `ASPNETCORE_URLS=http://0.0.0.0:$PORT` if your platform provides a `PORT` env var
  - Start command: `dotnet Backend.dll`
- Frontend: Vercel (free)
  - One page as shown above
  - Include both public URLs in your submission email

## Behavior Details

- Input normalization: the service lowercases before sorting to keep output predictable.
- Sorting: ordinal ascending.
- Accepted content types: JSON and form to make testing easier across clients.

## Project Structure

```
OneEleven/
└─ Backend/
   └─ Backend/
      ├─ Controllers/
      │  ├─ WebhookController.cs
      │  └─ WeatherForecastController.cs
      ├─ Properties/
      │  └─ launchSettings.json
      ├─ Program.cs
      ├─ Backend.csproj
      └─ wwwroot/ (optional static content if enabled)
 └─ Frontend/
    └─ validator/
       ├─ app/
       │  ├─ layout.tsx
       │  ├─ page.tsx
       │  └─ globals.css
       ├─ components/
       │  ├─ TestForm.tsx
       │  └─ ResultDisplay.tsx
       ├─ package.json
       ├─ next.config.js
       ├─ tailwind.config.js
       ├─ postcss.config.js
       └─ tsconfig.json
```

Key files:

- [Program.cs](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Program.cs): app pipeline and endpoints mapping
- [WebhookController.cs](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Controllers/WebhookController.cs): request parsing and sorting
- [launchSettings.json](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Properties/launchSettings.json): local ports and profiles
- Frontend app entry: [Frontend/validator/app/page.tsx](file:///c:/Users/shawn/Downloads/OneEleven/Frontend/validator/app/page.tsx)

## Deployment

You can deploy this API to any platform that supports .NET:

### Azure App Service

```bash
az webapp up -n your-app-name -g your-resource-group --runtime "DOTNET|9.0" --os-type Windows
```

Point the validator at:

```
https://your-app-name.azurewebsites.net/webhook
```

### Docker

A production-ready Dockerfile is included at [Backend/Backend/Dockerfile](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Dockerfile).

Build and run:

```bash
cd Backend/Backend
docker build -t webhook-sorter .
docker run -p 8080:8080 webhook-sorter
```

Your service will be available at `http://localhost:8080/webhook`.

### Render / Railway / Fly.io

- Create a new web service and point it at `Backend/Backend`
- Build command: `dotnet publish -c Release`
- Start command: `dotnet Backend.dll`
- Expose the HTTP port the platform expects (often set via environment variable). If your platform sets `PORT`, also set `ASPNETCORE_URLS=http://0.0.0.0:$PORT` so Kestrel binds correctly.

### Frontend (Next.js) – Local

```
cd Frontend/validator
npm install
npm run dev
```

Open http://localhost:3000 and press Run. You can set defaults via environment vars:

- NEXT_PUBLIC_DEFAULT_URL (e.g., your public https://.../webhook)
- NEXT_PUBLIC_DEFAULT_EMAIL

### Frontend (Vercel) – Deploy

- Import the Frontend/validator folder into Vercel
- Enable build command `npm run build` and output `.next`
- Set environment variables for defaults as needed

## Troubleshooting

- 400 Bad Request with JSON in PowerShell: make sure the body is valid JSON. Prefer the `$json = @{...} | ConvertTo-Json` pattern or use `curl`.
- 415 Unsupported Media Type: set `Content-Type` to `application/json` or `application/x-www-form-urlencoded`.
- Port conflicts: adjust `applicationUrl` in [launchSettings.json](file:///c:/Users/shawn/Downloads/OneEleven/Backend/Backend/Properties/launchSettings.json).

### Additional Troubleshooting

- ENOSPC “no space left on device” during `npm install`:
  - Clear `%LOCALAPPDATA%\Temp`
  - `npm cache clean --force`
  - Remove old `node_modules`
  - Or use pnpm for a shared store:
    - `corepack enable && corepack prepare pnpm@8 --activate`
    - `pnpm install`
- Node 22 quirks: If a dev dep breaks on Node 22, use Node 20 LTS locally/CI.

## Git Push Guide

From repo root:

```powershell
# .gitignore for .NET + Next.js
@"
**/bin/
**/obj/
**/.vs/
node_modules/
.next/
dist/
.env
.env.*
!.env.example
.env.local
.DS_Store
Thumbs.db
"@ | Out-File -FilePath .gitignore -Encoding utf8

git init
git branch -M main

# API bootstrap
git add .gitignore Backend/Backend/Backend.csproj Backend/Backend/Program.cs Backend/Backend/Properties/launchSettings.json
git commit -m "chore(api): bootstrap ASP.NET Core app"

# Webhook endpoints
git add Backend/Backend/Controllers/WebhookController.cs
git commit -m "feat(api): add /webhook and /webhook/echo endpoints"

# README + Frontend
git add README.md Frontend/validator
git commit -m "docs: README; chore(frontend): Next.js validator app"

git remote add origin https://github.com/ShawnTheCreator/oneevelen.git
git push -u origin main
```

## Notes

- The project targets `.NET 9` and uses `Microsoft.NET.Sdk.Web`.
- No database or external dependencies are required.
- Keep the endpoint publicly accessible for the external validator.

---

If you want a one‑click deployment (containerized or PaaS), provide your preferred platform and I can add ready-to-use configuration.
