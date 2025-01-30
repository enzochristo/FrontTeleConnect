import { RouteObject, Navigate } from "react-router-dom";
import { Home } from "../homepage/homepage";
import { Login } from "../login/login";
import { Register } from "../register/register";
import { AboutUs } from "../aboutus/aboutus";
import { Products } from "../products/products";
import { Subscription } from "../subscription/subscription";
import { Dashboard } from "../dashboard/dashboard";

// Função para verificar se o usuário está autenticado
const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("userToken"); // Supondo que o token esteja salvo no localStorage
};

// Componente de Rota Protegida
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/home" replace />,
    },
    {
        path: "/home",
        element: <Home />,
        id: "home",
    },
    {
        path: "/login",
        element: <Login />,
        id: "login",
    },
    {
        path: "/register",
        element: <Register />,
        id: "register",
    },
    {
        path: "/teleconnect",
        element: <AboutUs />,
        id: "aboutus",
    },
    {
        path: "/products",
        element: <Products />,
        id: "products",
    },
    {
        path: "/subscription",
        element: <ProtectedRoute element={<Subscription />} />, // Protegendo a rota
        id: "subscription",
    },
    {
        path: "/dashboard",
        element: <Dashboard />, // Protegendo a rota
        id: "dashboard",
    }
];

export default routes;
