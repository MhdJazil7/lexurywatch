import { useState } from 'react';
import { Upload, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import './Resell.css';

const Resell = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        serialNumber: '',
        condition: 'excellent',
    });
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVerify = (e) => {
        e.preventDefault();
        if (!formData.serialNumber) return;

        setIsVerifying(true);
        // Simulate API call to brand's serial verification
        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
            setTimeout(() => setStep(2), 1500);
        }, 2000);
    };

    return (
        <div className="resell-page animate-fade-in">
            <div className="resell-container">

                <div className="resell-info animate-slide-up stagger-1 reveal reveal-left">
                    <h1 className="page-title">Consign Your Timepiece</h1>
                    <p className="page-subtitle">
                        MJ. Watches offers a secure, transparent platform to sell your luxury watch to our verified global network of collectors.
                    </p>

                    <div className="benefits-list">
                        <div className="benefit-item">
                            <div className="benefit-icon"><Shield size={24} /></div>
                            <div>
                                <h3>Brand-Level Verification</h3>
                                <p>Instant serial number checking against global databases.</p>
                            </div>
                        </div>
                        <div className="benefit-item">
                            <div className="benefit-icon"><CheckCircle size={24} /></div>
                            <div>
                                <h3>Global Reach</h3>
                                <p>Connect instantly with thousands of authenticated buyers.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="resell-form-wrapper glass-card animate-slide-up stagger-2 reveal reveal-right">

                    {/* Progress Indicator */}
                    <div className="form-progress">
                        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1. Verify</div>
                        <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
                        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2. Details</div>
                        <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
                        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3. Submit</div>
                    </div>

                    {/* Step 1: Verification */}
                    {step === 1 && (
                        <form className="resell-form animate-fade-in" onSubmit={handleVerify}>
                            <h2>Verify Authenticity</h2>
                            <p className="form-desc">Enter the brand and serial number of your timepiece.</p>

                            <div className="form-group">
                                <label>Brand</label>
                                <select
                                    name="brand"
                                    className="form-input"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="" disabled>Select Brand</option>
                                    <option value="rolex">Rolex</option>
                                    <option value="patek">Patek Philippe</option>
                                    <option value="ap">Audemars Piguet</option>
                                    <option value="rm">Richard Mille</option>
                                    <option value="other">Other Luxury Brand</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Serial Number</label>
                                <input
                                    type="text"
                                    name="serialNumber"
                                    className="form-input"
                                    placeholder="e.g. 8H39K822"
                                    value={formData.serialNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary btn-full-width ${isVerifying ? 'loading' : ''} ${isVerified ? 'success' : ''}`}
                                disabled={isVerifying || isVerified}
                            >
                                {isVerifying ? 'Verifying with Database...' :
                                    isVerified ? 'Verified Authentic!' : 'Verify Serial Number'}
                                {!isVerifying && !isVerified && <ArrowRight size={18} />}
                                {isVerified && <CheckCircle size={18} />}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Uploads & Details */}
                    {step === 2 && (
                        <form className="resell-form animate-fade-in" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                            <h2>Condition & Photos</h2>

                            <div className="form-group">
                                <label>Model Reference</label>
                                <input type="text" className="form-input" placeholder="e.g. 116500LN" required />
                            </div>

                            <div className="form-group">
                                <label>Condition</label>
                                <select className="form-input">
                                    <option value="unworn">Unworn (New/Stickered)</option>
                                    <option value="excellent">Excellent (Barely worn)</option>
                                    <option value="good">Good (Normal wear)</option>
                                    <option value="fair">Fair (Visible scratches)</option>
                                </select>
                            </div>

                            <div className="upload-area">
                                <input type="file" id="photos" multiple accept="image/*" className="hidden-input" />
                                <label htmlFor="photos" className="upload-label">
                                    <Upload size={32} className="upload-icon" />
                                    <span>Click to upload photos (Front, Back, Box, Papers)</span>
                                    <span className="upload-sub">Max 5MB per image</span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                                <button type="submit" className="btn btn-primary">Review Details</button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="success-state animate-fade-in">
                            <div className="success-icon-wrapper">
                                <CheckCircle size={64} className="text-gold" />
                            </div>
                            <h2>Submission Received</h2>
                            <p>Your listing is currently under review by our experts. We will contact you within 24 hours with a valuation.</p>
                            <button className="btn btn-outline" onClick={() => setStep(1)}>Submit Another</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Resell;
