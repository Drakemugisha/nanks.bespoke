import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Men from "./pages/men";
import Women from "./pages/women";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import Accessories from "./pages/accessories";
import Custom from "./pages/custom";
import ProtectedRoute from "./components/protectedroute";

function Logout() {
  localStorage.clear()
  return <Navigate to="/" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/men" exact element={<Men />} />
        <Route path="/women" exact element={<Women />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route
          path="/custom"
          element={
            <ProtectedRoute>
              <Custom />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;