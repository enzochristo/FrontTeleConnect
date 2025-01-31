import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Sidebar(): JSX.Element {
  const navigate = useNavigate();

  // 🔹 Função para Logout
  const handleLogout = async () => {
    try {
      // Chamando API de Logout (opcional, caso tenha)
      await fetch("http://localhost:8000/manager/logout", {
        method: "POST",
        credentials: "include",
      });

      // Removendo o token armazenado no navegador
      document.cookie = "manager_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirecionando para a tela de login
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Erro ao sair. Tente novamente.");
    }
  };

  return (
    <SidebarContainer>
      <StyledNavLink to="/dashboard/overview">Visão Geral</StyledNavLink>
      <StyledNavLink to="/dashboard/manage-plans">Gerenciar Produtos</StyledNavLink>
      <StyledNavLink to="/dashboard/create-plan">Criar Plano</StyledNavLink>

      <LogoutButton onClick={handleLogout}>Sair</LogoutButton> {/* 🔹 Botão de Logout */}
    </SidebarContainer>
  );
}

// 🔹 Estilos
const SidebarContainer = styled.div`
  width: 250px;
  background: #f4f4f4;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 10px;
  font-size: 16px;
  text-decoration: none;
  color: #333;
  transition: 0.3s;
  border-radius: 5px;

  &:hover {
    background: #ddd;
  }

  &.active {
    background: #210D94;
    color: white;
  }
`;

/* 🔹 Botão de Logout */
const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: #ff4d4d;
  color: white;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #d63031;
  }
`;
