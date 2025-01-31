import { useEffect, useState } from "react";
import styled from "styled-components";

interface Customer {
  name: string;
  email: string;
}

export default function CustomerData(): JSX.Element {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Busca os dados do cliente da API
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("http://localhost:8000/pessoa/fisica/data", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erro ao buscar dados do cliente.");

        const data = await response.json();
        setCustomer({
          name: data.data.name,
          email: data.data.email,
        });

      } catch (err) {
        setError("Erro ao carregar os dados do cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <Card>
      <h2>Dados do Cliente</h2>
      
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {customer && (
        <>
          <p><strong>Nome:</strong> {customer.name}</p>
          <p><strong>Email:</strong> {customer.email}</p>
        </>
      )}
    </Card>
  );
}

// 🔹 Estilos do Card
const Card = styled.div`
  background: #313FB1;
  padding: 20px;
  color: white;
  align-self: center;

  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  text-align: center;
`;

