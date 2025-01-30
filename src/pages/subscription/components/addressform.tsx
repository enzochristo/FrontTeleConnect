import styled from "styled-components";

interface AddressFormProps {
  nextStep: () => void;
  prevStep: () => void;
}

export default function AddressForm({ nextStep, prevStep }: AddressFormProps): JSX.Element {
  return (
    <Section>
      <h2>Endereço</h2>
      <button onClick={prevStep}>Voltar</button>
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
