import ProductsList from "./components/productsList.jsx";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import ProductDetails from "./components/productDetails.jsx";


function App() {


  return (

       <Routes>
           <Route  path="/" element={<ProductsList/>} />
           <Route  path="/products/:id" element={<ProductDetails/>} />
       </Routes>

  )
}

export default App
