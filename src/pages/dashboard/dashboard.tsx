import styled from "styled-components";
import { Header } from "./components/header";
import { Sidebar } from "./components/sidebar";
import { Outlet } from "react-router-dom";

export function Dashboard(): JSX.Element {
  return (
    <Container>
      <Header />
      <MainContent>
        <Sidebar />
        <DashboardContent>
          <h1>Painel do Funcionário</h1>
          <Outlet /> {/* Aqui será inserido o conteúdo das rotas aninhadas */}
        </DashboardContent>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const DashboardContent = styled.div`
  flex: 1;
  padding: 20px;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
