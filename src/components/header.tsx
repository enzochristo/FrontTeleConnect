import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { List, UserCircle } from "@phosphor-icons/react"; // Ícones
import logo from "@/assets/white_logo.png";
import { Sidebar } from "./sidebar"; // Importa o menu lateral

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 🔹 Função para verificar a sessão do usuário
  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8000/appraiser/auth/check/token", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Sessão válida. Buscando nome do usuário...");
        await fetchUserName();
      } else {
        console.warn("Sessão inválida ou expirada.");
        setUserName(null);
      }
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      setUserName(null);
    }
  };

  // 🔹 Função para buscar o nome do usuário autenticado
  const fetchUserName = async () => {
    try {
      const response = await fetch("http://localhost:8000/pessoa/fisica/headbar", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados do usuário obtidos:", data);
        setUserName(data.pessoa_fisica_name);
      } else {
        console.warn("Não foi possível obter o nome do usuário.");
        setUserName(null);
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
      setUserName(null);
    }
  };

  // 🔹 Função de Logout
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/pessoa/fisica/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        console.log("Logout realizado com sucesso.");
        setUserName(null);
        navigate("/home"); // 🔹 Redireciona para login
      } else {
        console.error("Erro ao realizar logout.");
      }
    } catch (error) {
      console.error("Erro ao tentar sair:", error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <HeaderStyle>
        <nav className="nav">
          <img src={logo} alt="Logo" />
          <StyledLink to="/home" active={location.pathname === "/home"}>Home</StyledLink>
          <StyledLink to="/products" active={location.pathname === "/products"}>Produtos e Serviços</StyledLink>
          <StyledLink to="/teleconnect" active={location.pathname === "/teleconnect"}>Por que a Teleconnect?</StyledLink>
        </nav>

        <ProfileMenu>
          {userName ? (
            <UserContainer onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span>{userName.split(" ")[0]}</span>
              <UserCircle size={24} color="white" />
              {dropdownOpen && (
                <DropdownMenu>
                  <Link to="/profile">Meus Dados</Link>
                  <button onClick={handleLogout}>Sair</button>
                </DropdownMenu>
              )}
            </UserContainer>
          ) : (
            <StyledLogin to="/login" active={location.pathname === "/login"}>Login</StyledLogin>
          )}
        </ProfileMenu>

        <button className="menu-button" onClick={() => setMenuOpen(true)}>
          <List size={32} color="white" />
        </button>
      </HeaderStyle>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// 🔹 Estilos do Header
const ProfileMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  cursor: pointer;
  position: relative;
  border-radius: 100px;
  border: 1px solid white;
  padding: 8px 16px;

  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  right: 9px;
  background: #210D94;
  color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;

  a, button {
    padding: 10px;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-size: 14px;
    color: white;
    cursor: pointer;
    transition: 0.3s;
  }

  a:hover, button:hover {
    background: #111F39;
  }
`;

const HeaderStyle = styled.header`
  width: 100vw;
  max-width: 100%;
  min-height: 80px;
  background-color: #210D94;
  box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 20px;
  box-sizing: border-box;

  img {
    height: 60px;
    border-right: 3px solid white;
    padding-right: 20px;
  }

  .nav {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .menu-button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 1100px) {
    .nav {
      display: none;
    }
    .menu-button {
      display: block;
    }
  }
`;

const StyledLogin = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 100px;
  border: 1px solid white;
  transition: 0.3s;
  background: ${({ active }) => (active ? "rgba(255, 255, 255, 0.2)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StyledLink = styled(Link)<{ active: boolean }>`
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 100px;
  transition: 0.3s;
  background: ${({ active }) => (active ? "rgba(255, 255, 255, 0.2)" : "transparent")};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

