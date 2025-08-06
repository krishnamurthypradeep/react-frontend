
import {useState,useEffect,useCallback} from "react";
import Product from "./product.jsx";
import { useAuth } from "../AuthContext.jsx";

const ProductsList = () => {
    // Object Destructuring
    const { token } = useAuth();
    const [products,setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [show,setShow] = useState(false)
   const [filterBy,setFilterBy] = useState("")
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
          const response =  await fetch(`http://localhost:9090/api/products`,{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
            if(!response.ok) {
                throw new Error('Product not found')
            }
           const data = await response.json()
            setProducts(data)
            setLoading(false)
        }catch(err) {
            setError(err.message)
        }finally {
            setLoading(false)
        }
    },[])
    useEffect(() => {
        fetchProducts()
    },[fetchProducts])


    const showOrHide = () => {
        setShow(!show)
    }
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(filterBy.toLowerCase())
    })


    return (
        <>
        <div className="mb-3">
            <input
                type="text"
                className="form-control w-50"
                placeholder="Filter by name" value={filterBy} onChange={(e)=>{setFilterBy(e.target.value)}}/>
        </div>
            {loading && <div>Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {!loading && !error && (
        <div className="table-responsive rounded-4 shadow p-4 bg-white">
            <table className="table table-bordered align-middle text-start">
                <thead className="table-light">
                <tr>
                    <th scope="col">
                        <button onClick={showOrHide}>{show? 'Hide Image':'Show Image'}</button>
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Price ($)</th>
                    <th scope="col">Description</th>
                    <th scope="col">Available</th>
                    <th scope="col">Rating</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map(p => (
                    <Product key={p.id} p={p}  show={show} />
                ))}
                </tbody>
            </table>
        </div>
                )}
        </>
    )
}
export default ProductsList

// useState
// useEffect
// useCallback
// useMemo
// useReducer

// Components Can be created in 2 ways
// class Components  (statefull)
// functional components (stateless)

// React Components
// Single Focus

// Innovations in React

// JSX
// Virtual DOM
// State (Mutable) and Props (Immutable)
// Props are used as HTML Attributes

