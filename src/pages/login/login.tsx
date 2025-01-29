import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchLogin } from "./api/fetchLogin"; // ✅ Importa a função de login

// 🔹 Importando imagens para cada tipo de conta
import imagePessoaFisica from "../login/components/pf-pic.jpg";
import imagePessoaJuridica from "../login/components/pj-pic.jpg";
import imageColaborador from "../login/components/employee-pic.jpg";
import logo from "@/assets/blue_logo.png";

export const Login = () => {
  const [activeTab, setActiveTab] = useState("Pessoa Física");
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // 🚀 Para redirecionamento após login

  // 🔹 Define a imagem de fundo conforme a seleção
  const backgroundImage =
    activeTab === "Pessoa Física"
      ? imagePessoaFisica
      : activeTab === "Pessoa Jurídica"
      ? imagePessoaJuridica
      : imageColaborador;

  // 🔹 Atualiza os campos do formulário dinamicamente
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envio do formulário de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loginData =
      activeTab === "Pessoa Física"
        ? { email: formData.email, phone_number: formData.phone_number, password: formData.password }
        : { email: formData.email, password: formData.password };

    const result = await fetchLogin(loginData);

    if (result.success) {
      alert("Login realizado com sucesso!");
      navigate("/home"); // 🚀 Redireciona para a página principal
    } else {
      alert(result.message);
    }
    setLoading(false);
  };

  return (
    <LoginContainer>
      {/* 🔹 Área da Esquerda (Formulário) */}
      <LeftPanel>
        <Logo><img src={logo} alt="Teleconnect Logo" /></Logo>
        <h2>Login</h2>

        {/* 🔹 Botões de seleção */}
        <TabContainer>
          {["Pessoa Física", "Pessoa Jurídica", "Colaborador"].map((tab) => (
            <TabButton
              key={tab}
              active={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </TabContainer>

        <p>
          Ainda não tem uma conta? <RegisterLink href="/register">Registrar aqui!</RegisterLink>
        </p>

        {/* 🔹 Formulário Dinâmico com Animação */}
        <FormContainer key={activeTab}>
          <Form onSubmit={handleLogin}>
            {activeTab === "Pessoa Física" && (
              <>
                <label>Email ou Telefone</label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Entre com o Email ou Telefone"
                  value={formData.email || formData.phone_number}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {activeTab !== "Pessoa Física" && (
              <>
                <label>Email</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <label>Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <LoginButton type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Login"}
            </LoginButton>
          </Form>
        </FormContainer>
      </LeftPanel>

      {/* 🔹 Área da Direita (Imagem de Fundo com Transição Suave) */}
      <RightPanel style={{ backgroundImage: `url(${backgroundImage})` }}>
      </RightPanel>
    </LoginContainer>
  );
};

// 🔹 Estilos (Mantidos do código original)
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  flex: 1;
  background: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h2 {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }
  p {
    font-size: 16px;
  }
`;

const RightPanel = styled.div`
  flex: 1;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: background-image 0.8s ease-in-out;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  position: absolute;
  top: 20px;
  left: 20px;
  img {
    height: 40px;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 5px;
`;

const TabButton = styled.button<{ active: boolean }>`
  color: ${(props) => (props.active ? "#210D94" : "#999999")};
  text-decoration: ${(props) => (props.active ? "underline 1.5px" : "none")};
  border: none;
  background: none;
  padding: 8px 0px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  font-size: 16px;

  &:hover {
    color: #210D94;
  }
`;

const RegisterLink = styled.a`
  color: #210D94;
  font-weight: bold;
  text-decoration: none;
`;

const FormContainer = styled.div`
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  width: 70%;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #999999;
  border-radius: 5px;
  font-size: 16px;
  color: #210D94;
`;

const LoginButton = styled.button`
  background: #210D94;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10rem;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background: #2A1B8F;
  }
`;

export default Login;
