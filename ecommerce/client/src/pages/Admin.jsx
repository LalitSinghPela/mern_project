import axios from "axios";
import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Admin(){

    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        totalProducts: 0,
        outOfStockProducts: 0
    });
    
    useEffect(()=>{
        // Fetch product stats
        axios.get(
          "https://ecommerce-ur3e.onrender.com/api/products/stats",
          {
            headers:{
              authorization:localStorage.getItem("token")
            }
          }
        ).then(res=>{
            setStats(prev => ({...prev, totalProducts: res.data.totalProducts, outOfStockProducts: res.data.outOfStockProducts}));
        }).catch(err=>console.error("Error fetching product stats:", err));
        
        // Fetch order stats
        axios.get(
          "https://ecommerce-ur3e.onrender.com/api/orders/stats",
          {
            headers:{
              authorization:localStorage.getItem("token")
            }
          }
        ).then(res=>{
            setStats(prev => ({...prev, totalSales: res.data.totalSales, totalOrders: res.data.totalOrders}));
        }).catch(err=>console.error("Error fetching order stats:", err));

        // Add global table styles
        if (!document.getElementById('adminTableStyles')) {
            const style = document.createElement('style');
            style.id = 'adminTableStyles';
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
    },[]);

    return(
        <div style={styles.container}>

            <h1>Admin Dashboard</h1>

            <div style={styles.statsSection}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>₹</div>
                    <div style={styles.statContent}>
                        <h3>Total Sales</h3>
                        <p style={styles.statValue}>₹{stats.totalSales.toLocaleString()}</p>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📦</div>
                    <div style={styles.statContent}>
                        <h3>Total Orders</h3>
                        <p style={styles.statValue}>{stats.totalOrders}</p>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon}>🛍️</div>
                    <div style={styles.statContent}>
                        <h3>Total Products</h3>
                        <p style={styles.statValue}>{stats.totalProducts}</p>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon}>⚠️</div>
                    <div style={styles.statContent}>
                        <h3>Out of Stock</h3>
                        <p style={styles.statValue}>{stats.outOfStockProducts}</p>
                    </div>
                </div>
            </div>

            <div style={styles.navigationSection}>
                <button onClick={() => navigate('/admin/orders')} style={styles.navButton}>
                    Manage Orders
                </button>
                <button onClick={() => navigate('/admin/products')} style={styles.navButton}>
                    Manage Products
                </button>
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
    statsSection: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
    },
    statCard: {
        backgroundColor: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.3s, box-shadow 0.3s"
    },
    statIcon: {
        fontSize: "32px",
        minWidth: "50px",
        textAlign: "center"
    },
    statContent: {
        flex: 1
    },
    statValue: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#007bff",
        margin: "5px 0 0 0"
    },
    navigationSection: {
        display: "flex",
        gap: "20px",
        marginBottom: "30px"
    },
    navButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "15px 30px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold",
        transition: "background-color 0.3s"
    }};