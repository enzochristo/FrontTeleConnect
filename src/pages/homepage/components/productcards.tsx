import { useState, useEffect } from "react";
import styled from "styled-components";
import { WifiHigh, Broadcast, Phone } from "@phosphor-icons/react"; // 🔹 Ícones do Phosphor

interface Product {
  _id: string;
  name: string;
  tipo: "Internet" | "Mobile" | "Fixed";
  price: number;
  vel_min?: number | null;
  benefits?: string;
}

export const ProductCards = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/manager/get/all/plans", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar planos: ${response.statusText}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido ao buscar os planos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 Define os ícones com base no tipo do plano
  const getIcon = (tipo: string) => {
    switch (tipo) {
      case "Internet":
        return <Broadcast size={50} color="white" />;
      case "Mobile":
        return <WifiHigh size={50} color="white" />;
      case "Fixed":
        return <Phone size={50} color="white" />;
      default:
        return <Broadcast size={50} color="white" />;
    }
  };

  return (
    <CardsContainerStyles>
      {loading && <p>Carregando planos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && products.length === 0 && <p>Nenhum plano disponível.</p>}

      {products.map((product) => {
        // 🔹 Calcula o preço mínimo com base na velocidade mínima
        const minPrice = product.vel_min ? product.vel_min * product.price : product.price;

        return (
          <Card key={product._id}>
            <Plan>{product.name}</Plan>
            <div className="type">
              <IconContainer>{getIcon(product.tipo)}</IconContainer>
              <h3>{product.tipo}</h3>
            </div>
            <Divider />
            <p>A partir de:</p>
            <Price>R$ {minPrice.toFixed(2)}</Price>
            {product.benefits && <Benefits>{product.benefits}</Benefits>}
          </Card>
        );
      })}
    </CardsContainerStyles>
  );
};

// 🔹 Estilos dos cards
const CardsContainerStyles = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;

  .type {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;

    h3 {
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
  width: 250px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Plan = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 24px;
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
  font-size: 28px;
  font-weight: bold;
  margin-top: 5px;
`;

const Benefits = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: #ddd;
  font-style: italic;
`;

export default ProductCards;
