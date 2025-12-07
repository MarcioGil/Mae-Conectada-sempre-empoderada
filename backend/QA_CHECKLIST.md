# Checklist de QA / Testes Pré-Release — Mae-Conecta

- [ ] Testes unitários (cobertura > 60% nos módulos críticos: auth, emergency, docs)
- [ ] Integração de endpoints (login → upload documento → emergency)
- [ ] Testes manuais de fluxo de emergência (com números teste)
- [ ] Auditoria de segurança (OWASP checklist)
- [ ] Auditoria de privacidade (consent flows, delete/export data)
- [ ] Lighthouse PWA (pontuação > 90 em performance / acessibilidade onde possível)
- [ ] Testes de acessibilidade (axe, leitor de tela)
- [ ] Testes de carga para endpoints críticos (emergency queue)

## Como rodar

- Testes unitários: `npx jest --coverage`
- Testes de integração: scripts ou Postman/Insomnia
- Auditoria OWASP: checklist disponível em https://owasp.org/www-project-top-ten/
- Auditoria LGPD: revisar PRIVACY_POLICY.md e fluxos de consentimento
- Lighthouse: rodar no frontend (Chrome DevTools)
- Acessibilidade: `npx axe` ou leitor de tela

---

> Atualize este checklist antes de cada release. QA responsável: Marcio Gil
