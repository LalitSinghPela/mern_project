import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";

function App(){
  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/admin/orders" element={<OrderList/>}/>
        <Route path="/admin/products" element={<ProductList/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;