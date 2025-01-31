import { RouteObject, Navigate, useLocation, Outlet } from "react-router-dom";
import { Home } from "../homepage/homepage";
import { Login } from "../login/login";
import { Register } from "../register/register";
import { AboutUs } from "../aboutus/aboutus";
import { Products } from "../products/products";
import { Subscription } from "../subscription/subscription";
import { Dashboard } from "../employee/dashboard/dashboard";
import { CreatePlan } from "../employee/dashboard/nested/createplan"; // ✅ Novo componente
import { Information } from "../user/information/information";
import { useEffect, useState } from "react";
import { ManagePlans } from "../employee/dashboard/nested/manageplans";

// 🔹 Hook para verificar a autenticação do usuário
const useAuth = () => {
    const [isPFAuthenticated, setIsPFAuthenticated] = useState<boolean | null>(null);
    const [isCLAuthenticated, setIsCLAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const responsePF = await fetch("http://localhost:8000/appraiser/auth/check/token", {
                    method: "POST",
                    credentials: "include",
                });

                const responseCL = await fetch("http://localhost:8000/manager/auth/check/token", {
                    method: "POST",
                    credentials: "include",
                });

                console.log("Resposta da API:", responsePF, responseCL);
                setIsPFAuthenticated(responsePF.ok);
                setIsCLAuthenticated(responseCL.ok);

            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                setIsPFAuthenticated(false);
                setIsCLAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    return { isPFAuthenticated, isCLAuthenticated };
};

// 🔹 Componente que redireciona automaticamente o usuário para o Dashboard caso ele seja um Colaborador
const AutoRedirect = ({ children }: { children: JSX.Element }) => {
    const { isCLAuthenticated } = useAuth();
    const location = useLocation();

    if (isCLAuthenticated === null) return null; // Aguarda a resposta da API

    // Se o usuário for CL e não estiver na rota do dashboard, redireciona para lá
    if (isCLAuthenticated && location.pathname !== "/dashboard") {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

// 🔹 Componente de Rota Protegida para Pessoas Físicas
const ProtectedRoutePF = ({ element }: { element: JSX.Element }) => {
    const { isPFAuthenticated } = useAuth();

    if (isPFAuthenticated === null) return null; // Aguarda a resposta da API
    return isPFAuthenticated ? element : <Navigate to="/login" replace />;
};

// 🔹 Componente de Rota Protegida para Colaboradores (Managers)
const ProtectedRouteCL = ({ element }: { element: JSX.Element }) => {
    const { isCLAuthenticated } = useAuth();

    if (isCLAuthenticated === null) return null; // Aguarda a resposta da API
    return isCLAuthenticated ? element : <Navigate to="/login" replace />;
};

// 🔹 Definição das Rotas
const routes: RouteObject[] = [
    {
        path: "/",
        element: <AutoRedirect><Navigate to="/home" replace /></AutoRedirect>,
    },
    {
        path: "/home",
        element: <AutoRedirect><Home /></AutoRedirect>,
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
        element: <ProtectedRoutePF element={<Subscription />} />, // Protegida para Pessoa Física
        id: "subscription",
    },
    {
        path: "/dashboard",
        element: <ProtectedRouteCL element={<Dashboard />} />, // Protegida para Colaboradores
        id: "dashboard",
        children: [
            {
                path: "create-plan", // Agora acessível via "/dashboard/create-plan"
                element: <CreatePlan />,
            },
            {
                path: "/dashboard/manage-plans",
                element: <ProtectedRouteCL element={<ManagePlans />} />,
              },
        ]
    },
    {
        path: "/profile",
        element: <ProtectedRoutePF element={<Information />} />, // Protegida para Pessoa Física
        id: "information",
    },
    {
        path: "/employee",
        element: <ProtectedRouteCL element={<Dashboard />} />, // Protegida para Colaboradores
        id: "employee",
    },
    {
        path: "*",
        element: <Navigate to="/home" replace />,
    }
];

export default routes;
