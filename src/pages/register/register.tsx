import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchRegister } from "./api/fetchRegister"; // 🔹 Importa o fetch de registro
import { BackButton } from "@/components/back-buttom";

// 🔹 Importando imagens para cada tipo de conta
import imagePessoaFisica from "./components/pf-pic.jpg";
import imagePessoaJuridica from "./components/pj-pic.jpg";
import imageColaborador from "./components/employee-pic.jpg";
import logo from "@/assets/blue_logo.png";

export const Register = () => {
  const [activeTab, setActiveTab] = useState("Pessoa Física");
  const [formDataPF, setFormDataPF] = useState({
    name: "",
    phone_number: "",
    cpf: "",
    email: "",
    password: "",
  });
  const [formDataPJ, setFormDataPJ] = useState({
    name: "",
    phone_number: "",
    cnpj: "", 
    email: "",
    password: "",
  });
  const [formDataCL, setFormDataCL] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    comp_password: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate(); // 🚀 Para redirecionamento após o registro

  // Atualiza a largura da tela dinamicamente
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const backgroundImage =
  activeTab === "Pessoa Física"
    ? imagePessoaFisica
    : activeTab === "Pessoa Jurídica"
    ? imagePessoaJuridica
    : imageColaborador;

  // 🔹 Atualiza os campos do formulário dinamicamente
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (activeTab === "Pessoa Física") {
      setFormDataPF({ ...formDataPF, [name]: value });
    } else if (activeTab === "Pessoa Jurídica") {
      setFormDataPJ({ ...formDataPJ, [name]: value });
    } else {
      setFormDataCL({ ...formDataCL, [name]: value });
    }
  };

  // 🔹 Envia o formulário para a API conforme o tipo de conta
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    let endpoint = "";
    let data = {};

    if (activeTab === "Pessoa Física") {
      endpoint = "/pessoa/fisica/auth/register";
      data = formDataPF;
    } else if (activeTab === "Pessoa Jurídica") {
      endpoint = "/pessoa/juridica/auth/register";
      data = formDataPJ;
    } else {
      // 🔹 Verifica se as senhas do colaborador coincidem
      endpoint = "/manager/auth/register";
      data = formDataCL;
    }

    const response = await fetchRegister(endpoint, data);

    if (response.success) {
      navigate("/home"); // 🚀 Redireciona para a HomePage após o sucesso
    } else {
      alert(`Erro ao registrar: ${response.message}`);
    }
  };

  return (
    <RegisterContainer>
      <BackButtonContainer>
        <BackButton />
      </BackButtonContainer>

      <LeftPanel>
        <Logo><img src={logo} alt="Teleconnect Logo" /></Logo>
        <h2>Registrar</h2>

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

        <FormContainer key={activeTab} onSubmit={handleRegister}>
          <Form>
            <label>Nome Completo</label>
            <Input
              type="text"
              name="name"
              placeholder="Digite seu nome completo"
              value={activeTab === "Pessoa Física" ? formDataPF.name : activeTab === "Pessoa Jurídica" ? formDataPJ.name : formDataCL.name}
              onChange={handleInputChange}
              required
            />

            <label>Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={activeTab === "Pessoa Física" ? formDataPF.email : activeTab === "Pessoa Jurídica" ? formDataPJ.email : formDataCL.email}
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
                  value={formDataPF.phone_number}
                  onChange={handleInputChange}
                  required
                />

                <label>CPF</label>
                <Input
                  type="text"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={formDataPF.cpf}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {activeTab === "Pessoa Jurídica" && (
              <>
                <label>Telefone</label>
                <Input
                  type="text"
                  name="phone_number"
                  placeholder="Digite seu telefone"
                  value={formDataPJ.phone_number}
                  onChange={handleInputChange}
                  required
                />

                <label>CNPJ</label>
                <Input
                  type="text"
                  name="cnpj"
                  placeholder="Digite seu CNPJ"
                  value={formDataPJ.cnpj}
                  onChange={handleInputChange}
                  required
                />

                <label>Senha</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Crie uma senha"
                  value={formDataPJ.password}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            {activeTab === "Colaborador" && (
              <>
                <label>CPF</label>
                <Input
                  type="text"
                  name="cpf"
                  placeholder="Digite seu CPF"
                  value={formDataCL.cpf}
                  onChange={handleInputChange}
                  required
                />

                <label>Senha</label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Crie uma senha"
                  value={formDataCL.password}
                  onChange={handleInputChange}
                  required
                />

                <label>Senha da Companhia</label>
                <Input
                  type="password"
                  name="comp_password"
                  placeholder="Senha da Companhia"
                  value={formDataCL.comp_password}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}

            <RegisterButton type="submit">Registrar</RegisterButton>
          </Form>
        </FormContainer>
      </LeftPanel>

      {windowWidth >= 1000 && <RightPanel style={{ backgroundImage: `url(${backgroundImage})` }} />}
    </RegisterContainer>
  );
};


// 🔹 Estilos
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const RegisterContainer = styled.div`
  margin-top: 90px;
  display: flex;
  height: 100vh;
`;

const BackButtonContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 20px;
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
