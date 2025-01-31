import { useState } from "react";
import styled from "styled-components";

export function CreatePlan(): JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    tipo: "",
    vel_max: "",
    vel_min: "",
    price: "",
    benefits: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Atualiza os campos do formulário dinamicamente
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Envio do formulário para API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Convertendo valores para os tipos corretos antes do envio
    const payload = {
      name: formData.name,
      tipo: formData.tipo,
      vel_max: formData.vel_max ? parseInt(formData.vel_max) : null,
      vel_min: formData.vel_min ? parseInt(formData.vel_min) : null,
      price: parseFloat(formData.price),
      benefits: formData.benefits || null,
    };

    try {
      const response = await fetch("http://localhost:8000/manager/post/plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Envia cookies para autenticação
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Plano criado com sucesso!");
        setFormData({ name: "", tipo: "", vel_max: "", vel_min: "", price: "", benefits: "" });
      } else {
        setError("Erro ao criar o plano. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <h2>Criar Novo Plano</h2>

      <label>Nome do Plano</label>
      <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required />

      <label>Tipo</label>
      <Select name="tipo" value={formData.tipo} onChange={handleInputChange} required>
        <option value="">Selecione</option>
        <option value="Internet">Internet</option>
        <option value="Mobile">Móvel</option>
        <option value="Fixed">Fixo</option>
      </Select>

      <label>Velocidade Máxima (Mbps)</label>
      <Input type="number" name="vel_max" value={formData.vel_max} onChange={handleInputChange} />

      <label>Velocidade Mínima (Mbps)</label>
      <Input type="number" name="vel_min" value={formData.vel_min} onChange={handleInputChange} />

      <label>Preço (R$)</label>
      <Input type="number" name="price" value={formData.price} onChange={handleInputChange} required />

      <label>Benefícios (opcional)</label>
      <Input type="text" name="benefits" value={formData.benefits} onChange={handleInputChange} />

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Criando..." : "Criar Plano"}
      </SubmitButton>
    </FormContainer>
  );
}

// 🔹 Estilos
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 500px;
  background: #f9f9f9;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const SubmitButton = styled.button`
  background: #210D94;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background: #2A1B8F;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  font-weight: bold;
`;

