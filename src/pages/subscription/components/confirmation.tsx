import styled from "styled-components";

export default function Confirmation(): JSX.Element {
  return (
    <Section>
      <h2>Confirmação</h2>
      <p>Obrigado pela sua assinatura!</p>
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
`;
