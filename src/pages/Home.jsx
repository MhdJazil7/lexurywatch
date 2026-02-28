import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Clock, Award } from 'lucide-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import WatchCard from '../components/WatchCard';
import './Home.css';

const FEATURED_WATCHES = [
    { id: 1, brand: 'Rolex', name: 'Cosmograph Daytona', price: '₹29,50,000', isNew: true, image: '/watches/rolex.png' },
    { id: 2, brand: 'Patek Philippe', name: 'Nautilus 5711/1A', price: '₹95,00,000', isNew: false, image: '/watches/patek.png' },
    { id: 3, brand: 'Audemars Piguet', name: 'Royal Oak 15500ST', price: '₹37,50,000', isNew: true, image: '/watches/ap.png' },
];



const Home = () => {
    const heroRef = useRef(null);
    const glowRef = useRef(null);
    const cursorGlowRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const rafRef = useRef(null);

    // Cursor / touch tracking for the hero glow and parallax tilt
    const handlePointerMove = useCallback((e) => {
        const hero = heroRef.current;
        if (!hero) return;

        const rect = hero.getBoundingClientRect();
        // Support both mouse and touch
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const relX = clientX - rect.left;
        const relY = clientY - rect.top;
        const pctX = relX / rect.width;  // 0–1
        const pctY = relY / rect.height; // 0–1

        // Move the cursor glow to follow the pointer
        if (cursorGlowRef.current) {
            cursorGlowRef.current.style.left = `${relX}px`;
            cursorGlowRef.current.style.top = `${relY}px`;
            cursorGlowRef.current.style.opacity = '1';
        }

        // Subtle tilt effect on hero content (−6 to +6 deg)
        const tiltX = (pctY - 0.5) * -12;
        const tiltY = (pctX - 0.5) * 12;

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            setTilt({ x: tiltX, y: tiltY });
        });
    }, []);

    const handlePointerLeave = useCallback(() => {
        if (cursorGlowRef.current) {
            cursorGlowRef.current.style.opacity = '0';
        }
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            setTilt({ x: 0, y: 0 });
        });
    }, []);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        hero.addEventListener('mousemove', handlePointerMove);
        hero.addEventListener('touchmove', handlePointerMove, { passive: true });
        hero.addEventListener('mouseleave', handlePointerLeave);
        hero.addEventListener('touchend', handlePointerLeave);

        return () => {
            hero.removeEventListener('mousemove', handlePointerMove);
            hero.removeEventListener('touchmove', handlePointerMove);
            hero.removeEventListener('mouseleave', handlePointerLeave);
            hero.removeEventListener('touchend', handlePointerLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handlePointerMove, handlePointerLeave]);

    return (
        <div className="home-page animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section" ref={heroRef}>

                {/* Static radial glow (centre) */}
                <div className="hero-bg-glow" ref={glowRef} />

                {/* Cursor-following glow */}
                <div className="hero-cursor-glow" ref={cursorGlowRef} aria-hidden="true" />

                {/* Content with subtle 3-D tilt */}
                <div
                    className="hero-content"
                    style={{
                        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transition: 'transform 0.12s linear',
                    }}
                >
                    <h1 className="hero-title animate-slide-up stagger-1">
                        Timepieces of <br /> <span className="text-gold">Distinction</span>
                    </h1>
                    <p className="hero-subtitle animate-slide-up stagger-2">
                        Discover the most exclusive collection of authenticated luxury watches
                        curated for discerning collectors in India.
                    </p>
                    <div className="hero-actions animate-slide-up stagger-3">
                        <Link to="/collection" className="btn btn-primary magnetic-btn">
                            Explore Collection <ChevronRight size={18} />
                        </Link>
                        <Link to="/resell" className="btn btn-outline magnetic-btn">
                            Sell Your Watch
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="scroll-indicator" aria-hidden="true">
                    <span className="scroll-line" />
                </div>
            </section>

            {/* Featured Watches */}
            <section className="featured-section">
                <div className="section-header text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderBottom: 'none' }}>
                    <h2 className="section-title">Featured Acquisitions</h2>
                    <Link to="/collection" className="link-with-icon" style={{ justifyContent: 'center' }}>
                        View All <ChevronRight size={16} />
                    </Link>
                </div>

                <div className="watch-grid">
                    {FEATURED_WATCHES.map(watch => (
                        <WatchCard key={watch.id} {...watch} />
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="features-section">
                <h2 className="section-title text-center">The MJ. Standard</h2>
                <div className="features-grid">
                    <div className="feature-card glass-card hover-lift">
                        <ShieldCheck size={40} className="feature-icon" />
                        <h3>Guaranteed Authenticity</h3>
                        <p>Every timepiece undergoes a rigorous multi-point inspection by our master horologists before listing.</p>
                    </div>
                    <div className="feature-card glass-card hover-lift">
                        <Award size={40} className="feature-icon" />
                        <h3>Premium Valuation</h3>
                        <p>We leverage international market data to ensure the best possible value for both buyers and sellers.</p>
                    </div>
                    <div className="feature-card glass-card hover-lift">
                        <Clock size={40} className="feature-icon" />
                        <h3>White-Glove Service</h3>
                        <p>From private viewings to secure delivery, experience luxury at every step of your journey.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
