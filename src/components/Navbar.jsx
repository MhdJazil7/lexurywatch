import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Watch, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar flex-around ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="3" />
            <circle cx="50" cy="50" r="40" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 22 65 V 35 L 40 52 L 58 35 V 65 M 68 35 V 60 C 68 72 52 72 52 65" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="47" y="78" width="5" height="5" fill="#D4AF37" transform="rotate(45 49.5 80.5)" />
          </svg>
          <span style={{ fontSize: '1.4rem', letterSpacing: '2px', fontWeight: 'bold' }}>MJ. WATCHES</span>
        </Link>

        {/* Desktop Menu */}
        <div className="nav-links desktop-only">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/collection" className={location.pathname === '/collection' ? 'active' : ''}>Collection</Link>
          <Link to="/resell" className={location.pathname === '/resell' ? 'active' : ''}>Consign</Link>
          <Link to="/heritage" className={location.pathname === '/heritage' ? 'active' : ''}>Heritage</Link>
        </div>

        <div className="nav-actions desktop-only">
          <button
            className="btn btn-primary btn-icon"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            <span>Cart ({cartCount})</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle mobile-only"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/collection" className={location.pathname === '/collection' ? 'active' : ''}>Collection</Link>
          <Link to="/resell" className={location.pathname === '/resell' ? 'active' : ''}>Consign</Link>
          <Link to="/heritage" className={location.pathname === '/heritage' ? 'active' : ''}>Heritage</Link>
          <button
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
            onClick={() => {
              setIsMenuOpen(false);
              setIsCartOpen(true);
            }}
          >
            <ShoppingBag size={20} />
            <span>Cart ({cartCount})</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
