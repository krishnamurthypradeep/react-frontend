import ProductsList from "./components/productsList.jsx";
import ProductDetails from "./components/productDetails.jsx";
import ProductEdit from "./components/productEdit.jsx";
import LoginPage from "./LoginPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Public Route */}
            <Route path="/" element={<PrivateRoute><ProductsList /> </PrivateRoute>} />

            {/* Protected: Only authenticated users */}
            <Route
                path="/products/:id"
                element={
                    <PrivateRoute>
                        <ProductDetails />
                    </PrivateRoute>
                }
            />

            {/* RBAC Protected: Only users with 'admin' role */}
            <Route
                path="/products/:id/edit"
                element={
                    <PrivateRoute roles={['admin']}>
                        <ProductEdit />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
export default App;
