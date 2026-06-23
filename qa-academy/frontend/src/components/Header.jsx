export default function Header({ username, onLogout }) {
  return (
    <header>
      <div className="logo">QA<span>Academy</span></div>
      {username && (
        <nav className="nav-links">
          <span style={{ color: 'var(--muted)' }}>{username}</span>
          <a onClick={onLogout}>Cerrar sesión</a>
        </nav>
      )}
    </header>
  );
}
