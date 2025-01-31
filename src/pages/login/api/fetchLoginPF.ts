export const fetchLoginPF = async (loginData: { email: string; phone_number: string; password: string }) => {
    try {
      const response = await fetch("http://localhost:8000/pessoa/fisica/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
      return response.ok ? { success: true, data } : { success: false, message: data.detail || "Erro no login" };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { success: false, message: "Erro na conexão com o servidor" };
    }
  };
  