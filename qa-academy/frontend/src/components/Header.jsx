export default function Header({ page, onNavigate }) {
  return (
    <header>
      <div className="logo">QA<span>Academy</span></div>
      <nav className="nav-links">
        <a className={page === 'exam' ? 'active' : ''} onClick={() => onNavigate('exam')}>Examen</a>
        <a className={page === 'admin' ? 'active' : ''} onClick={() => onNavigate('admin')}>Admin</a>
      </nav>
    </header>
  );
}
