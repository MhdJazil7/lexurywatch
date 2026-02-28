import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Watch } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer animate-fade-in stagger-4">
            <div className="footer-container">
                <div className="footer-brand">
                    <Link to="/" className="brand-logo mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="3" />
                            <circle cx="50" cy="50" r="40" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                            <path d="M 22 65 V 35 L 40 52 L 58 35 V 65 M 68 35 V 60 C 68 72 52 72 52 65" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="47" y="78" width="5" height="5" fill="#D4AF37" transform="rotate(45 49.5 80.5)" />
                        </svg>
                        <span>MJ. Watches</span>
                    </Link>
                    <p className="footer-desc">
                        The destination for international luxury timepieces in India. Curated, authenticated, and delivered with excellence.
                    </p>
                    <div className="social-links">
                        <a href="https://www.instagram.com/watchez.store_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                    </div>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h3>Explore</h3>
                        <ul>
                            <li><Link to="/collection">Collection</Link></li>
                            <li><Link to="/resell">Consign & Sell</Link></li>
                            <li><Link to="/heritage">Heritage</Link></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Authentication Process</a></li>
                            <li><a href="#">Shipping & Returns</a></li>
                            <li><a href="#">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="link-group">
                        <h3>Legal</h3>
                        <ul>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} MJ. Watches. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
