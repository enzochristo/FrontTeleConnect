import styled from "styled-components";

interface PlanSelectionProps {
  nextStep: () => void;
}

export default function PlanSelection({ nextStep }: PlanSelectionProps): JSX.Element {
  return (
    <Section>
      <h2>Escolha seu Plano</h2>
      <button onClick={nextStep}>Continuar</button>
    </Section>
  );
}

const Section = styled.div`
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 50%;
  background: #f9f9f9;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
  }

  button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #210D94;
    color: white;
    cursor: pointer;
    border-radius: 5px;
  }
`;
