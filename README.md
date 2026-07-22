# CommentVideo

A YouTube-style web interface that embeds real YouTube videos and adds a custom comment layer where viewers can reply with **text or video**, tied to specific **timestamps**, structured as **nested threaded conversations**.

## What This Project Is

- The video content itself is **real YouTube videos**, embedded via the YouTube Player — this project does not host or stream video.
- The custom layer built on top is the **comment system**:
  - Comments can be **text** or a short **video clip**
  - Comments can be pinned to a **specific timestamp** in the video
  - Replies nest under the comment they respond to, forming a **thread/tree** (not a flat list)

See `docs/PRD.md` for full feature and data details, and `docs/phases.md` for build phases.

## Tech Stack

| Layer | Choice |
|---|---|
| Backend | FastAPI (Python) |
| Frontend | HTML + Tailwind CSS |
| Database + Auth | Supabase (Postgres + Auth) |
| Video comment storage | Cloudinary |
| Video playback | YouTube IFrame Player API |

All of the above are free at development/demo scale.

## Getting Started (Development)

```bash
# 1. Clone the repo
git clone <repo-url>
cd comment_video

# 2. Set up Python backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 3. Set up environment variables
cp ../.env.example .env
# Fill in: SUPABASE_URL, SUPABASE_KEY, CLOUDINARY_CLOUD_NAME, etc.

# 4. Run the dev server
uvicorn main:app --reload
```

## Project Structure

```
backend/              → FastAPI Python backend
frontend/             → HTML + Tailwind CSS frontend
docs/                 → Project documentation (PRD, architecture, rules, phases, design, memory)
```

## Documentation

- `docs/PRD.md` — Requirements, features, success criteria
- `docs/architecture.md` — System flow, folder structure, tech stack
- `docs/rules.md` — Coding conventions, approved/banned libs, AI boundaries
- `docs/phases.md` — Build phases with deliverables and exit criteria
- `docs/design.md` — Color palette, typography, component styles
- `docs/memory.md` — Project state log and progress tracker

## Core Feature at a Glance

A comment is either **text** or **video**, can be anchored to a **video timestamp**, and always knows its **parent comment** (or `null` if top-level) — that one relationship is what powers threading, timestamp-linking, and future features like collapsing long threads.
