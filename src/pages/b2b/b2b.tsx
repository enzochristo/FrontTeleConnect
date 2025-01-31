import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";

export function WhatsAppMessage() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const phoneNumber = "+5511966320919";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Fale Conosco pelo WhatsApp</Title>
        <Subtitle>
          🚀 <strong>Benefícios exclusivos para Pessoa Jurídica!</strong>  
          Conecte sua empresa à melhor tecnologia do mercado, planos flexíveis e atendimento
          personalizado. 🚀
        </Subtitle>

        <TextArea
          placeholder="Digite sua mensagem aqui..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button onClick={sendMessage} disabled={!message.trim()}>
          Enviar Mensagem
        </Button>
      </Container>
      <Footer />
    </>
  );
}

// 🔹 Estilos aprimorados com cores do site
const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 4rem;
    self-align: center;
    justify-content: center;    
    justify-self: center;
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 40px 90px;
  max-width: 600px;
  background: linear-gradient(to bottom, #210D94, #0C1A81);
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  color: white;
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  color: #EECAEE;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: #DDDDDD;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 12px;
  border: 2px solid #EECAEE;
  border-radius: 8px;
  font-size: 16px;
  resize: none;
  outline: none;
  color: #210D94;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  border: none;
  background-color: #25D366;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  font-size: 20px;
  font-weight: bold;
  transition: 0.3s ease-in-out;
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #1ebe57;
    transform: scale(1.05);
  }
`;
