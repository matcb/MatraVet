# MatraVet

Sistema de gestão pet completo: clínica veterinária, hospital (internação), pet shop e banho & tosa — os 4 módulos no mesmo lugar, com financeiro, estoque, relatórios e CRM inclusos.

O front-end está em `MatraVet_Frontend/` (React + TypeScript + Vite + Tailwind). Para rodar:

```bash
cd MatraVet_Frontend
npm install
npm run dev
```


## COISAS QUE AINDA FALTAM FAZER

1. Portal do tutor (G) — área logada pro tutor ver carteirinha de vacinas, baixar receitas/exames, confirmar consulta e pagar fatura. Eles têm algo parecido, mas amarrado ao ecossistema deles; um portal simples e rápido já ganha.
2. Check-in por QR Code na recepção (P) — tutor escaneia, confirma presença e o status pula pra "Em atendimento" sozinho. SimplesVet não tem.
3. Prontuário com linha do tempo + anexos reais (M) — upload de foto/vídeo/exame no prontuário (hoje é só texto). Com preview e impressão de receita com timbrado da clínica.
4. Assinatura de pacotes recorrentes (M) — banho mensal cobrado no cartão todo mês (tipo Netflix do banho). Eles controlam pacote, mas não cobram recorrente.
5. Telemedicina / retorno por vídeo (G) — link de videochamada dentro do agendamento, com registro no prontuário. Ninguém do mercado BR tem isso redondo.
Clínica (Módulo 1)
6. Protocolos de vacina que agendam sozinhos (M) — ao aplicar a 1ª dose, o sistema já cria as próximas na agenda e manda o WhatsApp. Hoje o radar só mostra.
7. Orçamentos com aprovação no WhatsApp (P) — envia o orçamento, tutor aprova pelo link, vira venda no PDV.
8. Receituário com modelos + assinatura digital (M).
Hospital (Módulo 2)
9. Curva de sinais vitais (M) — gráfico de temp/FC ao longo da internação, com alerta se sair da faixa. É o recurso mais "hospital de verdade" que falta.
10. Prescrições com aprazamento (M) — grade de horários (8h/12h/18h...) com baixa por turno e pendências destacadas na troca de plantão.
11. Termo de internação e autorização com assinatura na tela (P).
Pet Shop (Módulo 3)
12. Cupom fiscal de verdade (NFC-e) (G) — hoje o PDV é simulado; integrar emissor fiscal é o que separa demo de produto.
13. Leitor de código de barras + etiqueta de gôndola (P).
14. Sugestão de compra inteligente (M) — "faltar em X dias pelo giro", que é o marketing nº1 deles; ter igual anula o argumento.
Banho & Tosa (Módulo 4)
15. Foto antes/depois no check-list (P) — usa a câmera do celular, salva no histórico do pet e manda pro tutor. Marketing gratuito pra clínica.
16. Fila com tempo estimado e aviso "seu pet está pronto" (P) — WhatsApp automático quando conclui.
17. Comissão por profissional no fechamento (P) — eles têm, nós ainda não.
Gestão (vale pra tudo)
18. Login com perfis (admin/vet/recepção/banho) (M) — cada um vê só o seu módulo. Pré-requisito pra multiusuário de verdade.
19. Backend + banco de verdade (G) — hoje tudo é mock local e zera no reload. Uma API (Node, Python, o que você preferir) + Postgres transforma em produto.
20. App mobile / PWA instalável (M) — o layout já é responsivo; empacotar como PWA com ícone e splash dá cara de app sem reescrever nada.
21. Lembretes que realmente disparam (M) — conectar WhatsApp API / SMS de verdade nos gatilhos que já existem na tela de Marketing.
22. Importador de planilha (P) — subir tutores/pets/estoque via CSV. É como se conquista cliente que vem de concorrente ou do papel.
