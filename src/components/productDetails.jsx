import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import StarRating from "./starRating.jsx";
import { useAuth } from "../AuthContext.jsx";
const ProductDetails = () => {
    const { token } = useAuth();
    const {id} = useParams();
    const [product,setProduct]=useState(null);
    useEffect(() => {
        fetch(`http://localhost:9090/api/products/${id}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res=>res.json())
             .then(data=>setProduct(data))
    },[id])
    if (!product) return <div>Loading...</div>;
    return (
        <div className="card p-4">
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} width={120} className="mb-3" />
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p>
                <strong>Available:</strong>{" "}
                <span className={product.productAvailable ? "text-success fw-bold" : "text-danger fw-bold"}>
          {product.productAvailable ? "Yes" : "No"}
        </span>
            </p>
            <p>
                <strong>Rating:</strong> <StarRating rating={product.starRating} maxStars={5} />
            </p>
            <span>
            <NavLink to="/" className="btn btn-primary btn-sm">Back</NavLink>
            <NavLink to={`/products/${product.id}/edit`} className="btn btn-primary btn-sm">Edit</NavLink>
        </span>
            </div>
    )
}

export default ProductDetails