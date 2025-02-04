import styled from "styled-components";
import { FacebookLogo, InstagramLogo, LinkedinLogo, X } from "@phosphor-icons/react"; // Ícones das redes sociais
import logo from "@/assets/white_logo.png"; // Importando a logo

export const Footer = () => {
  return (
    <FooterContainer>
      <TopSection>
        <SocialSection>
          <Divider />
          <SocialIcons>
            <InstagramLogo size={30} color="white" />
            <LinkedinLogo size={30} color="white" />
          </SocialIcons>
        </SocialSection>

        <LogoSection>
          <img src={logo} alt="Teleconnect Logo" />
          <Divider />
        </LogoSection>
      </TopSection>

      <InfoSection>
        <p>© Teleconnect - CNPJ: 12.345.678/0001-90 Avenida Paulista, 1000 - São Paulo - SP</p>
      </InfoSection>
    </FooterContainer>
  );
};

// 🔹 Estilização do Footer
const FooterContainer = styled.footer`
  background-color: #210D94;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  text-align: center;
  width: 100%;

`;

// 🔹 Seção superior do footer (redes sociais e logo)
const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

// 🔹 Redes sociais
const SocialSection = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;

`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

// 🔹 Linha divisória para estética
const Divider = styled.div`
  width: 80px;
  height: 2px;
  background-color: white;
  margin-right: 15px;
  margin-left: 15px;
  margin-top: 10px;

  @media (max-width: 768px) {
    width: 0px;
  }
`;

// 🔹 Informação centralizada
const InfoSection = styled.div`
  width: 80%;
  padding-top: 10px;

  p {
    margin-bottom: 20px;
  }
`;

// 🔹 Seção do logo da empresa
const LogoSection = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-top: 10px;
    height: 50px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
