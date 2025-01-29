import { config } from "@/config/config";

export async function fetchLogin(data: { email?: string; phone_number?: string; password: string }) {
    try {
        const response = await fetch("http://localhost:8000/pessoa/fisica/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include", // 🚀 Importante para permitir cookies da API
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Falha no login. Tente novamente.");
        }

        return { success: true };
    }catch (error) {
        console.error("Erro ao tentar fazer login:", error);
    
        return {
            success: false,
            message: error instanceof Error ? error.message : "Ocorreu um erro desconhecido",
        };
    }
    
}
