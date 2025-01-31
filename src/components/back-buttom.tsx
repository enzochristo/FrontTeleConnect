import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "@phosphor-icons/react";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(-1)}>
      <ArrowLeft size={24} />
    </Button>
  );
}

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
  transition: 0.3s;

  &:hover {
    opacity: 0.7;
  }
`;
