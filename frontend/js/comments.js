function buildCommentTree(comments) {
  const map = {};
  const roots = [];

  comments.forEach(c => {
    map[c.id] = { ...c, replies: [] };
  });

  comments.forEach(c => {
    if (c.parent_comment_id && map[c.parent_comment_id]) {
      map[c.parent_comment_id].replies.push(map[c.id]);
    } else {
      roots.push(map[c.id]);
    }
  });

  return roots;
}

function renderCommentTree(comments, depth = 0) {
  return comments.map(c => {
    const indent = depth > 0 ? 'comment-item reply' : 'comment-item';
    const marginLeft = depth > 0 ? `style="margin-left: ${Math.min(depth * 24, 120)}px; border-left: 2px solid var(--border); padding-left: 16px;"` : '';
    const initial = (c.author_name || 'U')[0].toUpperCase();
    const timeAgo = getTimeAgo(c.created_at);

    let timestampHtml = '';
    if (c.timestamp_seconds != null) {
      const m = Math.floor(c.timestamp_seconds / 60);
      const s = Math.floor(c.timestamp_seconds % 60);
      timestampHtml = `<span class="comment-timestamp" onclick="seekTo(${c.timestamp_seconds})">${m}:${s.toString().padStart(2, '0')}</span>`;
    }

    let contentHtml = '';
    if (c.video_url) {
      contentHtml = `
        <div class="comment-video">
          <video controls preload="metadata" src="${escapeHtml(c.video_url)}"></video>
        </div>
      `;
      if (c.text_content) {
        contentHtml += `<div class="comment-body">${escapeHtml(c.text_content)}</div>`;
      }
    } else if (c.text_content) {
      contentHtml = `<div class="comment-body">${escapeHtml(c.text_content)}</div>`;
    }

    const repliesHtml = c.replies && c.replies.length > 0
      ? `<div class="comment-replies">${renderCommentTree(c.replies, depth + 1)}</div>`
      : '';

    return `
      <div class="${indent}" ${marginLeft} data-comment-id="${c.id}">
        <div class="comment-header">
          <div class="comment-avatar">${initial}</div>
          <span class="comment-author">${escapeHtml(c.author_name || 'User')}</span>
          <span class="comment-time">${timeAgo}</span>
          ${timestampHtml}
        </div>
        ${contentHtml}
        <div class="comment-actions">
          <button onclick="likeComment('${c.id}', this)">👍 <span>${c.likes_count || 0}</span></button>
          <button onclick="showReplyForm('${c.id}')">Reply</button>
        </div>
        <div class="reply-form-container" id="reply-form-${c.id}" style="display:none;">
          <div class="reply-composer">
            <textarea id="reply-text-${c.id}" rows="2" placeholder="Write a reply..."></textarea>
            <div class="reply-video-upload" style="margin-top: 6px;">
              <label class="btn btn-secondary btn-sm" style="cursor: pointer;">
                📹 Attach Video
                <input type="file" accept="video/*" style="display:none;" onchange="handleReplyVideo(this, '${c.id}')">
              </label>
              <span id="reply-video-status-${c.id}" style="font-size: 12px; color: var(--text-secondary); margin-left: 8px;"></span>
            </div>
            <div class="reply-actions">
              <button class="btn btn-primary btn-sm" onclick="postReply('${c.id}')">Reply</button>
              <button class="btn btn-secondary btn-sm" onclick="hideReplyForm('${c.id}')">Cancel</button>
            </div>
          </div>
        </div>
        ${repliesHtml}
      </div>
    `;
  }).join('');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getTimeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function showReplyForm(commentId) {
  const form = document.getElementById(`reply-form-${commentId}`);
  if (form) {
    form.style.display = 'block';
    const textarea = document.getElementById(`reply-text-${commentId}`);
    if (textarea) textarea.focus();
  }
}

function hideReplyForm(commentId) {
  const form = document.getElementById(`reply-form-${commentId}`);
  if (form) form.style.display = 'none';
}

const pendingReplyVideos = {};

function handleReplyVideo(input, commentId) {
  const file = input.files[0];
  if (!file) return;

  if (!file.type.startsWith('video/')) {
    showToast('Please select a video file', 'error');
    return;
  }

  if (file.size > 50 * 1024 * 1024) {
    showToast('Video too large (max 50MB)', 'error');
    return;
  }

  const status = document.getElementById(`reply-video-status-${commentId}`);
  if (status) status.textContent = file.name;

  pendingReplyVideos[commentId] = file;
}

async function postReply(parentId) {
  const textarea = document.getElementById(`reply-text-${parentId}`);
  const text = textarea.value.trim();
  const videoFile = pendingReplyVideos[parentId];

  if (!text && !videoFile) {
    showToast('Reply cannot be empty', 'error');
    return;
  }

  let videoUrl = null;
  if (videoFile) {
    const status = document.getElementById(`reply-video-status-${parentId}`);
    if (status) status.textContent = 'Uploading...';

    try {
      const formData = new FormData();
      formData.append('file', videoFile);
      const uploadData = await apiUpload('/upload/video-comment', formData);
      videoUrl = uploadData.url;
    } catch (err) {
      showToast('Video upload failed: ' + err.message, 'error');
      if (status) status.textContent = 'Upload failed';
      return;
    }
  }

  try {
    await apiPost('/comments', {
      video_id: currentVideoId,
      text_content: text || null,
      video_url: videoUrl,
      parent_comment_id: parentId,
    });
    textarea.value = '';
    delete pendingReplyVideos[parentId];
    hideReplyForm(parentId);
    showToast('Reply posted!');
    await loadComments();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function likeComment(commentId, btn) {
  try {
    const data = await apiPost(`/comments/${commentId}/like`);
    const span = btn.querySelector('span');
    if (span) span.textContent = data.likes_count;
    btn.disabled = true;
    btn.style.opacity = '0.5';
  } catch (err) {
    showToast(err.message, 'error');
  }
}
