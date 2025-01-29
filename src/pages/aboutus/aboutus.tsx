import styled from "styled-components";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer"; // 🔹 Importando o Footer
import aboutUsImage1 from "../aboutus/components/pic1.png"; // Primeira imagem
import aboutUsImage2 from "../aboutus/components/pic2.png"; // Segunda imagem
import aboutUsImage3 from "../aboutus/components/pic3.png"; // Terceira imagem

export const AboutUs = () => {
  return (
    <>
      <Header />
      <AboutUsContainer>
        {/* 🔹 Primeira Seção com Estilo Diferenciado */}
        <ImageSectionFirst image={aboutUsImage1}>
          <TextContainerFirst>
            <h1>Por que a Teleconnect?</h1>
            <p>
              Porque conectividade vai além da velocidade. Nossa missão é
              transformar sua experiência digital, oferecendo soluções que
              conectam você ao que realmente importa, com qualidade, inovação e
              confiança.
            </p>
          </TextContainerFirst>
        </ImageSectionFirst>

        {/* 🔹 Segunda Seção */}
        <ImageSection image={aboutUsImage2}>
          <TextContainer>
            <h1>Velocidade que acompanha o seu ritmo</h1>
            <p>
              Com o 5G da TeleConnect, você desfruta de velocidades
              ultrarrápidas que permitem downloads em segundos, jogos
              online sem atrasos e chamadas de vídeo cristalinas. É mais
              do que internet – é liberdade para fazer mais, sem
              interrupções.
            </p>
          </TextContainer>
        </ImageSection>

        {/* 🔹 Terceira Seção */}
        <ImageSection image={aboutUsImage3}>
          <TextContainer>
            <h1>Planos que se ajustam a você</h1>
            <p>
              Entendemos que cada cliente é único. Por isso, oferecemos
              planos flexíveis e acessíveis, feitos sob medida para atender
              suas necessidades – sem taxas escondidas ou surpresas na
              conta.
            </p>
          </TextContainer>
        </ImageSection>

        {/* 🔹 Texto Final Motivacional */}
        <FinalTextContainer>
          <h2>Conecte-se com o futuro, hoje</h2>
          <p>
            Escolher a TeleConnect é escolher inovação, confiabilidade e um
            compromisso com você. Estamos prontos para revolucionar a maneira
            como você se conecta. Venha para a TeleConnect e descubra o que é
            estar à frente.
          </p>
        </FinalTextContainer>
      </AboutUsContainer>

      {/* 🔹 Footer no final da página */}
      <Footer />
    </>
  );
};

// 🔹 Estilos da Página
const AboutUsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 30px; /* Espaçamento entre seções */
  padding-bottom: 50px;
`;

// 🔹 Primeira Seção com Estilo Diferente
const ImageSectionFirst = styled.div<{ image: string }>`
  width: 100%;
  height: 500px;
  background: url(${(props) => props.image}) no-repeat center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 🔹 Outras Seções de Imagem
const ImageSection = styled.div<{ image: string }>`
  width: 90%;
  height: 700px;
  background: url(${(props) => props.image}) no-repeat center;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px; /* Bordas arredondadas */
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

// 🔹 Container de Texto Sobreposto para a Primeira Imagem (Diferenciado)
const TextContainerFirst = styled.div`
  position: absolute;
  width: 40%;
  color: white;
  text-align: left;
  font-family: "Poppins", sans-serif;
  left: 5%;
  top: 60%;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5); /* 🔹 Sombra para melhorar a legibilidade */

  h1 {
    font-size: 3rem;
    font-weight: bold;
  }

  p {
    font-size: 1.2rem;
    margin-top: 15px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    width: 70%;
    left: 4%;
    top: 55%;
    text-align: left;

    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

// 🔹 Container de Texto Sobreposto para as Demais Imagens
const TextContainer = styled.div`
  position: absolute;
  width: 50%;
  color: white;
  text-align: right;
  font-family: "Poppins", sans-serif;
  right: 5%;
  top: 55%;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5); /* 🔹 Sombra para melhorar a legibilidade */

  h1 {
    font-size: 3.4rem;
    font-weight: bold;
  }

  p {
    font-size: 1.3rem;
    margin-top: 15px;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    width: 90%;
    h1 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

// 🔹 Bloco de Texto Final Antes do Footer
const FinalTextContainer = styled.div`
  width: 60%;
  text-align: center;
  padding: 40px;
  font-family: "Poppins", sans-serif;
  margin-top: 50px;
  margin-bottom: 50px;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #210D94;
  }

  p {
    font-size: 1.2rem;
    color: #333;
    margin-top: 10px;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    width: 90%;
    h2 {
      font-size: 1.8rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export default AboutUs;
