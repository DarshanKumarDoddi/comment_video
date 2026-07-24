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


def get_username(user_id: str) -> str:
    supabase = get_supabase()
    result = (
        supabase.table("users")
        .select("username")
        .eq("id", user_id)
        .single()
        .execute()
    )
    if result.data and result.data.get("username"):
        return result.data["username"]
    return "User"


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

    created = result.data[0]
    created["author_name"] = get_username(user["id"])
    return CommentResponse(**created)


@router.get("/{video_id}/comments", response_model=list[CommentResponse])
def get_comments(video_id: str):
    supabase = get_supabase()
    result = (
        supabase.table("comments")
        .select("*")
        .eq("video_id", video_id)
        .order("created_at", desc=True)
        .execute()
    )

    comments = []
    for c in result.data:
        if c.get("author_id"):
            c["author_name"] = get_username(c["author_id"])
        else:
            c["author_name"] = "User"
        comments.append(CommentResponse(**c))

    return comments


@router.post("/{comment_id}/like")
def like_comment(comment_id: str):
    supabase = get_supabase()

    current = (
        supabase.table("comments")
        .select("likes_count")
        .eq("id", comment_id)
        .single()
        .execute()
    )

    if not current.data:
        raise HTTPException(status_code=404, detail="Comment not found")

    new_count = (current.data.get("likes_count") or 0) + 1
    supabase.table("comments").update({"likes_count": new_count}).eq(
        "id", comment_id
    ).execute()

    return {"likes_count": new_count}
