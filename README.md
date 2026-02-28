# One Eleven – Webhook Sorting API and Validator

## Overview
- Backend: ASP.NET Core API with a POST /webhook endpoint
- Frontend: Next.js (App Router) validator UI with Live, Direct, and Offline modes
- Live backend: https://oneevelen.onrender.com/webhook
- Frontend URL: https://oneleven.vercel.app/

## Assignment Compliance
- Receives JSON: { "data": "example" }
- Converts to characters, sorts alphabetically, returns:
  - { "word": ["a","e","e","l","m","p","x"] }
- Case-normalized to lowercase before sorting for predictable output

## Backend
- Stack: .NET 9, ASP.NET Core
- Endpoint: POST /webhook
- Content types: application/json, application/x-www-form-urlencoded
- Behavior:
  - Validates presence of data string
  - Normalizes to lowercase
  - Sorts characters ascending
  - Returns { word: [...] }
- Local Run:

```bash
dotnet build
dotnet run
# POST to http://localhost:5282/webhook
curl -X POST http://localhost:5282/webhook -H "Content-Type: application/json" -d "{\"data\":\"example\"}"
```

## Frontend
- Stack: Next.js 14 App Router, TypeScript
- Pages:
  - app/layout.tsx: global layout, metadata, header
  - app/page.tsx: validator page
  - components/TestForm.tsx: modes + inputs
  - components/ResultDisplay.tsx: results + animation
- Modes:
  - Live: Uses Supabase validator
  - Direct: POSTs JSON directly to your webhook URL
  - Offline: Local sort, returns identical shape { word: [...] }
- Run locally:

```bash
npm install
npm run dev
# http://localhost:3000
```

## Validator (Supabase)
- Use this function to verify your webhook:

```
https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=YOUR_PUBLIC_WEBHOOK_URL&email=YOUR_EMAIL
```

Example:

```
https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=https://oneevelen.onrender.com/webhook&email=you@example.com
```

## Metadata and Social
- Favicon: public/icon.ico
- Open Graph/Twitter configured in app/layout.tsx for rich previews
- Canonical: https://oneleven.vercel.app/

## Notes
- Author: Shawn
- Environments:
  - NEXT_PUBLIC_DEFAULT_URL defaults to the live webhook
  - NEXT_PUBLIC_DEFAULT_EMAIL defaults to you@example.com

## License
- Proprietary – for application submission purposes
