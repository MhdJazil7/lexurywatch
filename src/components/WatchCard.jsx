import { useRef } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './WatchCard.css';

const WatchCard = ({ id, name, brand, price, image, isNew = false }) => {
    const { addToCart } = useCart();
    const cardRef = useRef(null);

    // 3-D tilt on mouse move
    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        // Move the shimmer highlight
        card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = '';
    };

    return (
        <div
            className="watch-card glass-card tilt-card reveal"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Shimmer overlay */}
            <div className="card-shimmer" aria-hidden="true" />

            <div className="watch-image-container">
                {isNew && <span className="badge-new">New Arrival</span>}
                <button className="btn-wishlist" aria-label="Add to wishlist">
                    <Heart size={20} />
                </button>
                <div className="image-placeholder">
                    {image ? (
                        <img src={image} alt={name} className="watch-img" />
                    ) : (
                        <div className="mock-watch" />
                    )}
                </div>
            </div>

            <div className="watch-details">
                <span className="watch-brand">{brand}</span>
                <h3 className="watch-name">{name}</h3>
                <p className="watch-price">{price}</p>

                <button
                    className="btn btn-primary btn-full-width magnetic-btn"
                    onClick={() => addToCart({ id, name, brand, price, image })}
                >
                    <ShoppingBag size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default WatchCard;
