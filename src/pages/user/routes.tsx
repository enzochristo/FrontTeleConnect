import { RouteObject, Navigate } from "react-router-dom";
import { Home } from "../homepage/homepage"; // Importando a Home Page
import { Login } from "../login/login"; // Importando a página de Login
import { Register } from "../register/register"; // Importando a página de Registro
import { AboutUs } from "../aboutus/aboutus"; // Importando a página Sobre Nós

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Navigate to="/home" replace />, // Redireciona automaticamente para /home
    },
    {
        path: "/home",
        element: <Home />, // Página Home acessível em /home
        id: "home",
    },
    {
        path: "/login",
        element: <Login />, // Página de Login acessível em /login
        id: "login",
    },
    {
        path: "/register",
        element: <Register />, // Página de Registro acessível em /register
        id: "register",
    },
    {
        path: "/teleconnect",
        element: <AboutUs />, // Página Sobre Nós acessível em /teleconnect
        id: "aboutus",
    }
];

export default routes;
