import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import PlanSelection from "./components/planselection";
import AddressForm from "./components/addressform";
import PaymentForm from "./components/paymentform";
import Confirmation from "./components/confirmation";
import { FaCheck } from "react-icons/fa";

export function Subscription(): JSX.Element {
  const [step, setStep] = useState<number>(1);

  const nextStep = (): void => setStep((prev) => prev + 1);
  const prevStep = (): void => setStep((prev) => Math.max(1, prev - 1));

  return (
    <>
      <Header />
      <ProgressBar step={step}>
        {"Plano Endereço Pagamento Confirmação".split(" ").map((label, index) => (
          <Step key={index} active={step > index && index !== 0}>
            {step > index && index !== 0 ? <FaCheck /> : index + 1}
            <span>{label}</span>
          </Step>
        ))}
      </ProgressBar>
      <Container>
        {step === 1 && <PlanSelection nextStep={nextStep} />}
        {step === 2 && <AddressForm nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <PaymentForm nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Confirmation />}
      </Container>
      <Footer />
    </>
  );
}

interface ProgressBarProps {
  step: number;
}

const ProgressBar = styled.div<ProgressBarProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #210D94;
  color: white;
  position: relative;
  margin: 20px auto;
  max-width: 600px;
  border-radius: 10px;
  overflow: hidden;
  
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 10%;
    width: 80%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-50%);
  }
  
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 10%;
    width: ${({ step }) => (step > 1 ? (step - 1) * 25 : 0)}%;
    height: 5px;
    background-color: #4CAF50;
    transform: translateY(-50%);
  }
`;

interface StepProps {
  active: boolean;
}

const Step = styled.div<StepProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ active }) => (active ? "#4CAF50" : "#757575")};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-weight: bold;
  z-index: 2;

  span {
    font-size: 12px;
    margin-top: 5px;
    text-align: center;
    white-space: nowrap;
  }
`;

const Container = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
