import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { motion } from "framer-motion";

// 🔹 Importando imagens
import heroImage from "../products/components/esim.jpg";
import image5G from "../products/components/internet-5g.jpg";
import imageEsim from "../products/components/esim.jpg";
import imagePhone from "../products/components/phone.jpg";

import { useState, useEffect } from "react";

const products = [
  {
    title: "Internet - 5G",
    description:
      "Navegue com velocidades incríveis, perfeitas para streaming, jogos online e downloads. Com nossa cobertura 5G, você está sempre conectado ao que importa.",
    features: ["Conexão 5G Ultrarrápida", "20 GB para uso nacional", "WhatsApp ilimitado"],
    image: image5G,
    link: "/pagamento/internet-5g",
  },
  {
    title: "E-Sim",
    description:
      "Conectividade global sem necessidade de chip físico. Ideal para viajantes e para quem deseja mais flexibilidade com operadoras.",
    features: ["Cobertura internacional", "Ativação rápida", "Sem necessidade de troca de chip"],
    image: imageEsim,
    link: "/pagamento/e-sim",
  },
  {
    title: "Telefone Ilimitado",
    description:
      "Ligações ilimitadas para qualquer operadora nacional. Plano ideal para quem precisa estar sempre conectado sem preocupações.",
    features: ["Chamadas ilimitadas", "Atendimento preferencial", "Sem taxas ocultas"],
    image: imagePhone,
    link: "/pagamento/telefone",
  },
];

export function Products() {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById("products-section");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <HeroSection>
        <motion.div
          className="text-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Transforme sua Conectividade</h1>
          <p>
            Descubra nossos planos exclusivos e garanta velocidade, flexibilidade e estabilidade em sua comunicação digital.
          </p>
          <p>
            Seja para streaming, chamadas ou viagens, temos o plano perfeito para você. Escolha o que mais combina com o seu estilo de vida.
          </p>
          <ExploreButton onClick={scrollToProducts}>Explorar Planos</ExploreButton>
        </motion.div>

        {!isSmallScreen && (
          <motion.div
            className="image-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroImage src={heroImage} alt="Conectividade Digital" />
          </motion.div>
        )}
      </HeroSection>

      <ProductsContainer id="products-section">
        {products.map((product, index) => (
          <Section key={index} isReversed={index % 2 !== 0}>
            <motion.div
              className="text-container"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <ul>
                {product.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
              <SubscribeButton onClick={() => navigate("/subscription")}>Assinar Agora</SubscribeButton>
            </motion.div>

            {!isSmallScreen && (
              <motion.div
                className="image-container"
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ImageWrapper>
                  <img src={product.image} alt={product.title} />
                </ImageWrapper>
              </motion.div>
            )}
          </Section>
        ))}
      </ProductsContainer>

      <Footer />
    </>
  );
}


// 🔹 Estilos
const HeroSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 10%;
  background: linear-gradient(180deg, #210D94 20%, #2A1B8F 100%);
  color: white;

  .text-content {
    flex: 1;
    max-width: 500px;

    h1 {
      font-size: 2.8rem;
      font-weight: bold;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.2rem;
      margin-bottom: 10px;
      line-height: 1.5;
    }
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: right;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    text-align: center;
    padding: 40px 5%;

    .text-content {
      text-align: center;
    }
  }
`;

const HeroImage = styled.img`
  width: 100%;
  max-width: 450px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
`;

const ExploreButton = styled.button`
  background-color: white;
  color: #210D94;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #EDEDED;
  }
`;

const ProductsContainer = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

const Section = styled.div<{ isReversed: boolean }>`
  display: flex;
  flex-direction: ${({ isReversed }) => (isReversed ? "row-reverse" : "row")};
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 60px 15%;
  text-align: ${({ isReversed }) => (isReversed ? "right" : "left")};

  .text-container {
    flex: 1;
    max-width: 500px;

    h2 {
      font-size: 2rem;
      color: #210D94;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.1rem;
      color: #444;
      margin-bottom: 15px;
    }

    ul {
      list-style: none;
      padding: 0;
      font-size: 1rem;
      color: #210D94;
      
      li {
        margin-bottom: 5px;
      }
    }
  }

  .image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    max-width: 300px;
    max-height: 100%;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const SubscribeButton = styled.button`
  background-color: #210D94;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #2A1B8F;
  }
`;
