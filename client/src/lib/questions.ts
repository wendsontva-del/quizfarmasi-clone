// Direção visual: flat playful edtech fiel ao site de referência; dados separados da apresentação para tornar o motor testável.
export type Question = {
  prompt: string;
  options: string[];
  correctIndex: number;
};

export const questions: Question[] = [
  {
    prompt: "Qual a inteligência artificial da líder digital, que ajuda os novos cadastrados?",
    options: ["Íris", "Alexa", "Lana", "Siri"],
    correctIndex: 2,
  },
  {
    prompt: "A sede principal e o complexo de fábrica da Farmasi fica em qual país?",
    options: ["Alemanha", "Turquia", "Brasil", "Estados Unidos"],
    correctIndex: 1,
  },
  {
    prompt: "Como funciona o modelo de negócio da Farmasi?",
    options: ["Ponto de apoio", "Franquia", "Marketing de relacionamento", "Dropshipping"],
    correctIndex: 2,
  },
  {
    prompt: "Qual é o principal benefício de ser uma líder digital Farmasi?",
    options: ["Vender apenas em lojas físicas", "Ter flexibilidade para empreender", "Receber produtos de graça", "Trabalhar somente em horário comercial"],
    correctIndex: 1,
  },
  {
    prompt: "Qual canal ajuda a líder digital a compartilhar os produtos Farmasi?",
    options: ["Catálogo digital", "Somente televisão", "Correio tradicional", "Nenhum canal online"],
    correctIndex: 0,
  },
  {
    prompt: "O que a Farmasi oferece para apoiar o desenvolvimento das líderes?",
    options: ["Treinamentos e ferramentas", "Apenas descontos", "Somente anúncios impressos", "Nenhum suporte"],
    correctIndex: 0,
  },
  {
    prompt: "Qual é uma forma de começar a construir sua rede na Farmasi?",
    options: ["Compartilhar a oportunidade", "Evitar falar com clientes", "Não usar redes sociais", "Esperar uma loja abrir"],
    correctIndex: 0,
  },
];
