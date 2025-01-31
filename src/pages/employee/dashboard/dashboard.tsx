import styled from "styled-components";
import { Outlet, Navigate } from "react-router-dom"; 
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export function Dashboard(): JSX.Element {
  return (
    <Container>
      <Header breadcrumb="Dashboard" />
      <MainContent>
        <Sidebar />
        <Content>
          <Outlet /> {/* 🔹 Renderiza a página aninhada aqui */}
        </Content>
      </MainContent>
    </Container>
  );
}

// 🔹 Estilos
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
`;
