import axios from "axios";
import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import "./Home.css";

export default function Product(){

    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const [selectedCategory,setSelectedCategory]=useState(null);
    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [customerWhatsapp, setCustomerWhatsapp] = useState("");

    const categories = ["pant", "shirt", "tshirt", "shoes"];
    const SELLER_WHATSAPP = "918218236799"; // Replace with your WhatsApp number (country code + number)

    useEffect(()=>{
        let url = "https://ecommerce-ur3e.onrender.com/api/products";
        if (selectedCategory) {
            url += `?category=${selectedCategory}`;
        }
        
        axios.get(url)
        .then(res=>{
            setProducts(res.data);
            setLoading(false);
        })
        .catch(err=>{
            console.error("Error fetching products:",err);
            setLoading(false);
        });
    },[selectedCategory]);

    const handleOrderClick = (product) => {
        setSelectedProduct(product);
        setShowOrderForm(true);
    };

    const handleSendWhatsapp = async () => {
        if (!customerName.trim() || !customerWhatsapp.trim()) {
            alert("Please fill in all fields");
            return;
        }

        try {
            // Create order in database
            await axios.post("https://ecommerce-ur3e.onrender.com/api/orders", {
                products: [selectedProduct],
                totalPrice: selectedProduct.price,
                customerName: customerName,
                customerWhatsapp: customerWhatsapp
            });

            // Send WhatsApp message
            const message = `Hi, I want to order:\n\nProduct: ${selectedProduct.name}\nPrice: ₹${selectedProduct.price}\nDescription: ${selectedProduct.description}\n\nMy Details:\nName: ${customerName}\nWhatsApp: ${customerWhatsapp}`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${SELLER_WHATSAPP}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, "_blank");
            
            alert("Order placed successfully!");
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order. Please try again.");
            return;
        }
        
        // Reset form
        setShowOrderForm(false);
        setCustomerName("");
        setCustomerWhatsapp("");
        setSelectedProduct(null);
    };

    return(
        <div className="home-container">
            <section className="all-products">
                <h2>All Products</h2>
                
                <div className="filter-section">
                    <h3>Filter by Category</h3>
                    <div className="filter-buttons">
                        <button 
                            className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(null)}
                        >
                            All Products
                        </button>
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                
                {loading ? (
                    <p className="loading">Loading products...</p>
                ) : products.length === 0 ? (
                    <p className="no-products">No products available.</p>
                ) : (
                    <div className="products-grid">
                        {products.map(p=>(
                            <div key={p._id} className="product-card">
                                <div className="product-image">
                                    { (p.thumbnail || p.image || (p.images && p.images[0])) ? (
                                        <img src={p.thumbnail || p.image || p.images[0]} alt={p.name} />
                                    ) : (
                                        <div className="placeholder-image">No Image</div>
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3>{p.name}</h3>
                                    <p className="product-description">{p.description?.substring(0, 50)}...</p>
                                    <p className="product-price">₹{p.price}</p>
                                    <div className="product-buttons">
                                        <Link to={`/product/${p._id}`} className="view-btn">
                                            View Details
                                        </Link>
                                        <button 
                                            className="order-btn"
                                            onClick={() => handleOrderClick(p)}
                                        >
                                            Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {showOrderForm && (
                <div className="modal-overlay" onClick={() => setShowOrderForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Order via WhatsApp</h2>
                        <p className="modal-product">Product: <strong>{selectedProduct?.name}</strong></p>
                        <p className="modal-price">Price: <strong>₹{selectedProduct?.price}</strong></p>
                        
                        <div className="form-group">
                            <label htmlFor="name">Your Name:</label>
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Enter your full name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="whatsapp">WhatsApp Number:</label>
                            <input 
                                type="tel"
                                id="whatsapp"
                                placeholder="Enter your WhatsApp number (with country code)"
                                value={customerWhatsapp}
                                onChange={(e) => setCustomerWhatsapp(e.target.value)}
                            />
                        </div>

                        <div className="modal-buttons">
                            <button className="btn-send" onClick={handleSendWhatsapp}>
                                Send Order
                            </button>
                            <button className="btn-close" onClick={() => setShowOrderForm(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}