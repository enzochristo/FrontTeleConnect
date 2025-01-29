import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer"; // 🔹 Importando o Footer
import { ProductCards } from "./components/productcards"; // 🔹 Importando os cards de produtos
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../components/ui/carousel"; // Importando o carrossel

// 🔹 Importando imagens diretamente
import Image1 from "../../assets/carousel4.png";
import Image2 from "../../assets/carousel3.png";
import Image3 from "../../assets/carousel2.png";
import Image4 from "../../assets/carousel1.png";
import Image5 from "../../assets/homepagepic1.png";
import Image6 from "../../assets/homepagepic2.png";
import Image7 from "../../assets/homepagepic3.png";

export const Home = () => {
  // Lista de imagens (agora importadas diretamente)
  const [images] = useState([Image1, Image2, Image3, Image4]);

  return (
    <>
      <Header />
      <HomeStyles>
        <CarouselContainer>
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="carousel-content">
              {images.map((src, index) => (
                <CarouselItem key={index} className="carousel-item">
                  <img src={src} alt={`Slide ${index + 1}`} className="carousel-image" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="carousel-prev" aria-label="Imagem anterior" />
            <CarouselNext className="carousel-next" aria-label="Próxima imagem" />
          </Carousel>
        </CarouselContainer>

        <ProductCards /> {/* 🔹 Adicionando os cards abaixo do carrossel */}

        <img className="images" src={Image5} alt="Imagem 1" />
        <img className="images2" src={Image6} alt="" />
        <img className="images" src={Image7} alt="" />
      </HomeStyles>

      <Footer /> {/* 🔹 Adicionando o Footer no final da página */}
    </>
  );
};

// 🔹 Estilos para a Home Page e o carrossel
const HomeStyles = styled.div`  
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 20px;
    color: #4a004a;
  }

  .images {
    width: 80%;
  }
  .images2{
    width: 80%;
    /* background com largura de 100% */
    background-size: 100%;
    background-color: #210D94;
  }
`;

// 🔹 Estilos do Carrossel
const CarouselContainer = styled.div`
  width: 70%;
  overflow: hidden;
  position: relative;

  .carousel-content {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }

  .carousel-item {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  
  }

  .carousel-image {
    width: 80%;
    object-fit: cover;
    border-radius: 10px;
  }

  /* 🔹 Estilos para os botões de navegação */
  .carousel-prev,
  .carousel-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #210D94;
    padding: 10px;
    z-index: 2;
    transition: background 0.1s ease-in-out;
    border: none;
    background: none;
  }

  .carousel-prev {
    left: 10px;
  }

  .carousel-next {
    right: 10px;
  }

  /* 🔹 Responsividade para telas menores */
  @media (max-width: 768px) {
    .carousel-prev,
    .carousel-next {
      padding: 8px;
    }
  }
`;
