import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchRegister } from "./api/fetchRegister"; // 🔹 Importando o fetch separado

// 🔹 Importando imagens para cada tipo de conta
import imagePessoaFisica from "./components/pf-pic.jpg";
import imagePessoaJuridica from "./components/pj-pic.jpg";
import imageColaborador from "./components/employee-pic.jpg";
import logo from "@/assets/blue_logo.png";

export const Register = () => {
  const [activeTab, setActiveTab] = useState("Pessoa Física");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    cpf: "",
    password: "",
  });

  const navigate = useNavigate(); // 🚀 Para redirecionamento após o registro

  // 🔹 Definindo a imagem de fundo conforme a seleção
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

  // 🔹 Função para enviar o formulário para a API
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const endpoint =
      activeTab === "Pessoa Física"
        ? "/pessoa/fisica/auth/register"
        : activeTab === "Pessoa Jurídica"
        ? "/pessoa/juridica/auth/register"
        : "/colaborador/auth/register";

    const response = await fetchRegister(endpoint, formData);

    if (response.success) {
      alert("Registro realizado com sucesso!");
      navigate("/home"); // 🚀 Redireciona para a HomePage após o sucesso
    } else {
      alert(`Erro ao registrar: ${response.message}`);
    }
  };

  return (
    <RegisterContainer>
      {/* 🔹 Área da Esquerda (Formulário) */}
      <LeftPanel>
        <Logo><img src={logo} alt="Teleconnect Logo" /></Logo>
        <h2>Registrar</h2>

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
          Já tem uma conta?{" "}
          <LoginLink href="/login">Faça login aqui!</LoginLink>
        </p>

        {/* 🔹 Formulário Dinâmico com Animação */}
        <FormContainer key={activeTab} onSubmit={handleRegister}>
          <Form>
            <label>Nome Completo</label>
            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <label>Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {activeTab === "Pessoa Física" && (
              <>
                <label>Telefone</label>
                <Input
                  type="text"
                  name="phone_number"
                  placeholder="Digite seu telefone"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  required
                />

                <label>CPF</label>
                <Input
                  type="text"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={formData.cpf}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <label>Senha</label>
            <Input
              type="password"
              name="password"
              placeholder="Crie uma senha"
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <RegisterButton type="submit">Registrar</RegisterButton>
          </Form>
        </FormContainer>
      </LeftPanel>

      {/* 🔹 Área da Direita (Imagem de Fundo com Transição Suave) */}
      <RightPanel style={{ backgroundImage: `url(${backgroundImage})` }} />
    </RegisterContainer>
  );
};

// 🔹 Estilos
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const RegisterContainer = styled.div`
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

const LoginLink = styled.a`
  color: #210D94;
  font-weight: bold;
  text-decoration: none;
`;

const FormContainer = styled.form`
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const Form = styled.div`
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

const RegisterButton = styled.button`
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

export default Register;
