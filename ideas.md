# Direção visual — Quiz Farmasi

## Referência de ground truth

Este projeto reproduz como especificação visual o site público `https://quizfarmasi-hfpumkke.manus.space/`. A referência observada usa fundo azul royal, coluna central de quiz, cartões vermelhos com bordas brancas, progresso segmentado, alternativas numeradas e feedback de resposta em verde, laranja e roxo. A fidelidade ao comportamento observado prevalece sobre qualquer redesign.

## Decisões de estilo

**Movimento visual:** flat playful edtech com inspiração em interfaces de jogos de perguntas dos anos 2000, reduzido a formas geométricas, contraste alto e feedback imediato.

**Princípios:** manter o azul como campo contínuo; usar cartões sólidos com bordas brancas e sombras discretas; reservar cores semânticas para o feedback; preservar a coluna estreita e a hierarquia vertical do original.

**Filosofia de cor:** o azul royal cria uma tela energética e reconhecível; o vermelho dá urgência às perguntas e opções; branco garante legibilidade; verde confirma acerto; laranja identifica a opção escolhida; roxo desativa visualmente as alternativas restantes.

**Paradigma de layout:** uma coluna central fixa e responsiva, com controles utilitários presos às bordas da viewport. O conteúdo cresce verticalmente conforme o feedback aparece, sem introduzir navegação ou painéis ausentes da referência.

**Elementos de assinatura:** progresso em sete cápsulas, cartões com outline branco espesso e círculos numerados, controle de música circular no canto superior direito e selo de atribuição no canto inferior direito.

**Interação:** toda ação deve produzir confirmação imediata. Após a escolha, as alternativas ficam bloqueadas, o correto é revelado e o botão de avanço surge; não haverá avanço automático.

**Animação:** transições curtas de opacidade, cor e escala, sem deslocamentos excessivos. A entrada do botão Próxima pode usar um pequeno fade/scale a partir de 0.95. Respeitar `prefers-reduced-motion`.

**Tipografia:** usar uma sans-serif legível para interface e peso forte/itálico para a pergunta, aproximando a aparência observada sem depender de uma única fonte genérica. A hierarquia é: contador pequeno e semibold; pergunta em negrito itálico; alternativas em peso regular; botão em semibold.

**Essência da marca:** um quiz rápido e visual para ensinar o básico da Farmasi a novos cadastrados, com feedback colorido e música opcional. Personalidade: direto, energético e didático.

**Voz:** perguntas objetivas e microcopy curta. Exemplos: `Questão 1 de 7`; `Próxima →`.

**Marca:** usar o símbolo abstrato gerado para favicon e, quando houver espaço equivalente no fluxo final, como marca auxiliar; não inserir um logotipo textual inexistente na referência.

**Cor proprietária:** azul royal `#2864E8`, usado como a superfície principal do aplicativo.

## Assets gerados

- `/manus-storage/quizfarmasi-mark_936358a2.png`: símbolo original sem texto, para favicon e fallback de marca.
- `/manus-storage/quizfarmasi-blue-texture_deae1a30.png`: textura opcional de baixíssimo contraste, somente se não reduzir a fidelidade do campo azul.
- `/manus-storage/quizfarmasi-finish-confetti_f201e3f6.png`: ilustração original para uma tela de resultado apenas se a auditoria confirmar elemento equivalente; caso contrário, não será inserida.
