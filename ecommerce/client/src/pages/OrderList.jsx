import axios from "axios";
import {useEffect,useState} from "react";

export default function OrderList(){

    // const navigate = useNavigate();
    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        // Fetch orders
        axios.get(
          "https://ecommerce-ur3e.onrender.com//api/orders",
          {
            headers:{
              authorization:localStorage.getItem("token")
            }
          }
        ).then(res=>setOrders(res.data));
    },[]);

    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            await axios.put(
                `https://ecommerce-ur3e.onrender.com/api/orders/${orderId}/status`,
                { status },
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );
            // Refresh orders
            const res = await axios.get(
                "https://ecommerce-ur3e.onrender.com//api/orders",
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );
            setOrders(res.data);
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }
        
        try {
            await axios.delete(
                `https://ecommerce-ur3e.onrender.com/api/orders/${orderId}`,
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );
            // Refresh orders
            const res = await axios.get(
                "https://ecommerce-ur3e.onrender.com/api/orders",
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            );
            setOrders(res.data);
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };

    return(
        <div style={styles.container}>

            {/* <h1>Order List</h1>
            <button onClick={() => navigate('/admin')} style={styles.backButton}>Back to Admin Dashboard</button>

            {message && (
                <div style={{...styles.message, color: message.includes("Error") ? "red" : "green"}}>
                    {message}
                </div>
            )} */}

            <div style={styles.section}>
                <h2>Orders</h2>
                {orders.length > 0 ? (
                    orders.map(o=>(
                        <div key={o._id} style={styles.orderCard}>
                            <div style={styles.orderHeader}>
                                <p><strong>Order ID:</strong> {o._id}</p>
                                <p><strong>Status:</strong> 
                                    <span style={{
                                        color: o.status === 'completed' ? 'green' : o.status === 'in progress' ? 'orange' : 'red',
                                        fontWeight: 'bold'
                                    }}>
                                        {o.status || 'pending'}
                                    </span>
                                </p>
                            </div>
                            <p><strong>User:</strong> {o.user?.name || o.customerName}</p>
                            <p><strong>WhatsApp:</strong> {o.customerWhatsapp}</p>
                            <p><strong>Products:</strong></p>
                            <ul style={styles.productList}>
                                {o.products?.map((p, index) => (
                                    <li key={index}>
                                        {p.name} - Quantity: {p.quantity} - Price: ₹{p.price}
                                    </li>
                                ))}
                            </ul>
                            <p><strong>Total:</strong> ₹{o.totalPrice}</p>
                            <div style={styles.orderActions}>
                                <button 
                                    onClick={() => handleUpdateOrderStatus(o._id, 'in progress')}
                                    style={{...styles.actionBtn, backgroundColor: o.status === 'in progress' ? '#ffc107' : '#28a745'}}
                                    disabled={o.status === 'in progress'}
                                >
                                    Mark In Progress
                                </button>
                                <button 
                                    onClick={() => handleUpdateOrderStatus(o._id, 'completed')}
                                    style={{...styles.actionBtn, backgroundColor: o.status === 'completed' ? '#6c757d' : '#007bff'}}
                                    disabled={o.status === 'completed'}
                                >
                                    Mark Completed
                                </button>
                                <button 
                                    onClick={() => handleDeleteOrder(o._id)}
                                    style={{...styles.actionBtn, backgroundColor: '#dc3545'}}
                                >
                                    Delete Order
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found</p>
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
    orderCard: {
        backgroundColor: "#f5f5f5",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ddd"
    },
    orderHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px"
    },
    productList: {
        margin: "10px 0",
        paddingLeft: "20px"
    },
    orderActions: {
        display: "flex",
        gap: "10px",
        marginTop: "15px",
        flexWrap: "wrap"
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
    },
    message: {
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        textAlign: "center",
        fontWeight: "bold"
    }
};