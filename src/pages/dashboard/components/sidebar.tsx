import styled from "styled-components";

export function Sidebar(): JSX.Element {
  return (
    <SidebarContainer>
      <SidebarItem href="#">Início</SidebarItem>
      <SidebarItem href="#">Usuários</SidebarItem>
      <SidebarItem href="#">Relatórios</SidebarItem>
      <SidebarItem href="#">Configurações</SidebarItem>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #2A1B8F;
  color: white;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SidebarItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
