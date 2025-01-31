import styled from "styled-components";
import { WhatsappLogo } from "@phosphor-icons/react";

interface WhatsAppButtonProps {
  phoneNumber: string; // Número de telefone no formato internacional (ex: +5511999999999)
  message?: string; // Mensagem opcional para iniciar a conversa
}

export function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  const formattedMessage = encodeURIComponent(message || "Olá, tenho interesse!");
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${formattedMessage}`;

  return (
    <ButtonContainer href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <WhatsappLogo size={32} weight="fill" />
      <span>Fale Conosco</span>
    </ButtonContainer>
  );
}

// 🔹 Estilos
const ButtonContainer = styled.a`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #25d366;
  color: white;
  padding: 12px 15px;
  font-size: 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  transition: background 0.3s, transform 0.2s;
  text-decoration: none;

  &:hover {
    background-color: #1ebc57;
    transform: scale(1.05);
  }

  svg {
    color: white;
  }
`;
