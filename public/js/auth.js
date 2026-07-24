function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function setSession(user, token) {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
}

function clearSession() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/auth.html';
    return false;
  }
  return true;
}

function updateNavAuth() {
  const authLink = document.getElementById('auth-link');
  if (!authLink) return;

  if (isLoggedIn()) {
    const user = getUser();
    authLink.textContent = 'Logout';
    authLink.href = '#';
    authLink.onclick = (e) => {
      e.preventDefault();
      clearSession();
      window.location.href = '/';
    };
  } else {
    authLink.textContent = 'Login';
    authLink.href = '/auth.html';
    authLink.onclick = null;
  }
}
