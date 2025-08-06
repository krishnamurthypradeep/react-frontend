import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext.jsx"; // <--- add this

const ProductEdit = () => {
    const { id } = useParams();
    const { register, setValue, handleSubmit, formState: { errors } } = useForm();
    const [product, setProduct] = useState(null);
    const { token } = useAuth(); // <--- get token from context

    useEffect(() => {
        fetch(`http://localhost:9090/api/products/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // <--- add this if product API is protected
            }
        })
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id, token]);

    useEffect(() => {
        if (product) {
            setValue('name', product.name);
            setValue('price', product.price);
        }
    }, [product, setValue]);

    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9090/api/products/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}` // <--- use your token
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const result = await response.json();
            alert("Product updated! " + JSON.stringify(result));
        } catch (err) {
            alert("Error: " + err.message);
        }
    }

    if (!product) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <form noValidate className="border-b py-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="name">Product Name</label>
                    <input id="name" {...register('name', { required: 'You must enter a product name' })}
                           className={`form-control ${errors.name ? "is-invalid" : ""}`} />
                </div>
                <div className="mb-3">
                    <label htmlFor="price">Price</label>
                    <input id="price" {...register('price', { required: 'You must enter a price' })}
                           className={`form-control ${errors.price ? "is-invalid" : ""}`} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default ProductEdit;
