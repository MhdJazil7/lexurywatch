import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import Resell from './pages/Resell';
import Heritage from './pages/Heritage';
import { CartProvider } from './context/CartContext';
import { useState } from 'react';
import CartSidebar from './components/CartSidebar';
import './App.css';

// ── Floating abstract particles ───────────────────────────────
const PARTICLE_COUNT = 22;
function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.45,
  }));
}

// ── Scroll-to-top on route change ─────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// ── Global cursor glow blob (follows mouse / touch everywhere) ─
const CursorGlow = () => {
  const blobRef = useRef(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let raf;
    const move = (x, y) => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        blob.style.left = `${x}px`;
        blob.style.top = `${y}px`;
        blob.style.opacity = '1';
      });
    };

    const onMouse = (e) => move(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches.length) move(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => { blob.style.opacity = '0'; };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('touchend', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('touchend', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div className="global-cursor-glow" ref={blobRef} aria-hidden="true" />;
};

// ── Scroll-reveal: watches .reveal elements and adds .visible ──
const ScrollReveal = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let io;
    // Wait for DOM to render after a route change
    const timer = setTimeout(() => {
      const targets = Array.from(document.querySelectorAll('.reveal:not(.visible)'));
      if (!targets.length) return;

      // Force immediate reveal for items already in viewport at load
      const windowHeight = window.innerHeight;
      targets.forEach(t => {
        const rect = t.getBoundingClientRect();
        if (rect.top < windowHeight - 50) {
          t.classList.add('visible');
        }
      });

      // Filter to only unobserved targets to let IO handle the rest
      const remainingTargets = Array.from(document.querySelectorAll('.reveal:not(.visible)'));
      if (!remainingTargets.length) return;

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      remainingTargets.forEach((el) => io.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (io) io.disconnect();
    };
  }, [pathname]);

  return null;
};

function App() {
  const [particles] = useState(generateParticles);

  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ScrollReveal />

        {/* Global Particles */}
        <div className="global-particles-container" aria-hidden="true">
          {particles.map(p => (
            <span
              key={p.id}
              className="global-particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        <CursorGlow />
        <div className="app-wrapper">
          <Navbar />
          <CartSidebar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/resell" element={<Resell />} />
              <Route path="/heritage" element={<Heritage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
