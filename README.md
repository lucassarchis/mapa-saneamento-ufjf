# 🗺️ Mapa Interativo: Normativos e Padrões de Lançamento e Reúso de Esgotos Sanitários Tratados

Projeto acadêmico e técnico desenvolvido com foco na visualização, democratização e comparação dos normativos ambientais estaduais e federais de efluentes tratados no Brasil, aliado aos índices oficiais do **SINISA (Sistema Nacional de Informações sobre Saneamento)**.

* **Pesquisadora / Autora:** Katryne Karla Dutra Lopes
* **Instituição:** Universidade Federal de Juiz de Fora (UFJF)
* **Faculdade:** Faculdade de Engenharia
* **Departamento:** Engenharia Sanitária e Ambiental (ESA)

---

## 🌟 Estrutura e Funcionalidades Atualizadas

1. **Header Compacto e Símbolos Oficiais:**
   * Cabeçalho de baixa estatura (apenas ~48px de altura), discreto e profissional.
   * Utiliza os **símbolos oficiais exatos** da **UFJF** (emblema estilizado com os telhados vermelho e cinza e tipografia serifada "ufjf") e da **Engenharia Sanitária e Ambiental (ESA - UFJF)** (engrenagem azul com os caracteres "E S A" e a gota d'água ambiental).
   * Títulos alinhados: *Mapa Interativo*, *Normativos e padrões de lançamento e reúso de esgotos sanitários tratados* e o nome da autora *Katryne Karla Dutra Lopes*.

2. **Visão Inicial e Cores Neutras do Mapa:**
   * No primeiro momento, o site apresenta centralizado o **Mapa do Brasil interativo** com todas as 27 Unidades da Federação.
   * As cores do mapa seguem uma paleta neutra suave (*slate* / cinza elegante com bordas brancas e siglas nítidas), sem cores chamativas.

3. **Painel de Dados Posicionado na DIREITA:**
   * Ao clicar em qualquer estado no mapa (ou selecioná-lo na lista inferior), a tela se divide de forma limpa:
     * **Esquerda:** Mapa do Brasil com o estado ativo destacado.
     * **Direita:** Painel comparativo de normativos e indicadores.

4. **Tabela de Análise Comparativa Direta (Valores + Unidades Alinhados):**
   * **Escolha entre as 3 Categorias de Análise:**
     1. 💧 **Lançamento em corpos hídricos superficiais**
     2. 🌱 **Infiltração no solo e recarga de águas subterrâneas**
     3. 🔄 **Atividades de reúso não potável**
   * **Tabela Perfeitamente Alinhada (Estado vs. Brasil):**
     * Linha de normativos com links diretos: ex. `DN COPAM/CERH 08/2022 [LINK]` vs. `Conama 430/2011 [LINK]`.
     * Parâmetros com valores numéricos diretos e unidades de medida padronizadas:
       * **SST:** `≤ 100 mg/L` vs. `Padrão da classe`
       * **Ssed:** `< 1,0 mL/L` vs. `< 1,0 mL/L`
       * **DQO:** `≤ 180 mg/L` vs. `-`
       * **DBO:** `≤ 60 mg/L` vs. `≤ 120 mg/L`
       * **N-NH₄⁺:** `≤ 20 mg/L` vs. `≤ 20 mg/L`
       * **P total:** `≤ 3,0 mg/L` vs. `Padrão da classe`
       * **Coliformes / E. coli:** `< 1.000 UFC/100 mL` vs. `Padrão da classe`
       *(Ou Turbidez, DQO, DBO, Coliformes, Helmintos e Cloro Residual para Reúso).*

5. **Índices de Esgotamento Sanitário (SINISA) Mostrados ao Final:**
   * Posicionados logo abaixo da tabela de categorias, no final do painel direito:
     * **Atendimento da população total com rede coletora de esgoto (IES0001):** Comparativo em barra gráfica e valor percentual direto do Estado vs. Brasil (ex: MG 80% vs. Brasil 56%).
     * **Esgoto tratado referido ao esgoto coletado (IES2004):** Comparativo em barra gráfica e valor percentual direto do Estado vs. Brasil (ex: MG 80% vs. Brasil 81%).

6. **Lista Minimalista de Estados ao Fundo da Tela:**
   * Posicionada no rodapé da página, organizada pelas 5 regiões do IBGE (**Norte, Nordeste, Centro-Oeste, Sudeste e Sul**).
   * Permite selecionar qualquer estado por botão/chip com sigla e nome.

---

## 🚀 Como Executar Localmente

### Opção 1: Clique Duplo Rápido (Mais Fácil)
* Dê um clique duplo no arquivo **`iniciar-site.bat`**.
* O site será aberto automaticamente no seu navegador padrão.

### Opção 2: Servidor Local via PowerShell
```powershell
powershell -ExecutionPolicy Bypass -File .\iniciar-servidor.ps1
```
O servidor iniciará em `http://localhost:8080/`.

---

## 📂 Arquivos do Projeto

```text
Katryne/
│
├── index.html            # Estrutura HTML5 com header compacto, mapa SVG e painel à direita
├── styles.css            # Folha de estilos responsiva, tabela alinhada e mapa neutro
├── data.js               # Banco de dados com valores diretos + unidades de todos os 27 estados
├── app.js                # Lógica de seleção, alternância de categorias e gráficos do SINISA
├── logo-ufjf-transp.png  # Logo oficial da UFJF com transparência
├── logo-esa-transp.png   # Logo oficial do Depto. de Eng. Sanitária e Ambiental (ESA)
├── iniciar-site.bat      # Atalho Windows para abrir o site no navegador
├── iniciar-servidor.ps1  # Servidor web local portátil
└── README.md             # Documentação técnica e metodologia
```
