# Project Requirement Document (PRD)

## 1. Problem Statement

When watching a video, users often want to react to a specific moment. Text comments are the only option, but text is **subjective** — every reader interprets words through their own mood and context. There's no way to convey genuine emotion (tone, facial expression, body language) in a comment.

## 2. Solution Summary

Build a video platform where the **comment section supports both text and video comments**, anchored to specific timestamps. Users can record or upload a short video clip as a comment, carrying real emotion that text cannot. This project does **not** host main video content — real YouTube videos are embedded. The innovation is in the comment layer.

## 3. Target Users

| Persona | Description |
|---|---|
| Admin (Project Owner) | Uploads YouTube videos to the platform for commenting |
| Testing Team | Internal team testing the product before client demo |
| Clients | End clients evaluating the product |

> Note: This is currently an internal/closed-group product, not public-facing.

## 4. Core Features

### Must-Have (MVP)

| Feature | Description |
|---|---|
| Video embedding | Embed real YouTube videos via IFrame API (added by admin via URL) |
| Text comments | Users can post text comments on videos |
| Video comments | Users can record/upload short video clips as comments |
| Timestamp anchoring | Comments can be pinned to a specific moment in the video |
| Threaded replies | Comments support nested replies (tree structure, not flat) |
| Basic auth | Sign up / log in (required to comment) |
| Home page | Grid of available videos |
| Watch page | Embedded player + comment section |
| Channel page | Simple profile grouping videos |
| Search | Search across added videos |

### Nice-to-Have (Post-MVP)

| Feature | Description |
|---|---|
| Like/dislike on comments | Users can react to comments |
| Collapse/expand threads | Long threads can be collapsed |
| Comment sorting | By timestamp, recency, or popularity |
| Timestamp markers on scrubber | Visual markers on the video progress bar |
| Responsive design | Mobile-friendly layout |
| Pagination | For comment lists |

## 5. Success Criteria

- Admin can add a YouTube video to the platform
- User can sign up, log in, and post a text comment
- User can record/upload a video comment and it plays inline in the comment thread
- User can anchor a comment to a timestamp and click it to seek the video
- Comments form a threaded tree visually indented under parent comments
- All data persists in the database (not local/mock)

## 6. Non-Goals (Explicitly Out of Scope)

- Hosting, uploading, transcoding, or streaming main video content (YouTube handles this)
- Live streaming / live chat
- Monetization (ads, memberships, Super Chat)
- Recommendation algorithm / personalized feed
- Native mobile apps
- Content moderation tooling beyond basic reporting
- Full social features (follows, notifications, feeds)
