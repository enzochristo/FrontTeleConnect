import { config } from "@/config/config";

export async function fetchRegister(endpoint: string, data: any) {
    try {
        const response = await fetch(`${config.apiBaseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.detail || "Erro no registro");
        }

        return { success: true, data: responseData };
    } catch (error) {
        console.error("Erro ao registrar:", error);
        return { success: false, message: (error as Error).message };
    }
}
