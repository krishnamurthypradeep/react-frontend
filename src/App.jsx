import ProductsList from "./components/productsList.jsx";
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import ProductDetails from "./components/productDetails.jsx";
import ProductEdit from "./components/productEdit.jsx";


function App() {


  return (

       <Routes>
           <Route  path="/" element={<ProductsList/>} />
           <Route  path="/products/:id" element={<ProductDetails/>} />
           <Route  path="/products/:id/edit" element={<ProductEdit/>} />
       </Routes>

  )
}

export default App
