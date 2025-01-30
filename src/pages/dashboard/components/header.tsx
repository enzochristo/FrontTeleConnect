import styled from "styled-components";

export function Header(): JSX.Element {
  return (
    <HeaderContainer>
      <Logo>Teleconnect</Logo>
      <Nav>
        <NavItem href="#">Dashboard</NavItem>
        <NavItem href="#">Configurações</NavItem>
        <NavItem href="#">Sair</NavItem>
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #210D94;
  color: white;
  padding: 15px 20px;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
