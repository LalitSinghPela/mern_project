import axios from "axios";
import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";

export default function ProductDetail(){

    const {id} = useParams();
    const [product,setProduct]=useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [mainImage, setMainImage] = useState("");

    useEffect(()=>{
        if (!id) {
            setError("No product ID provided");
            setLoading(false);
            return;
        }

        axios.get(
          `https://ecommerce-ur3e.onrender.com//api/products/${id}`
        ).then(res=>{
            setProduct(res.data);
                        // choose a main image
                        const imgs = res.data.images || [];
                        const main = res.data.thumbnail || res.data.image || imgs[0] || "";
                        setMainImage(main);
            setLoading(false);
        }).catch(err=>{
            console.error("Error fetching product:", err.response?.data || err.message);
            setError(err.response?.data?.message || "Failed to load product. Please try again.");
            setLoading(false);
        });
    },[id]);

    if (loading) {
        return <div><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div><h1>Error</h1><p>{error}</p></div>;
    }

    if (!product) {
        return <div><h1>Product not found</h1></div>;
    }

    return(
        <>
        
        <div>
            <h1>Product Details</h1>
            <h1>{product.name}</h1>
            <div style={{display: 'flex', gap: 20, alignItems: 'flex-start'}}>
                <div style={{minWidth: 320}}>
                    {mainImage ? (
                        <img src={mainImage} alt={product.name} style={{width: '100%', maxWidth: 500, objectFit: 'cover', borderRadius: 8}} />
                    ) : (
                        <div style={{width: 500, height: 320, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>No Image</div>
                    )}

                    <div style={{display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap'}}>
                        {[...(product.images || [])].concat(product.thumbnail || product.image ? [product.thumbnail || product.image] : []).filter(Boolean).map((img, idx) => (
                            <img key={idx} src={img} alt={`thumb-${idx}`} onClick={() => setMainImage(img)} style={{width: 100, height: 80, objectFit: 'cover', cursor: 'pointer', borderRadius: 6, border: mainImage === img ? '2px solid #007bff' : '1px solid #ddd'}} />
                        ))}
                    </div>
                </div>

                <div style={{flex: 1}}>
                    <p>{product.description}</p>
                    <h3>₹{product.price}</h3>
                    <p>Stock: {product.countInStock}</p>
                </div>
            </div>

        </div>
        </>
    );
}
