import styled from "styled-components";
import logo from "@/assets/white_logo.png";

interface HeaderProps {
  breadcrumb: string;
}

export default function Header({ breadcrumb }: HeaderProps): JSX.Element {
  return (
    <HeaderContainer>
      <img src={logo} alt="Logo" />
      <Breadcrumb>{breadcrumb}</Breadcrumb>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #210D94;
  color: white;

  img {
    height: 60px;
  }
`;

const Breadcrumb = styled.div`
  font-size: 14px;
  opacity: 0.8;
`;


