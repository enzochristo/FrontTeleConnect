import styled from "styled-components";
import { WifiHigh, Broadcast, Phone } from "@phosphor-icons/react"; // 🔹 Ícones do Phosphor

// 🔹 Lista de produtos
const products = [
  { speed: "100 Mbps", type: "Internet", price: "49,99", icon: <Broadcast size={50} color="white" /> },
  { speed: "300 Mbps", type: "Internet", price: "49,99", icon: <WifiHigh size={50} color="white" /> }, // 🔹 Substituído Wifi -> RadioTower
  { speed: "50 GB", type: "Telefone", price: "49,99", icon: <Phone size={50} color="white" /> },
];

export const ProductCards = () => {
  return (
    <CardsContainerStyles>
      {products.map((product, index) => (
        <Card key={index}>
          <Plan>{product.speed}</Plan>
          <div className="type">
              <IconContainer>{product.icon}</IconContainer>
              <h3>{product.type}</h3>
          </div>
          <Divider />
          <p>A partir de:</p>
          <Price>R$ {product.price}</Price>
        </Card>
      ))}
    </CardsContainerStyles>
  );
};

// 🔹 Estilização dos cards
const CardsContainerStyles = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;

  .type{
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;

    h3{
      margin-left: 10px;
      font-size: 24px;
      
    }
  }

`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to bottom, #2A1B8F, #0C1A81);
  color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  height: 300px;
  width: 200px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Plan = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 36px;
`;

const IconContainer = styled.div`
  margin: 10px 0;
`;

const Divider = styled.hr`
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 80%;
  margin: 10px auto;
`;


const Price = styled.h2`
  font-size: 44px;
  font-weight: bold;
  margin-top: 5px;
`;
