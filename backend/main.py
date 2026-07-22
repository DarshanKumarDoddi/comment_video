from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from routers import videos, auth, comments

app = FastAPI(title="CommentVideo API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(videos.router, prefix="/api/videos", tags=["videos"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(comments.router, prefix="/api", tags=["comments"])

app.mount("/", StaticFiles(directory="../frontend", html=True), name="frontend")


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
