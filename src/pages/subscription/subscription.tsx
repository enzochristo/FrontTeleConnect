import { useState, useEffect } from "react";
import styled from "styled-components";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { FaCheck } from "react-icons/fa";
import { WifiHigh, Broadcast, Phone } from "@phosphor-icons/react"; // Ícones do Phosphor

// 🔹 Imagem de sucesso para a confirmação
import SuccessImage from "../../assets/qrcode.png";

// 🔹 Formata número do cartão
const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
};

// 🔹 Formata data de validade
const formatExpiryDate = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{2})/, "$1/$2")
    .slice(0, 5);
};

interface Plan {
  _id: string;
  name: string;
  tipo: "Internet" | "Mobile" | "Fixed";
  price: number;
  vel_max: number;
  vel_min: number;
  benefits?: string;
}

interface AddressData {
  cep: string;
  estado: string;
  cidade: string;
  rua: string;
  numero: string;
}

interface PaymentData {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

export function Subscription(): JSX.Element {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedSpeed, setSelectedSpeed] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);

  const [address, setAddress] = useState<AddressData>({
    cep: "",
    estado: "",
    cidade: "",
    rua: "",
    numero: "",
  });

  const [payment, setPayment] = useState<PaymentData>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [step, setStep] = useState<number>(1);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // 🔹 Busca os planos da API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("http://localhost:8000/manager/get/all/plans", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Erro ao buscar planos");
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Erro ao buscar planos:", error);
      }
    };

    fetchPlans();
  }, []);

  // Postar a compra na API pessoa/fisica/new/purchased/plan
  const postPurchase = async () => {
    try {

      console.log("Enviando compra:", {
        plan_type: selectedPlan?.tipo,
        final_price: finalPrice,
        cep: address.cep,
        estado: address.estado,
        cidade: address.cidade,
        rua: address.rua,
        numero: address.numero,
      });

      const response = await fetch("http://localhost:8000/pessoa/fisica/new/purchased/plan", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan_type: selectedPlan?.tipo,
          final_price: finalPrice,
          cep: address.cep,
          estado: address.estado,
          cidade: address.cidade,
          rua: address.rua,
          numero: address.numero,
        }),
      });

      console.log("Resposta da API:", response)
;

      if (!response.ok) throw new Error("Erro ao postar compra");
      nextStep();
    } catch (error) {
      console.error("Erro ao postar compra:", error);
    }
  };


  // 🔹 Seleciona o plano e define o preço inicial
  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setSelectedSpeed(plan.vel_min);
    setFinalPrice(plan.vel_min * plan.price);
  };

  useEffect(() => {
    if (address.cep.length === 8) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://viacep.com.br/ws/${address.cep}/json/`, {
            method: "GET",
          });

          if (!response.ok) throw new Error("Erro ao buscar endereço");
          const data = await response.json();
          setAddress({
            ...address,
            estado: data.uf,
            cidade: data.localidade,
            rua: data.logradouro,
          });
        } catch (error) {
          console.error("Erro ao buscar endereço:", error);
        }
      };

      fetchAddress();
    }
  }, [address.cep]);

  // 🔹 Atualiza a velocidade e recalcula o preço
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const speed = Number(e.target.value);
    setSelectedSpeed(speed);
    if (selectedPlan) {
      setFinalPrice(speed * selectedPlan.price);
    }
  };

  return (
    <>
      <Header />
      <Container>
        {step === 1 && (
          <Section>
            <h2>Escolha seu Plano</h2>
            <CardsContainerStyles>
              {plans.map((plan) => (
                <Card key={plan._id} onClick={() => handleSelectPlan(plan)} selected={selectedPlan?._id === plan._id}>
                  <Plan>{plan.name}</Plan>
                  <div className="type">
                    <IconContainer>{plan.tipo === "Internet" ? <Broadcast size={50} color="white" /> : <WifiHigh size={50} color="white" />}</IconContainer>
                    <h3>{plan.tipo}</h3>
                  </div>
                  <Divider />
                  <p>A partir de:</p>
                  <Price>R$ {(plan.vel_min * plan.price).toFixed(2)}</Price>
                </Card>
              ))}
            </CardsContainerStyles>
            <SpeedSelection>
              <p>Velocidade Escolhida: <strong>{selectedSpeed} Mbps</strong></p>
              <input
                type="range"
                min={selectedPlan?.vel_min ?? 0}
                max={selectedPlan?.vel_max ?? 100}
                value={selectedSpeed}
                onChange={handleSpeedChange}
              />
              <p><strong>Preço Final:</strong> R$ {finalPrice.toFixed(2)}</p>
            </SpeedSelection>

            <Button onClick={nextStep} disabled={!selectedPlan}>Continuar</Button>
          </Section>
        )}

        {step === 2 && (
          <Section>
            <h2>Endereço</h2>
            <Input type="text" placeholder="CEP" value={address.cep} onChange={(e) => setAddress({ ...address, cep: e.target.value })} />
            <Input type="text" placeholder="Rua" value={address.rua} readOnly />
            <Input type="text" placeholder="Cidade" value={address.cidade} readOnly />
            <Input type="text" placeholder="Estado" value={address.estado} readOnly />
            <Input type="text" placeholder="Número" value={address.numero} onChange={(e) => setAddress({ ...address, numero: e.target.value })} />
            <Button onClick={nextStep}>Continuar</Button>
          </Section>
        )}

        {step === 3 && (
          <Section>
            <h2>Pagamento</h2>
            <Input type="text" placeholder="Número do Cartão" value={payment.cardNumber} onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })} />
            <Input type="text" placeholder="Nome no Cartão" value={payment.cardHolder} onChange={(e) => setPayment({ ...payment, cardHolder: e.target.value })} />
            <Input type="text" placeholder="Data de Validade (MM/YY)" value={payment.expiryDate} onChange={(e) => setPayment({ ...payment, expiryDate: formatExpiryDate(e.target.value) })} />
            <Input type="text" placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({ ...payment, cvv: e.target.value })} />
            <Button onClick={postPurchase}>Finalizar Compra</Button>
          </Section>
        )}

        {step === 4 && (
          <Section>
            <h2>Compra Concluída!</h2>
            <img src={SuccessImage} alt="Sucesso" />
            <Button onClick={() => window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")}>
              Assista nosso vídeo
            </Button>
          </Section>
        )}
      </Container>
      <Footer />
    </>
  );
}



// 🔹 Estilos do Controle Deslizante
const SpeedSelection = styled.div`
  margin-top: 20px;

  input[type="range"] {
    width: 100%;
  }

  color: #210D94;

  input[type="range"]::-webkit-slider-thumb {
    background: #210D94;
  }

  p {
    margin: 5px 0;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-bottom: 1px solid #999999;
  border-radius: 5px;
  font-size: 16px;
  color: #210D94;
`;

const Container = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Section = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  background: rgba(33, 13, 148, 0.1);
  border-radius: 10px;
  padding: 20px;
  width: 50%;

  img {
    width: 200px;
    align-self: center;
  }
`;

const CardsContainerStyles = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;

  .type {
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;

    h3 {
      margin-left: 10px;
      font-size: 24px;
    }
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: linear-gradient(to bottom, #2A1B8F, #0C1A81);
  color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  height: 300px;
  width: 250px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const Plan = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 24px;
`;

const IconContainer = styled.div`
  margin: 10px 0;
`;

const Divider = styled.hr`
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 80%;
  margin: 10px auto;
`;

const Price = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-top: 5px;
`;

const Benefits = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: #ddd;
  font-style: italic;
`;


const Button = styled.button`
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

export default Subscription;
