# Project Rules

## 1. Approved Libraries / Frameworks

| Category | Approved | Reason |
|---|---|---|
| Backend | FastAPI | Chosen per project decision |
| Frontend | Plain HTML + Tailwind CSS | Simple, no build tooling |
| DB + Auth | Supabase (Postgres) | Managed, free tier |
| Video storage | Cloudinary | Free tier, video compression |
| Video playback | YouTube IFrame API | Free, no hosting |
| HTTP client | `httpx` (Python) | Async, for backend external calls |
| Env management | `python-dotenv` | Standard .env loading |

## 2. Banned Libraries / Tools

| Banned | Reason |
|---|---|
| React / Next.js / Vue | Project uses plain HTML, no SPA framework |
| SQLAlchemy | Supabase client handles DB queries directly |
| Django | FastAPI chosen for async + lighter footprint |
| Firebase | Supabase is the chosen BaaS |
| AWS S3 | Cloudinary handles video storage |
| Webpack / Vite / Parcel | No build step for frontend |

## 3. Error Handling Conventions

- **Backend**: All endpoints return structured JSON errors:
  ```json
  { "error": { "code": "NOT_FOUND", "message": "Video not found" } }
  ```
- Use FastAPI's `HTTPException` with appropriate status codes
- Log errors with Python `logging` module (not print statements)
- Never expose internal stack traces to the frontend
- **Frontend**: Display user-friendly toast/banner messages, log details to console

## 4. Coding Conventions

- Python: Follow PEP 8, use type hints on all function signatures
- JavaScript: Use ES6+ (`const`/`let`, arrow functions, async/await)
- Naming: `snake_case` for Python, `camelCase` for JavaScript
- File naming: `kebab-case` for HTML/CSS, `snake_case` for Python
- All API responses follow consistent JSON structure
- Use meaningful variable/function names — no single-letter names except loop counters

## 5. AI Assistant Boundaries

| Allowed Autonomously | Needs Explicit Approval |
|---|---|
| Fix bugs / typos | Schema changes (DB migrations) |
| Add/update UI components | Adding new dependencies |
| Write new API endpoints (non-destructive) | Deleting files |
| Update documentation | Modifying auth logic |
| Refactor existing code | Changing .env / config |
| Add error handling | Modifying Cloudinary/Supabase setup |
