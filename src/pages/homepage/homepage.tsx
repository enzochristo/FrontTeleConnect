import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ProductCards } from "./components/productcards";
import { WhatsAppButton } from "../../components/whatsappbuttom";

// 🔹 Importando imagens diretamente
import HeroImage from "../../assets/homepage1.png";
import Image5 from "../../assets/homepage2.png";
import Image6 from "../../assets/homepage3.png";
import Image7 from "../../assets/homepage4.png";

export const Home = () => {
  const navigate = useNavigate(); // 🔹 Hook para navegação

  return (
    <>
      <Header />
      <HomeStyles>
        {/* 🔹 Imagem de destaque */}
        <HeroSection>
          <img src={HeroImage} alt="Destaque Teleconnect" />
        </HeroSection>

        {/* 🔹 Título antes dos produtos */}
        <SectionTitle>Conheça nossos planos</SectionTitle>

        {/* 🔹 Cards de produtos */}
        <ProductCards />

        {/* 🔹 Botão para Produtos e Serviços */}
        <ButtonContainer>
          <ProductsButton onClick={() => navigate("/products")}>
            Ver nossos planos e serviços
          </ProductsButton>
        </ButtonContainer>

        <img className="images" src={Image5} alt="Imagem 1" />
        <img className="images2" src={Image6} alt="" />
        <img className="images" src={Image7} alt="" />
      </HomeStyles>

      <WhatsAppButton phoneNumber="+5511966320919" message="Olá, tenho dúvidas sobre os planos" />
      <Footer />
    </>
  );
};

// 🔹 Estilos para a Home Page
const HomeStyles = styled.div`  
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  .images {
    width: 100%;
  }
  
  .images2 {
    width: 100%;
    background-size: 100%;
    background-color: #210D94;
  }
`;

// 🔹 Estilos para a Hero Section
const HeroSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

// 🔹 Título antes dos produtos
const SectionTitle = styled.h2`
  font-size: 32px;
  color: #210D94;
  font-weight: bold;
  margin-top: 40px;
  text-align: center;
`;

// 🔹 Estilos do botão
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px 0;
`;

const ProductsButton = styled.button`
  background: #210D94;
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background: #2A1B8F;
  }
`;
