import axios from "axios";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import "./Home.css";

export default function Home(){

    const [products,setProducts]=useState([]);
    const [featuredProducts,setFeaturedProducts]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        // Fetch featured products
        axios.get("https://ecommerce-ur3e.onrender.com/api/products/featured/list")
        .then(res=>{
            setFeaturedProducts(res.data.slice(0, 4));
        })
        .catch(err=>{
            console.error("Error fetching featured products:",err);
        });

        // Fetch all products
        axios.get("https://ecommerce-ur3e.onrender.com/api/products")
        .then(res=>{
            setProducts(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.error("Error fetching products:",err);
            setLoading(false);
        });
    },[]);

    return(
        <div className="home-container">
            {/* Hero Banner Section */}
            <section className="hero-banner">
                <div className="hero-content">
                    <h1 className="hero-title">Your Style, Your Statement</h1>
                    <p className="hero-subtitle">Premium clothing collection for the modern wardrobe</p>
                    <Link  to="/products" className="hero-btn">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Brand Introduction Section */}
            <section className="brand-intro">
                <h2>Welcome to LS Store</h2>
                <p>Discover our exclusive collection of high-quality clothing designed for comfort and style. From casual wear to formal attire, we have everything you need to express your unique fashion sense.</p>
            </section>

            {/* Categories Section */}
            {/* <section className="categories">
                <h2>Shop by Category</h2>
                <div className="category-grid">
                    <div className="category-card">
                        <div className="category-icon">👕</div>
                        <h3>Men's Wear</h3>
                    </div>
                    <div className="category-card">
                        <div className="category-icon">🧥</div>
                        <h3>Accessories</h3>
                    </div>
                </div>
            </section> */}

            {/* Featured Products Section */}
            <section className="featured-products" id="featured-products">
                <h2>Featured Products</h2>
                {loading ? (
                    <p className="loading">Loading products...</p>
                ) : featuredProducts.length === 0 ? (
                    <p className="no-products">No featured products available yet.</p>
                ) : (
                    <div className="products-grid">
                        {featuredProducts.map(p=>(
                            <div key={p._id} className="product-card">
                                <div className="product-image">
                                    {p.image ? (
                                        <img src={p.image} alt={p.name} />
                                    ) : (
                                        <div className="placeholder-image">No Image</div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3>{p.name}</h3>
                                    <p className="product-description">{p.description?.substring(0, 50)}...</p>
                                    <p className="product-price">₹{p.price}</p>
                                    <Link to={`/product/${p._id}`} className="view-btn">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* All Products Section */}
            <section className="all-products">
                <h2>All Products</h2>
                {loading ? (
                    <p className="loading">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="no-products">No products available.</p>
                ) : (
                    <>
                        <div className="products-grid">
                            {products.slice(0, 4).map(p=>(
                                <div key={p._id} className="product-card">
                                    <div className="product-image">
                                        {p.image ? (
                                            <img src={p.image} alt={p.name} />
                                        ) : (
                                            <div className="placeholder-image">No Image</div>
                                        )}
                                    </div>
                                    <div className="product-info">
                                        <h3>{p.name}</h3>
                                        <p className="product-description">{p.description?.substring(0, 50)}...</p>
                                        <p className="product-price">₹{p.price}</p>
                                        <Link to={`/product/${p._id}`} className="view-btn">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="view-all-container">
                            <Link to="/products" className="view-all-btn">
                                View All Products
                            </Link>
                        </div>
                    </>
                )}
            </section>

            
        </div>
    );
}