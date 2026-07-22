# Project Phases

## Current Phase: Phase 1

---

## Phase 1 — Base App Setup

**Goal**: Working foundation with video embedding and basic pages.

**Deliverables**:
- FastAPI backend running with health check endpoint
- Supabase project connected (DB + client initialized)
- YouTube video added by URL → stored in DB → displayed on Home page
- Home page with grid of videos
- Watch page with embedded YouTube player
- Basic auth (signup/login) via Supabase
- Light/dark mode toggle functional

**Exit Criteria**:
- [ ] Admin can add a YouTube video via URL
- [ ] Video appears on Home page
- [ ] Clicking video opens Watch page with working player
- [ ] User can sign up and log in
- [ ] Theme toggle works (light ↔ dark)

---

## Phase 2 — Text Comments with Threading

**Goal**: Full text comment system with nested replies.

**Deliverables**:
- Comment API endpoints (CRUD + reply)
- Text comment composer on Watch page
- Threaded comment rendering (indented tree)
- Reply to any comment
- Like/dislike on comments

**Exit Criteria**:
- [ ] Logged-in user can post a text comment
- [ ] Comment appears in the thread immediately
- [ ] User can reply to any comment (nested)
- [ ] Comments persist in Supabase DB
- [ ] Like count works

---

## Phase 3 — Video Comments

**Goal**: Users can upload/record video clips as comments.

**Deliverables**:
- Video upload endpoint → Cloudinary
- Video comment composer (record or upload)
- Inline video playback in comment thread
- Thumbnail/preview for video comments

**Exit Criteria**:
- [ ] User can upload a video clip as a comment
- [ ] Video comment plays inline in the thread
- [ ] Video stored in Cloudinary, URL saved in DB
- [ ] Works for both top-level and reply comments

---

## Phase 4 — Timestamp Comments

**Goal**: Comments anchored to video timestamps with seek functionality.

**Deliverables**:
- Timestamp capture (current playback time when commenting)
- Timestamp markers on video scrubber
- Click-to-seek from timestamped comment
- Sort comments by timestamp

**Exit Criteria**:
- [ ] User can optionally attach timestamp to any comment
- [ ] Timestamped comments show time marker
- [ ] Clicking marker seeks video to that second
- [ ] Comments sortable by timestamp

---

## Phase 5 — Polish & Responsiveness

**Goal**: Production-ready UI/UX.

**Deliverables**:
- Responsive design (mobile + desktop)
- Collapse/expand long threads
- Comment pagination or infinite scroll
- Loading states and error states
- Final QA pass

**Exit Criteria**:
- [ ] Works on mobile (320px+) and desktop
- [ ] Long threads can be collapsed
- [ ] No console errors, all edge cases handled
- [ ] Client demo ready
