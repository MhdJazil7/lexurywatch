import { useState, useEffect } from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartSidebar.css';

const CartSidebar = () => {
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        cartTotal,
        formatPrice,
        shippingAddress,
        setShippingAddress,
        shippingCharge
    } = useCart();

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const [pincodeStatus, setPincodeStatus] = useState({ loading: false, error: '' });
    const [addressSaved, setAddressSaved] = useState(false);

    const handleSaveAddress = () => {
        if (
            shippingAddress.fullName &&
            shippingAddress.address &&
            shippingAddress.city &&
            shippingAddress.state &&
            shippingAddress.pincode
        ) {
            setAddressSaved(true);
            setTimeout(() => setAddressSaved(false), 3000);
        }
    };

    useEffect(() => {
        const fetchAddressDetails = async () => {
            // Only trigger for exactly 6 digits
            if (shippingAddress.pincode.length === 6) {
                // Check if it's all numbers
                if (!/^\d+$/.test(shippingAddress.pincode)) {
                    setPincodeStatus({ loading: false, error: 'Invalid Pincode format' });
                    return;
                }

                setPincodeStatus({ loading: true, error: '' });
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${shippingAddress.pincode}`);
                    const data = await response.json();

                    if (data[0].Status === "Success") {
                        const { District, State } = data[0].PostOffice[0];
                        setShippingAddress(prev => ({
                            ...prev,
                            city: District,
                            state: State
                        }));
                        setPincodeStatus({ loading: false, error: '' });
                    } else {
                        setPincodeStatus({ loading: false, error: 'Invalid Pincode' });
                    }
                } catch (error) {
                    console.error("Error fetching pincode details:", error);
                    setPincodeStatus({ loading: false, error: 'Network error. Try manually.' });
                }
            } else if (shippingAddress.pincode.length > 0 && shippingAddress.pincode.length < 6) {
                setPincodeStatus({ loading: false, error: '' });
            }
        };

        const timer = setTimeout(() => {
            fetchAddressDetails();
        }, 500); // Debounce for 500ms

        return () => clearTimeout(timer);
    }, [shippingAddress.pincode, setShippingAddress]);

    return (
        <>
            <div
                className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
                onClick={() => setIsCartOpen(false)}
            />
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>Your Cart</h2>
                    <button
                        className="close-btn"
                        onClick={() => setIsCartOpen(false)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#D4AF37',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            lineHeight: 1,
                            cursor: 'pointer',
                            padding: '0',
                        }}
                    >
                        &times;
                    </button>
                </div>

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <ShoppingBag size={48} />
                            <p>Your cart is empty.</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => setIsCartOpen(false)}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} />
                                            ) : (
                                                <div className="mock-watch-cart"></div>
                                            )}
                                        </div>
                                        <div className="item-details">
                                            <p className="item-brand">{item.brand}</p>
                                            <h3 className="item-name">{item.name}</h3>
                                            <p className="item-price">{item.price}</p>
                                            <div className="item-actions">
                                                <div className="quantity-controls">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="shipping-section">
                                <h3>Shipping Address (India)</h3>
                                <div className="shipping-form">
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Full Name"
                                        value={shippingAddress.fullName}
                                        onChange={handleAddressChange}
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={shippingAddress.address}
                                        onChange={handleAddressChange}
                                    />
                                    <div className="form-row">
                                        <input
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            value={shippingAddress.city}
                                            onChange={handleAddressChange}
                                        />
                                        <input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            value={shippingAddress.state}
                                            onChange={handleAddressChange}
                                        />
                                    </div>
                                    <div className="pincode-container">
                                        <input
                                            type="text"
                                            name="pincode"
                                            placeholder="Pincode"
                                            value={shippingAddress.pincode}
                                            onChange={handleAddressChange}
                                            maxLength={6}
                                        />
                                        {pincodeStatus.loading && (
                                            <div className="pincode-loader">
                                                <Loader2 size={16} className="spin" />
                                                <span>Fetching...</span>
                                            </div>
                                        )}
                                        {pincodeStatus.error && (
                                            <div className="pincode-error">
                                                <AlertCircle size={14} />
                                                <span>{pincodeStatus.error}</span>
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className={`save-address-btn ${addressSaved ? 'saved' : ''}`}
                                        onClick={handleSaveAddress}
                                        disabled={pincodeStatus.loading}
                                    >
                                        {addressSaved ? (
                                            <><CheckCircle2 size={16} /> Address Saved!</>
                                        ) : (
                                            'Save Address'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{shippingCharge > 0 ? formatPrice(shippingCharge) : 'Calculated at next step'}</span>
                        </div>
                        <div className="cart-total divider">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal + shippingCharge)}</span>
                        </div>
                        <button className="btn btn-primary btn-full-width checkout-btn">
                            Proceed to Checkout
                        </button>
                        <Link to="/collection" className="continue-shopping" onClick={() => setIsCartOpen(false)}>
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div >
        </>
    );
};

export default CartSidebar;
