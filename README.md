# Aure Agency — Landing page

Landing page one-page em **HTML, CSS e JavaScript** para a agência de marketing Aure Agency. Direção visual ousada e sofisticada, com roxo/lilás inspirados no portfólio original. Desenvolvida para apresentar serviços e iniciar conversas comerciais com marcas e influenciadores.

## Abrir e publicar

1. Abra `index.html` diretamente no navegador para explorar o site, ou rode um servidor local simples: `python -m http.server 5500` e visite `http://localhost:5500`.
2. Para publicar, envie todos os arquivos e a pasta `assets/` para a pasta pública de sua hospedagem estática (por exemplo, `public_html` na Hostinger, ou um repositório no GitHub conectado à Netlify/Cloudflare Pages/Vercel).
3. Depois de apontar o domínio, configure as variáveis em `config.js`, atualize os metadados sociais em `index.html` e revise os dados comerciais.

**Não é necessário React nem compilação**: o projeto funciona com HTML, CSS e JavaScript puro, sem dependências de build. Fontes são carregadas via Google Fonts e possuem fallback local.

## Contatos e envio de leads

Edite `config.js`:

```js
window.AURE_CONFIG = {
  whatsappNumber: "", // DDI + DDD + número, apenas dígitos (ex.: 55...)
  formEndpoint: "",    // Endpoint de formulário configurado e confirmado
  contactEmail: "aureagencymkt@gmail.com",
  instagramUrl: "https://www.instagram.com/aureagencyy/"
};
```

**WhatsApp:** enquanto o número comercial estiver vazio, os botões de WhatsApp são ocultados. Após configurar o número real, aparecem automaticamente o link direto e o envio do briefing pelo WhatsApp. Não adicione sinais `+`, espaços ou traços.

**Formulário (estado inicial):** funciona como um gerador de mensagem de e-mail: valida os campos, preenche o assunto e o corpo, e solicita a abertura do aplicativo de e-mail do visitante. **Ele não envia dados sozinho** — o visitante precisa confirmar o envio no aplicativo. Este é um fallback temporário, não a melhor configuração para captação de leads em produção.

**Formulário pronto para enviar sem backend próprio:** crie um formulário em [Formspree](https://formspree.io/) ou ative o serviço [FormSubmit](https://formsubmit.co/), confirme seu e-mail e cole o endpoint HTTPS fornecido em `formEndpoint`. O script passa a enviar os campos via `fetch`, exibir sucesso/erro e limpar o formulário após sucesso. Teste **no domínio publicado** antes de divulgar: limites, verificação, antispam e permissões de CORS dependem do fornecedor. Configure também notificações para que a Aure receba e responda os leads.

> Ao escolher um serviço de formulários, atualize `privacidade.html` com a identidade do operador, transferência/compartilhamento de dados e prazos reais aplicáveis. Não publique formulário de captação sem revisar o aviso de privacidade.

## Editar conteúdo

- **`index.html`** — textos, seções, serviços, soluções, FAQ, links e formulário.
- **`styles.css`** — identidade visual, layout, responsividade, efeitos.
- **`script.js`** — menu mobile, animações, validação, envio e links de contato.
- **`config.js`** — dados comerciais e forma de envio de leads.
- **`privacidade.html`** — aviso inicial de privacidade; revisar antes da publicação.
- **`assets/`** — recortes do portfólio fornecido, fotografia do material e favicon tipográfico criado para este projeto.

## Conteúdo provisório que deve ser validado

- **Logo:** foi criado um *wordmark* tipográfico `aure.` e um favicon provisório. Substitua pelo logotipo oficial quando estiver disponível.
- **Planos:** Essential, Intermediário, Gold e Influencer estão sem preço. As vantagens são **frentes possíveis**, não entregas contratuais; confirmar escopo, nomes e frequência com a agência. O PDF original tem versões divergentes.
- **Serviços avulsos:** citados como exemplos, sem preços; confirmar lista final.
- **Portfólio:** os recortes vêm das páginas do PDF fornecido. Confirmar créditos, consentimentos e direitos de divulgação, assim como quais projetos podem ser apresentados publicamente.
- **Provas sociais:** sem depoimentos, percentuais ou resultados inventados. Incluir somente depois que houver autorização e dados verificáveis.
- **Número de WhatsApp e endpoint de captação:** ainda não foram informados, por isso não estão ativados na versão entregue.
- **Identificação da empresa e política de privacidade:** confirmar denominação jurídica, dados de contato adicionais, retenção de dados e prestadores contratados.

## Seções incluídas

Hero com CTA, apresentação da agência, seis frentes de serviços, portfólio do PDF, processo criativo, quatro opções comerciais sem preços, serviços avulsos, FAQ, formulário de contato e rodapé.

## SEO, performance e acessibilidade

- HTML semântico, metatags de descrição e Open Graph, favicon SVG e uma hierarquia consistente de headings.
- Imagens locais otimizadas em WebP e carregamento preguiçoso no portfólio.
- Layout responsivo com menu móvel, foco visível, atalhos de acessibilidade, rótulos no formulário e `prefers-reduced-motion`.
- Sem pixels de anúncios ou analytics instalados por padrão.
- Antes de compartilhar o site nas redes sociais, troque a metatag `og:image` por uma **URL absoluta** HTTPS de uma imagem promocional final (ideal 1200 × 630) e configure uma URL canônica quando souber o domínio.

## Checklist de lançamento

- [ ] Confirmar textos comerciais e escopo dos planos
- [ ] Adicionar número real de WhatsApp
- [ ] Configurar e testar serviço real de formulários
- [ ] Validar/atualizar aviso de privacidade
- [ ] Validar propriedade de imagens, fotos e autorização dos clientes
- [ ] Substituir logo tipográfico pelo arquivo oficial
- [ ] Revisar Instagram e e-mail comercial
- [ ] Ajustar domínio, SEO e compartilhamento social
- [ ] Testar a experiência mobile e os leads no domínio final

---

*Conteúdo comercial elaborado com base no portfólio enviado pelo cliente; propostas e afirmações foram mantidas sem preços definitivos ou resultados fictícios.*
