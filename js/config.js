/* ============================================================================
   config.js — Configuração pública do sync (Supabase).

   ATENÇÃO: aqui vai SÓ a chave "publishable"/"anon" — que é FEITA para o
   front-end público. A defesa dos dados NÃO é esconder esta chave; é:
     (1) CRIPTOGRAFIA NO CLIENTE (crypto.js): nome e texto sobem cifrados;
     (2) Row Level Security no Supabase;
     (3) retenção de 20 dias (poda).
   NUNCA colocar aqui a service_role nem nenhum segredo. Se esta chave vazar,
   o pior que acontece é alguém ler ciphertext (ilegível) — e ela pode ser
   girada/revogada no painel do Supabase.
   ========================================================================== */

/* Esta cópia usa somente histórico local. Reativar apenas com base dedicada. */
window.SUPABASE_CONFIG = { url: "", anonKey: "" };
