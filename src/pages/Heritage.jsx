import { Award, Globe, History } from 'lucide-react';
import './Heritage.css';

const Heritage = () => {
    return (
        <div className="heritage-page animate-fade-in">
            {/* Hero Section */}
            <section className="heritage-hero">
                <div className="heritage-hero-content">
                    <h1 className="page-title animate-slide-up stagger-1">Our Heritage</h1>
                    <p className="page-subtitle animate-slide-up stagger-2">
                        A legacy built on trust, passion, and an uncompromising commitment to horological excellence.
                    </p>
                </div>
                {/* Cursor-reactive glow behind hero text */}
                <div className="heritage-hero-glow" aria-hidden="true" />
            </section>

            {/* Story Section */}
            <section className="story-section">
                <div className="story-grid">
                    <div className="story-image logo-showcase-container reveal reveal-left">
                        <div className="heritage-brand-logo">
                            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="3" />
                                <circle cx="50" cy="50" r="40" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" strokeDasharray="2 2" />
                                <path d="M 22 65 V 35 L 40 52 L 58 35 V 65 M 68 35 V 60 C 68 72 52 72 52 65" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                                <rect x="47" y="78" width="5" height="5" fill="#D4AF37" transform="rotate(45 49.5 80.5)" />
                            </svg>
                            <span className="heritage-logo-text">MJ. WATCHES</span>
                        </div>
                    </div>
                    <div className="story-text reveal reveal-right">
                        <h2>The MJ. Story</h2>
                        <p>
                            Founded with a singular vision to bring the world's most prestigious timepieces to connoisseurs in India, MJ. Watches has established itself as the premier destination for authenticated luxury.
                        </p>
                        <p>
                            Our journey began with a profound appreciation for mechanical artistry. What started as a private collection has evolved into a trusted institution, connecting passionate collectors across continents.
                        </p>
                        <p>
                            Today, we stand at the intersection of tradition and modern commerce, offering an unparalleled selection of watches backed by our rigorous authentication protocols and deep market expertise.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section">
                <div className="values-container">
                    <h2 className="text-center mb-4 reveal">Our Core Pillars</h2>
                    <div className="values-grid reveal-stagger">
                        <div className="value-card glass-card hover-lift reveal">
                            <History size={40} className="value-icon" />
                            <h3>Preserving History</h3>
                            <p>We believe every watch tells a story. Our mission is to preserve these narratives and pass them on to the next generation of custodians.</p>
                        </div>
                        <div className="value-card glass-card hover-lift reveal">
                            <Award size={40} className="value-icon" />
                            <h3>Unyielding Authenticity</h3>
                            <p>Trust is our currency. Our state-of-the-art authentication center employs master watchmakers who verify every component of every timepiece.</p>
                        </div>
                        <div className="value-card glass-card hover-lift reveal">
                            <Globe size={40} className="value-icon" />
                            <h3>Global Network</h3>
                            <p>We bridge the gap between international sellers and Indian collectors, facilitating discreet, secure acquisitions of the rarest pieces.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Heritage;
