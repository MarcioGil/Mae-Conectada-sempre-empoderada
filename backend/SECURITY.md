# Política de Segurança — Mae-Conecta

## 1. Princípios
- Segurança por padrão (secure by design)
- Proteção de dados sensíveis (criptografia, acesso restrito)
- Monitoramento e resposta a incidentes

## 2. Práticas adotadas
- Autenticação forte (JWT, refresh tokens, rotacionamento)
- Validação de input (contra XSS, SQLi, CSRF)
- Rate limiting e proteção contra força bruta
- Logs de acesso e auditoria
- Backup e rollback
- Atualização regular de dependências

## 3. Vulnerabilidades e divulgação
- Se encontrar uma vulnerabilidade, envie para: security@seuorg.com
- Seguimos boas práticas OWASP Top 10
- Auditorias periódicas e testes de penetração

## 4. Monitoramento
- Uso de Sentry para erros
- Logs centralizados
- Monitoramento de disponibilidade (Prometheus/Grafana, opcional)

## 5. Responsável
- Security Lead: security@seuorg.com

---

> Para mais detalhes, consulte a documentação técnica e o checklist OWASP.
