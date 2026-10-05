# Anamnese Enfermaria — Obstetrícia

## Cópia de trabalho · Obstetric Studies

Repositório de trabalho: [Bauerfilho/obstetric-studies](https://github.com/Bauerfilho/obstetric-studies).
Importado integralmente de [anamnese-enfermaria-obstetricia](https://github.com/Bauerfilho/anamnese-enfermaria-obstetricia), commit `c629c5aecc0353f03578af57fcc463f2a1a5ff44`.
O commit de importação preserva os 28 arquivos originais; o repositório de origem e seu histórico continuam disponíveis.

Nesta cópia, a conexão com o Supabase original está **desativada**. Questionários, modelos, login original, temas, saída editável e histórico local foram preservados. As descrições de sincronização abaixo documentam o recurso original; ele exige configuração de uma base dedicada antes de ser reativado aqui.

Publicação estática: `node scripts/build-static.mjs` prepara `dist/` com os arquivos públicos. A identidade do Sites fica em `.openai/hosting.json`; não publicar a raiz inteira com documentação e ferramentas.

Verificações locais: `node tools/simulate.js`, `node tools/check-vault.js`, `node tools/check-crypto.js`, `node tools/check-sync.js` e `node tools/check-modelos.js`. `tools/check.js` exige um arquivo interno não versionado; `tools/check-sync-real.js` acessa a base original e não deve ser executado para esta prévia.

Calculadora de uso médico que transforma um questionário em **Anamnese / Evolução de Enfermaria de Obstetrícia**, no formato exato do template da preceptora. Você marca opções e completa campos; o documento é gerado ao vivo, na ordem certa, pronto para copiar.

## Por que existe

Medicina de enfermaria é corrida. Em vez de redigir cada evolução do zero, você toca nas opções (as mais frequentes já vêm destacadas) e o texto sai formatado como a preceptora espera.

## Como usar

1. Abra `index.html` (ou instale como app — é um PWA offline-first).
2. No menu (☰) escolha o bloco: Evolução Puerpério, Pós-Curetagem, Laparotomia, 1ª Consulta, Alta, Atestados.
3. Preencha/marque. O documento aparece à direita (ou abaixo, no celular).
4. **Copiar** → cole no prontuário.

## Decisões de desenho

- **Obstetrícia no topo:** os blocos mais usados no rodízio abrem primeiro.
- **Cores por frequência:** a opção mais comum (ex.: "O Rh+", "nega alergia") aparece em coral; as raras ficam atenuadas. Você acha o comum numa olhada.
- **Gavetas:** campos com muitas alternativas ficam colapsados até você tocar.
- **Defaults fisiológicos pré-marcados:** o documento já nasce ~80% preenchido ("nega", "Bom estado geral…"). Você só ajusta o que difere.
- **Ordem verbatim:** a saída segue o template original, sem resumir nem reordenar.

## Privacidade (LGPD) — leia se for guardar dados de paciente

- **Criptografia no cliente para o sync.** O que sobe pro Supabase vai **cifrado** (AES-GCM) — o servidor nunca vê nome nem texto de paciente em claro. O processamento do documento é 100% no dispositivo.
- **Retenção de 20 dias** local e na nuvem; apagado sozinho.
- **Credenciais do notepad original (LISNET etc.) ficaram de fora** de propósito — este app não carrega nem exibe senhas ou links internos.
- No código só entra a chave **publishable/anon** do Supabase (pública por natureza); a `service_role` e o token de gerenciamento **nunca** vão pro app nem pro repositório.

### Histórico local (aba 🕘)

- O botão **Salvar** guarda o documento num **cofre local** (`localStorage`) **só neste dispositivo**, criado na primeira entrada.
- **Retenção automática: 20 dias.** Tudo que passa de 20 dias é **apagado sozinho** — ao salvar, ao abrir e ao importar.
- **Interconexão por nome:** documentos da mesma paciente (mesmo nome, ignorando acento/caixa) agrupam → histórico completo dos últimos dias dela.
- **Data/hora automática:** o app usa o relógio do sistema — você não precisa informar o dia.

### Botão SYNCH (vermelho, embaixo do documento)

- **Sincroniza o histórico entre os computadores da equipe**, via Supabase.
- **Criptografia no cliente (LGPD):** o nome da paciente e o texto do documento são **cifrados no seu navegador (AES-GCM) ANTES de subir**. O servidor (Supabase) **nunca vê** nome nem texto em claro — só ciphertext ilegível. A chave deriva da própria senha do app.
- Agrupamento por paciente usa um **hash** (sha256 do nome normalizado), nunca o nome em claro.
- **Retenção de 20 dias** também vale na nuvem (a poda é aplicada ao sincronizar).
- **Offline-first:** o `localStorage` continua sendo a fonte imediata. Sem rede, o app funciona e sincroniza quando voltar. Status (online/offline) aparece ao lado do botão.
- **Realtime:** quando outra tela/computador sincroniza, o documento aparece aqui automaticamente.

### Exportar / Importar (painel Histórico 🕘)

- Alternativa **offline**: exporta o cofre como `.json` e importa em outro dispositivo.
- O arquivo exportado **contém dados de paciente** — guarde/apague com responsabilidade.

### Personalizar modelos (⚙)

- A médica **adiciona modelos extras** (ex.: uma evolução que ela usa muito) sem mexer no código: escreve o texto com `{{placeholders}}` e ele vira uma **seção nova no menu lateral**.
- Os **modelos originais da preceptora nunca são alterados** — os extras ficam separados.

## Stack

HTML/CSS/JS vanilla, offline-first, dark/light, estética Apple-like. Tokens semânticos (paleta coral/petróleo/off-white).

## Estrutura

```
index.html
css/style.css
js/templates.js   — modelos verbatim (a Regra Suprema: ordem/campos do template)
js/schema.js      — o questionário (seções, campos, frequências, defaults)
js/vault.js       — cofre local (histórico 20 dias, export/import)
js/crypto.js      — criptografia no cliente (AES-GCM; chave deriva da senha do app)
js/config.js      — config pública do Supabase (SÓ a anon/publishable)
js/sync.js        — sincronização entre computadores (cifrada, offline-first, Realtime)
js/modelos.js     — auto-personalização (modelos extras, sem tocar nos originais)
js/app.js         — motor (renderiza + gera o documento ao vivo)
manifest.webmanifest, sw.js — PWA offline
tools/isana-template.txt — fonte-contrato (referência interna, NÃO versionada)
```
