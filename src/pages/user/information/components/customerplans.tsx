import styled from "styled-components";

interface CustomerPlansProps {
  plans: {
    id: number;
    name: string;
    status: string;
    renewalDate: string;
  }[];
}

export default function CustomerPlans({ plans }: CustomerPlansProps): JSX.Element {
  return (
    <Card>
      <h2>Seus Planos</h2>
      {plans.map((plan) => (
        <Plan key={plan.id}>
          <p><strong>Plano:</strong> {plan.name}</p>
          <p><strong>Status:</strong> {plan.status}</p>
          <p><strong>Data de Renovação:</strong> {plan.renewalDate}</p>
        </Plan>
      ))}
    </Card>
  );
}

const Card = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 50%;
  text-align: left;
`;

const Plan = styled.div`
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: white;
`;
