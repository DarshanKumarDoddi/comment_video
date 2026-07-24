import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import videos, auth, comments

app = FastAPI(title="CommentVideo API", version="0.1.0", docs_url="/api/docs", openapi_url="/api/openapi.json", redoc_url="/api/redoc",)

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


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
