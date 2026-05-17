import axios from "axios";
import {useEffect,useState} from "react";

export default function ProductList(){

    // const navigate = useNavigate();
    const [products,setProducts]=useState([]);
    const [showProductForm, setShowProductForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [message, setMessage] = useState("");
    
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: "",
        thumbnail: "",
        images: [],
        category: "",
        description: "",
        countInStock: ""
    });

    useEffect(()=>{
        fetchProducts();
    },[]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://ecommerce-ur3e.onrender.com/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Convert a File to base64 string
    const fileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handleThumbnailChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const base64 = await fileToBase64(file);
            setFormData(prev => ({ ...prev, thumbnail: base64 }));
        } catch (err) {
            console.error('Thumbnail conversion error', err);
        }
    };

    const handleImagesChange = async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        try {
            const promises = files.map(f => fileToBase64(f));
            const base64List = await Promise.all(promises);
            setFormData(prev => ({ ...prev, images: base64List }));
        } catch (err) {
            console.error('Images conversion error', err);
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product._id);
        setFormData({
            name: product.name,
            price: product.price,
            image: product.image || "",
            category: product.category,
            description: product.description || "",
            countInStock: product.countInStock
        });
        setShowProductForm(true);
    };

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        
        try {
            await axios.delete(
                `https://ecommerce-ur3e.onrender.com/api/products/${productId}`,
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleToggleFeatured = async (product) => {
        try {
            const updatedData = {
                ...product,
                featured: !product.featured
            };
            
            await axios.put(
                `https://ecommerce-ur3e.onrender.com/api/products/${product._id}`,
                updatedData,
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            // Validate that required fields are filled
            if (!formData.name || !formData.price || !formData.category || !formData.countInStock) {
                alert("Please fill in all required fields");
                setLoading(false);
                return;
            }

            // Convert price and countInStock to numbers
            const productData = {
                ...formData,
                price: Number(formData.price),
                countInStock: Number(formData.countInStock)
            };

            if (editingProduct) {
                // Update product
                const response = await axios.put(
                    `https://ecommerce-ur3e.onrender.com/api/products/${editingProduct}`,
                    productData,
                    {
                        headers: {
                            authorization: localStorage.getItem("token")
                        }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    setFormData({
                        name: "",
                        price: "",
                        image: "",
                        category: "",
                        description: "",
                        countInStock: ""
                    });
                    setEditingProduct(null);
                    setShowProductForm(false);
                    fetchProducts();
                    setMessage("Product updated successfully!");
                }
            } else {
                // Add new product
                const response = await axios.post(
                    "https://ecommerce-ur3e.onrender.com/api/products",
                    productData,
                    {
                        headers: {
                            authorization: localStorage.getItem("token")
                        }
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    setFormData({
                        name: "",
                        price: "",
                        image: "",
                        category: "",
                        description: "",
                        countInStock: ""
                    });
                    setShowProductForm(false);
                    fetchProducts();
                    setMessage("Product added successfully!");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Error: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return(
        <div style={styles.container}>

            {/* <h1>Product List</h1>
            <button onClick={() => navigate('/admin')} style={styles.backButton}>Back to Admin Dashboard</button>

            {message && (
                <div style={{...styles.message, color: message.includes("Error") ? "red" : "green"}}>
                    {message}
                </div>
            )} */}

            <div style={styles.section}>
                <h2>Products</h2>
                <button 
                    onClick={() => {
                        setEditingProduct(null);
                        setFormData({
                            name: "",
                            price: "",
                            image: "",
                            category: "",
                            description: "",
                            countInStock: ""
                        });
                        setShowProductForm(!showProductForm);
                    }}
                    style={styles.button}
                >
                    {showProductForm ? "Cancel" : "+ Add New Product"}
                </button>

                {products.length > 0 ? (
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Thumb</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Featured</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>
                                        <img src={product.thumbnail || product.image || (product.images && product.images[0])} alt={product.name} style={{width: 80, height: 60, objectFit: 'cover', borderRadius: 4}} />
                                    </td>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>₹{product.price}</td>
                                    <td>{product.countInStock}</td>
                                    <td>
                                        <span style={{
                                            color: product.featured ? "green" : "red",
                                            fontWeight: "bold"
                                        }}>
                                            {product.featured ? "✓ Yes" : "✗ No"}
                                        </span>
                                    </td>
                                    <td>{product.description?.substring(0, 30)}...</td>
                                    <td style={styles.actionCell}>
                                        <button 
                                            onClick={() => handleEditProduct(product)}
                                            style={{...styles.actionBtn, backgroundColor: "#007bff"}}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleToggleFeatured(product)}
                                            style={{...styles.actionBtn, backgroundColor: product.featured ? "#ffc107" : "#28a745"}}
                                        >
                                            {product.featured ? "Unfeature" : "Feature"}
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteProduct(product._id)}
                                            style={{...styles.actionBtn, backgroundColor: "#dc3545"}}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products found</p>
                )}

                {showProductForm && (
                    <form onSubmit={handleAddProduct} style={styles.form}>
                        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                        
                        <div style={styles.formGroup}>
                            <label>Product Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter product name"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Price (₹) *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder="Enter price"
                                step="0.01"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Category *</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="Enter category"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Stock Count *</label>
                            <input
                                type="number"
                                name="countInStock"
                                value={formData.countInStock}
                                onChange={handleInputChange}
                                placeholder="Enter stock count"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.formGroup}>
                            <label>Thumbnail Image (recommended)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleThumbnailChange}
                                style={styles.input}
                            />
                            {formData.thumbnail && (
                                <img src={formData.thumbnail} alt="thumbnail preview" style={{width: 120, height: 80, objectFit: 'cover', marginTop: 8, borderRadius: 4}} />
                            )}
                        </div>

                        <div style={styles.formGroup}>
                            <label>Additional Photos (you can select multiple)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImagesChange}
                                style={styles.input}
                            />
                            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8}}>
                                {formData.images && formData.images.map((img, idx) => (
                                    <img key={idx} src={img} alt={`preview-${idx}`} style={{width: 100, height: 80, objectFit: 'cover', borderRadius: 4}} />
                                ))}
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                rows="4"
                                style={{...styles.input, resize: "vertical"}}
                            />
                        </div>

                        {message && (
                            <div style={{...styles.message, color: message.includes("Error") ? "red" : "green"}}>
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            style={{...styles.submitButton, opacity: loading ? 0.6 : 1}}
                        >
                            {loading ? (editingProduct ? "Updating..." : "Adding...") : (editingProduct ? "Update Product" : "Add Product")}
                        </button>
                    </form>
                )}
            </div>

        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto"
    },
    backButton: {
        backgroundColor: "#6c757d",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginBottom: "20px"
    },
    section: {
        marginBottom: "30px",
        borderBottom: "1px solid #ddd",
        paddingBottom: "20px"
    },
    button: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        marginBottom: "15px"
    },
    form: {
        backgroundColor: "#f9f9f9",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        maxWidth: "500px"
    },
    formGroup: {
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column"
    },
    input: {
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
        marginTop: "5px"
    },
    submitButton: {
        backgroundColor: "#28a745",
        color: "white",
        padding: "12px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        width: "100%",
        transition: "background-color 0.3s"
    },
    message: {
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        textAlign: "center",
        fontWeight: "bold"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px"
    },
    actionCell: {
        display: "flex",
        gap: "8px",
        justifyContent: "center"
    },
    actionBtn: {
        padding: "6px 12px",
        border: "none",
        borderRadius: "4px",
        color: "white",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "bold",
        transition: "opacity 0.3s"
    }
};

// Add global table styles
if (!document.getElementById('productTableStyles')) {
    const style = document.createElement('style');
    style.id = 'productTableStyles';
    style.textContent = `
        table tr {
            border-bottom: 1px solid #ddd;
        }
        table th, table td {
            padding: 12px;
            text-align: left;
        }
        table th {
            background-color: #007bff;
            color: white;
            font-weight: bold;
        }
        table tbody tr:hover {
            background-color: #f5f5f5;
        }
        table th:last-child,
        table td:last-child {
            text-align: center;
        }
    `;
    document.head.appendChild(style);
}