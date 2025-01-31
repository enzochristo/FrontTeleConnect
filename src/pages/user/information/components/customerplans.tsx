import styled from "styled-components";
import { useState, useEffect } from "react";
import { Header } from "../../../../components/header";
import { Footer } from "../../../../components/footer";
import { WifiHigh, Broadcast, Phone } from "@phosphor-icons/react"; // Ícones do Phosphor

// 🔹 Definição do tipo do plano
interface Plan {
  plan_type: "Internet" | "Mobile" | "Fixed";
  speed: number;
  final_price: number;
  cep: string;
  rua: string;
  cidade: string;
  numero: string;
  estado: string;
}

export default function CustomerPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await fetch("http://localhost:8000/pessoa/fisica/myplans", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar planos comprados");
        }

        const data = await response.json();
        console.log("Dados recebidos da API:", data);

        setPlans(data.plans || []); // 🔹 Garante que `plans` seja um array

      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      }
    }

    fetchPlans();
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
    <>
      <PlansContainer>
        <h1>Seus Planos</h1>
        {plans.length === 0 ? (
          <p>Você ainda não possui planos comprados.</p>
        ) : (
          <CardsContainer>
            {plans.map((plan, index) => (
              <PlanCard key={index}>
                <PlanHeader>
                  <IconContainer>{getIcon(plan.plan_type)}</IconContainer>
                  <h2>{plan.plan_type}</h2>
                </PlanHeader>
                <Divider />
                <p><strong>Velocidade:</strong> {plan.speed} Mbps</p>
                <p><strong>Preço:</strong> R$ {plan.final_price.toFixed(2)}</p>
                <p><strong>CEP:</strong> {plan.cep}</p>
                <p><strong>Endereço:</strong> {plan.rua}, {plan.numero}, {plan.cidade} - {plan.estado}</p>
              </PlanCard>
            ))}
          </CardsContainer>
        )}
      </PlansContainer>
    </>
  );
}

// 🔹 Estilos dos cards
const PlansContainer = styled.div`
  padding: 40px 20px;
  text-align: center;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to bottom, #2A1B8F, #0C1A81);
  color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const PlanHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  h2 {
    font-size: 22px;
    font-weight: bold;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 10px;
`;

const Divider = styled.hr`
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 80%;
  margin: 10px auto;
`;
