import { useState } from "react";
import styled from "styled-components";
import { Header } from "../../../components/header";
import { Footer } from "../../../components/footer";
import CustomerData from "../information/components/customerdata";
import CustomerPlans from "./components/customerplans";

export function Information(): JSX.Element {

  return (
    <>
      <Header />
      <Container>
        <CustomerData />
        <CustomerPlans />
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
`;

const Button = styled.button`
  background: #210D94;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #2A1B8F;
  }
`;
