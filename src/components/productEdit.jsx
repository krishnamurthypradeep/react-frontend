import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";

const ProductEdit = () => {
    const {id} = useParams();
    const {register,setValue,handleSubmit,formState:{errors}}  =    useForm()

    const [product,setProduct]=useState(null);
    useEffect(() => {
        fetch(`http://localhost:9090/api/products/${id}`)
            .then(res=>res.json())
            .then(data=>setProduct(data))
    },[id])


    if (!product) return <div>Loading...</div>;
    setValue('name',product.name)
    setValue('price',product.price)

    const onSubmit = async (data,e)=>{
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:9090/api/products/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            const result = await response.json();
            alert("Product created! " + JSON.stringify(result));
            // Optionally reset the form here

        } catch (err) {
            alert("Error: " + err.message);
        }
    }
    return (
        <div className="container mt-5">
            <form noValidate className="border-b py-4" onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-3">
                    <label htmlFor="name">ProductName</label>
                    <input id="name" {...register('name',{
                        required:'You must enter a productName'
                    })} className={`form-control ${errors.productName ? "is-invalid":""}`} />

                </div>
                <div className="mb-3">
                    <label htmlFor="name">Price</label>
                    <input id="name" {...register('price',{
                        required:'You must enter a price'
                    })} className={`form-control ${errors.price ? "is-invalid":""}`} />

                </div>
                <button type="submit"
                        className="btn btn-primary">
                    Update
                </button>
            </form>
        </div>
    )
}

export default ProductEdit;