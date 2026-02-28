import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import WatchCard from '../components/WatchCard';
import './Collection.css';

const base = import.meta.env.BASE_URL;

const MOCK_WATCHES = [
    { id: 1, brand: 'Rolex', name: 'Cosmograph Daytona', price: '₹29,50,000', isNew: true, image: `${base}watches/rolex.png` },
    { id: 2, brand: 'Patek Philippe', name: 'Nautilus 5711/1A', price: '₹95,00,000', isNew: false, image: `${base}watches/patek.png` },
    { id: 3, brand: 'Audemars Piguet', name: 'Royal Oak 15500ST', price: '₹37,50,000', isNew: true, image: `${base}watches/ap.png` },
    { id: 4, brand: 'Richard Mille', name: 'RM 11-03 McLaren', price: '₹2,90,00,000', isNew: false, image: `${base}watches/rm.png` },
    { id: 5, brand: 'Rolex', name: 'Submariner Date', price: '₹12,00,000', isNew: false, image: `${base}watches/submariner.png` },
    { id: 6, brand: 'Vacheron Constantin', name: 'Overseas 4500V', price: '₹26,50,000', isNew: false, image: `${base}watches/vc.png` },
    { id: 7, brand: 'Omega', name: 'Speedmaster Moonwatch', price: '₹5,80,000', isNew: true, image: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800' },
    { id: 8, brand: 'A. Lange & Söhne', name: 'Lange 1', price: '₹39,80,000', isNew: false, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800' },
];

const BRANDS = ['All', 'Rolex', 'Patek Philippe', 'Audemars Piguet', 'Richard Mille', 'Vacheron Constantin', 'Omega'];

const Collection = () => {
    const [activeBrand, setActiveBrand] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWatches = MOCK_WATCHES.filter(watch => {
        const matchesBrand = activeBrand === 'All' || watch.brand === activeBrand;
        const matchesSearch = watch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            watch.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesBrand && matchesSearch;
    });

    return (
        <div className="collection-page animate-fade-in">
            {/* Page Header */}
            <div className="page-header reveal">
                <h1 className="page-title animate-slide-up stagger-1">The Collection</h1>
                <p className="page-subtitle animate-slide-up stagger-2">
                    Discover our curated selection of authenticated luxury timepieces.
                </p>
            </div>

            {/* Filters & Search */}
            <div className="filter-bar animate-slide-up stagger-3 reveal">
                <div className="search-wrapper">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search by brand or model..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="filter-actions desktop-only">
                    <div className="brand-filters">
                        {BRANDS.map(brand => (
                            <button
                                key={brand}
                                className={`filter-chip ${activeBrand === brand ? 'active' : ''}`}
                                onClick={() => setActiveBrand(brand)}
                            >
                                {brand}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="sort-wrapper">
                    <button className="btn-sort">
                        <SlidersHorizontal size={18} />
                        <span className="desktop-only text">Sort By: Featured</span>
                        <span className="mobile-only text">Sort / Filter</span>
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            {/* Mobile Brands Dropdown (simplified) */}
            <div className="mobile-brand-select mobile-only animate-slide-up stagger-3">
                <select
                    value={activeBrand}
                    onChange={(e) => setActiveBrand(e.target.value)}
                    className="brand-dropdown"
                >
                    {BRANDS.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                    ))}
                </select>
                <ChevronDown size={20} className="select-icon" />
            </div>

            {/* Watch Grid */}
            <div className="collection-grid animate-slide-up stagger-4 reveal-stagger">
                {filteredWatches.length > 0 ? (
                    filteredWatches.map(watch => (
                        <WatchCard key={watch.id} {...watch} />
                    ))
                ) : (
                    <div className="no-results">
                        <p>No timepieces found matching your criteria.</p>
                        <button className="btn btn-primary" onClick={() => {
                            setActiveBrand('All');
                            setSearchQuery('');
                        }}>Clear Filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Collection;
