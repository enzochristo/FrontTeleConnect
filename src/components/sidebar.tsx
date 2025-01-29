import { Link } from "react-router-dom";
import styled from "styled-components";
import { X } from "@phosphor-icons/react"; // Ícone de fechar
import logo from "@/assets/white_logo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <SidebarStyle className={isOpen ? "open" : ""}>
      <button className="close-button" onClick={onClose}>
        <X size={32} color="white" />
      </button>
        
      <nav>
        <img src={logo} alt="Logo" />
        <Link to="/home" onClick={onClose}>Home</Link>
        <Link to="/products" onClick={onClose}>Produtos e Serviços</Link>
        <Link to="/teleconnect" onClick={onClose}>Porque a Teleconnect?</Link>
        <Link to="/login" className="login-button" onClick={onClose}>Login</Link>
      </nav>
    </SidebarStyle>
  );
}

const SidebarStyle = styled.div`
  position: fixed;
  top: 0;
  left: -300px; /* Começa fora da tela */
  width: 250px;
  height: 100vh;
  background-color: #210D94;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  padding: 20px;
  transition: left 0.3s ease;

  &.open {
    left: 0; /* Move o menu para dentro da tela */
  }

  .close-button {
    align-self: flex-end;
    background: none;
    border: none;
    cursor: pointer;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }

  nav a {
    color: white;
    text-decoration: none;
    font-size: 18px;
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
`;
