import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { List } from "@phosphor-icons/react"; // Ícone de menu hambúrguer
import logo from "@/assets/white_logo.png";
import { Sidebar } from "./sidebar"; // Importa o menu lateral

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // 🔹 Função para verificar a sessão do usuário
  const checkSession = async () => {
    try {
      const response = await fetch("http://localhost:8000/appraiser/auth/check/token", {
        method: "POST",
        credentials: "include", // 🔹 Inclui cookies na requisição
      });

      if (response.ok) {
        console.log("Sessão válida. Buscando nome do usuário...");
        await fetchUserName(); // Se válido, busca o nome do usuário
      } else {
        console.warn("Sessão inválida ou expirada.");
        setUserName(null); // Usuário não autenticado
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
        credentials: "include", // 🔹 Permite o envio de cookies
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Dados do usuário obtidos:", data);
        setUserName(data.pessoa_fisica_name); // Atualiza o nome do usuário logado
        console.log("Nome do usuário obtido:", data.name);
      } else {
        console.warn("Não foi possível obter o nome do usuário.");
        setUserName(null);
      }
    } catch (error) {
      console.error("Erro ao buscar o nome do usuário:", error);
      setUserName(null);
    }
  };

  // 🔹 Chama as funções ao carregar a página
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <HeaderStyle>
        {/* Navegação padrão (só aparece em telas grandes) */}
        <nav className="nav">
          <img src={logo} alt="Logo" />
          <Link to="/home">Home</Link>
          <Link to="/products">Produtos e Serviços</Link>
          <Link to="/teleconnect">Porque a Teleconnect?</Link>
        </nav>

        <ProfileMenu>
          {userName ? (
            <>  
            <Link to="/profile" className="user-greeting">Meus dados</Link>
            <span className="user-greeting">Olá, {userName.split(" ")[0]}!</span>
            </>
          ) : (
            <Link to="/login" className="login-button">Login</Link>
          )}
        </ProfileMenu>

        {/* Ícone do menu hambúrguer (só aparece em telas menores) */}
        <button className="menu-button" onClick={() => setMenuOpen(true)}>
          <List size={32} color="white" />
        </button>
      </HeaderStyle>

      {/* Menu lateral (sidebar) */}
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

const ProfileMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
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

  .nav a {
    text-decoration: none;
    color: white;
    font-size: 16px;
    font-weight: 600;
  }

  .login-button {
    padding: 8px 16px;
    border: 2px solid white;
    border-radius: 25px;
    background-color: transparent;
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    transition: 0.3s;
  }

  .login-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /* 🔹 Estilo do nome do usuário logado */
  .user-greeting {
    color: white;
    font-size: 16px;
    font-weight: 600;
    text-decoration: none;
    margin-right: 20px;

  }

  /* Ícone do menu hambúrguer (aparece em telas menores) */
  .menu-button {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  @media (max-width: 1100px) {
    .nav {
      display: none; /* Esconde os links */
    }
    .menu-button {
      display: block; /* Exibe o ícone do menu */
    }
  }
`;
