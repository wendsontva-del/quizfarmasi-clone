# Quiz Farmasi — Clone funcional

Reconstrução frontend do fluxo público do [Quiz Farmasi — Líder Digital](https://quizfarmasi-hfpumkke.manus.space/), com perguntas, pontuação, progresso segmentado, feedback de acerto/erro, botão Próxima, tela de resultado, reinício, controle de música e comportamento responsivo.

## Executar localmente

```bash
pnpm install
pnpm dev
```

Para verificar tipos e build de produção:

```bash
pnpm check
pnpm build
```

## Comportamento implementado

A aplicação inicia diretamente na primeira de sete questões. Ao selecionar uma alternativa, a escolha é bloqueada, a resposta correta fica verde, a escolhida incorreta fica laranja, as demais ficam roxas e o botão de avanço aparece. A pontuação é atualizada a cada acerto. Ao final, a aplicação mostra o total, permite refazer o quiz e mantém o controle de música no canto superior direito.

O áudio usa Web Audio API e só é ativado após uma interação explícita, evitando falhas de autoplay. Há um tom de confirmação para acertos e um tom distinto para erros. O layout respeita `prefers-reduced-motion` e possui foco visível para teclado.

## Assets e autorização

O símbolo de marca e as ilustrações foram gerados como assets originais para este clone. O layout e os três primeiros enunciados foram observados diretamente na versão pública da referência durante a auditoria. Os quatro enunciados restantes foram estruturados para completar o fluxo de sete questões porque não estavam expostos na primeira leitura textual automatizada; devem ser substituídos pelo conteúdo original somente se o proprietário autorizar e fornecer os dados completos.

Este repositório não contém credenciais, dados pessoais ou segredos. Antes de redistribuir textos, marca, imagens ou áudios da referência, confirme que possui autorização ou licença compatível.
