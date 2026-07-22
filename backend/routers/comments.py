from fastapi import APIRouter, HTTPException, Header
from models.comment import CommentCreate, CommentResponse
from services.supabase_client import get_supabase

router = APIRouter()


def get_user_from_token(token: str) -> dict | None:
    supabase = get_supabase()
    result = supabase.auth.get_user(token)
    if result.user is None:
        return None
    return {"id": result.user.id, "email": result.user.email}


@router.post("", response_model=CommentResponse)
def create_comment(comment: CommentCreate, authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.replace("Bearer ", "")
    user = get_user_from_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")

    supabase = get_supabase()
    result = (
        supabase.table("comments")
        .insert(
            {
                "video_id": comment.video_id,
                "author_id": user["id"],
                "text_content": comment.text_content,
                "parent_comment_id": comment.parent_comment_id,
                "timestamp_seconds": comment.timestamp_seconds,
            }
        )
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to create comment")

    return CommentResponse(**result.data[0])


@router.get("/{video_id}/comments", response_model=list[CommentResponse])
def get_comments(video_id: str):
    supabase = get_supabase()
    result = (
        supabase.table("comments")
        .select("*")
        .eq("video_id", video_id)
        .is("parent_comment_id", "null")
        .order("created_at", desc=True)
        .execute()
    )
    return [CommentResponse(**c) for c in result.data]
