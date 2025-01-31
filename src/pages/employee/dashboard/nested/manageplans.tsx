import { useEffect, useState } from "react";
import styled from "styled-components";
import { WifiHigh, Broadcast, Phone, TrashSimple } from "@phosphor-icons/react"; // 🔹 Ícones do Phosphor

interface Plan {
  _id: string;
  customer_id: string;
  name: string;
  tipo: "Internet" | "Mobile" | "Fixed";
  price: number;
  benefits?: string;
  created_at: string;
  updated_at?: string;
}

export function ManagePlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:8000/manager/get/all/plans", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar planos");
        }

        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // 🔹 Define ícone baseado no tipo do plano
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

  // 🔹 Função para excluir um plano
  const handleDelete = async (planId: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este plano?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8000/manager/delete/plan/${planId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o plano.");
      }

      // 🔹 Remove o plano da lista sem precisar recarregar a página
      setPlans((prevPlans) => prevPlans.filter((plan) => plan._id !== planId));
    } catch (error) {
      console.error("Erro ao deletar o plano:", error);
      alert("Erro ao excluir o plano. Tente novamente.");
    }
  };

  return (
    <Container>
      <h2>Gerenciar Planos</h2>

      {loading && <Message>Carregando planos...</Message>}
      {error && <MessageErro>{error}</MessageErro>}
      {!loading && !error && plans.length === 0 && <Message>Nenhum plano encontrado.</Message>}

      <Grid>
        {plans.map((plan) => (
          <Card key={plan._id}>
            {/* 🔹 Ícone de lixeira para deletar */}
            <DeleteButton onClick={() => handleDelete(plan._id)}>
              <TrashSimple size={24} />
            </DeleteButton>

            <PlanName>{plan.name}</PlanName>
            <div className="type">
              <IconContainer>{getIcon(plan.tipo)}</IconContainer>
              <h3>{plan.tipo}</h3>
            </div>
            <Divider />
            <p>A partir de:</p>
            <Price>R$ {plan.price.toFixed(2)}</Price>
            {plan.benefits && <Benefits>{plan.benefits}</Benefits>}
            <small>Criado em: {new Date(plan.created_at).toLocaleDateString()}</small>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}

// 🔹 Estilos
const Container = styled.div`
  padding: 20px;
`;

const Message = styled.p`
  text-align: center;
  font-size: 18px;
`;

const MessageErro = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;

const Grid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;
`;

const Card = styled.div`
  position: relative; /* 🔹 Para posicionar a lixeira no canto */
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
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

/* 🔹 Ícone de Lixeira */
const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  transition: 0.3s;

  &:hover {
    color: #ff4d4d;
  }
`;

const PlanName = styled.div`
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

export default ManagePlans;
