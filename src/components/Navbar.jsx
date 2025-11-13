import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="navbar-surface shadow-sm">
      <div className="app-container px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold text-amber-600">
            <span style={{ letterSpacing: '-0.5px' }}>SmartFinance</span>
          </Link>
          <div className="hidden md:flex space-x-3 text-sm">
            <Link to="/" className="hover:underline">
              Dashboard
            </Link>
            {/* <Link to="/insights" className="hover:underline">
              Insights
            </Link> */}
          </div>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.email}</span>
              <button
                onClick={() => logout().then(() => nav('/login'))}
                className="btn-primary"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="text-sm text-amber-600">
                Login
              </Link>
              <Link to="/register" className="ml-2 text-sm text-gray-600">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
