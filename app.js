/**
 * Lógica Interativa da Aplicação
 * Pesquisa: Normativos e padrões de lançamento e reúso de esgotos sanitários tratados
 * Autora: Katryne Karla Dutra Lopes
 * Universidade Federal de Juiz de Fora (UFJF) - Engenharia Sanitária e Ambiental (ESA)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado da Aplicação
  const appState = {
    selectedUF: null, // No primeiro momento: nenhum estado selecionado
    selectedCategory: "lancamento" // 'lancamento' | 'infiltracao' | 'reuso'
  };

  // Elementos do DOM
  const workspaceEl = document.getElementById("workspace");
  const mapTooltipEl = document.getElementById("map-tooltip");
  const searchInputEl = document.getElementById("state-search");
  const infoModalEl = document.getElementById("info-modal");
  const openInfoBtn = document.getElementById("open-info-btn");
  const closeInfoBtn = document.getElementById("close-info-btn");

  // Elementos internos do Painel Direito
  const panelUfBadge = document.getElementById("panel-uf-badge");
  const panelStateTitle = document.getElementById("panel-state-title");
  const panelRegionBadge = document.getElementById("panel-region-badge");
  const closePanelBtn = document.getElementById("close-panel-btn");

  // Abas de Categorias
  const catTabBtns = document.querySelectorAll(".cat-tab-btn");

  // Elementos da Tabela de Análise
  const thStateName = document.getElementById("th-state-name");
  const normStateLink = document.getElementById("norm-state-link");
  const normBrasilLink = document.getElementById("norm-brasil-link");
  const normTableBody = document.getElementById("norm-table-body");

  // Elementos do SINISA (Mostrados ao final do painel)
  const sinisaStateTitle = document.getElementById("sinisa-state-title");
  const ies0001StateLabel = document.getElementById("ies0001-state-label");
  const ies0001StateBar = document.getElementById("ies0001-state-bar");
  const ies0001StateVal = document.getElementById("ies0001-state-val");
  const ies0001BrasilBar = document.getElementById("ies0001-brasil-bar");
  const ies0001BrasilVal = document.getElementById("ies0001-brasil-val");

  const ies2004StateLabel = document.getElementById("ies2004-state-label");
  const ies2004StateBar = document.getElementById("ies2004-state-bar");
  const ies2004StateVal = document.getElementById("ies2004-state-val");
  const ies2004BrasilBar = document.getElementById("ies2004-brasil-bar");
  const ies2004BrasilVal = document.getElementById("ies2004-brasil-val");

  // Renderiza a lista de estados ao fundo separados por região
  renderBottomRegionsList();

  // Inicializa eventos do Mapa SVG
  initSvgMapEvents();

  // Inicializa eventos das Abas de Categorias
  initCategoryTabEvents();

  // Inicializa Busca Rápida
  initSearch();

  // Inicializa Modal de Metodologia
  initModal();

  // Fecha o painel e volta ao mapa geral
  if (closePanelBtn) {
    closePanelBtn.addEventListener("click", () => {
      resetStateSelection();
    });
  }

  /**
   * Eventos nos elementos do Mapa SVG
   */
  function initSvgMapEvents() {
    const stateGroups = document.querySelectorAll(".state-group");

    stateGroups.forEach(group => {
      const uf = group.getAttribute("data-uf");
      const name = group.getAttribute("data-name");
      const region = group.getAttribute("data-region");

      group.addEventListener("mouseenter", (e) => {
        showTooltip(e, uf, name, region);
      });

      group.addEventListener("mousemove", (e) => {
        moveTooltip(e);
      });

      group.addEventListener("mouseleave", () => {
        hideTooltip();
      });

      group.addEventListener("click", () => {
        selectState(uf);
      });

      group.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectState(uf);
        }
      });
    });
  }

  function showTooltip(e, uf, name, region) {
    mapTooltipEl.innerHTML = `<span class="tooltip-uf">${uf}</span> ${name} (${region})`;
    mapTooltipEl.classList.add("visible");
    moveTooltip(e);
  }

  function moveTooltip(e) {
    const mapSection = document.querySelector(".map-section");
    const rect = mapSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mapTooltipEl.style.left = `${x}px`;
    mapTooltipEl.style.top = `${y}px`;
  }

  function hideTooltip() {
    mapTooltipEl.classList.remove("visible");
  }

  /**
   * Renderiza a Lista Minimalista ao Fundo da Tela
   */
  function renderBottomRegionsList() {
    const regionsGridEl = document.getElementById("regions-grid");
    if (!regionsGridEl) return;

    const regionsMap = {
      "Norte": [],
      "Nordeste": [],
      "Centro-Oeste": [],
      "Sudeste": [],
      "Sul": []
    };

    Object.values(STATES_DATABASE).forEach(state => {
      if (regionsMap[state.regiao]) {
        regionsMap[state.regiao].push(state);
      }
    });

    Object.keys(regionsMap).forEach(reg => {
      regionsMap[reg].sort((a, b) => a.nome.localeCompare(b.nome));
    });

    regionsGridEl.innerHTML = "";

    Object.entries(regionsMap).forEach(([regName, states]) => {
      const card = document.createElement("div");
      card.className = "region-card";

      card.innerHTML = `
        <div class="region-card-title">
          <span>Região ${regName}</span>
          <span class="region-count-badge">${states.length}</span>
        </div>
        <div class="states-pills-wrap">
          ${states.map(st => `
            <button type="button" class="state-pill-btn" data-uf="${st.uf}" id="pill-${st.uf}" aria-label="Selecionar ${st.nome}">
              <span class="pill-uf">${st.uf}</span>
              <span class="pill-name">${st.nome}</span>
            </button>
          `).join("")}
        </div>
      `;

      regionsGridEl.appendChild(card);
    });

    // Ouvintes dos botões na lista inferior
    const pillBtns = document.querySelectorAll(".state-pill-btn");
    pillBtns.forEach(btn => {
      const uf = btn.getAttribute("data-uf");

      btn.addEventListener("click", () => {
        selectState(uf);
        workspaceEl.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      btn.addEventListener("mouseenter", () => {
        const svgGroup = document.getElementById(`state-${uf}`);
        if (svgGroup && !svgGroup.classList.contains("active")) {
          svgGroup.querySelector("path")?.setAttribute("style", "fill: #38bdf8 !important");
        }
      });

      btn.addEventListener("mouseleave", () => {
        const svgGroup = document.getElementById(`state-${uf}`);
        if (svgGroup && !svgGroup.classList.contains("active")) {
          svgGroup.querySelector("path")?.removeAttribute("style");
        }
      });
    });
  }

  /**
   * Seleciona um Estado
   */
  function selectState(uf) {
    const stateData = STATES_DATABASE[uf];
    if (!stateData) return;

    appState.selectedUF = uf;

    // Atualiza classes ativas no SVG
    document.querySelectorAll(".state-group").forEach(el => {
      el.classList.remove("active");
      el.querySelector("path")?.removeAttribute("style");
    });
    const targetGroup = document.getElementById(`state-${uf}`);
    if (targetGroup) {
      targetGroup.classList.add("active");
    }

    // Atualiza classes ativas na lista ao fundo
    document.querySelectorAll(".state-pill-btn").forEach(el => el.classList.remove("active"));
    const targetPill = document.getElementById(`pill-${uf}`);
    if (targetPill) {
      targetPill.classList.add("active");
    }

    // Abre o layout com o painel lateral na DIREITA
    workspaceEl.classList.add("has-state-selected");

    // Preenche o cabeçalho do estado
    panelUfBadge.textContent = stateData.uf;
    panelStateTitle.textContent = stateData.nome;
    panelRegionBadge.textContent = `Região ${stateData.regiao}`;

    // Atualiza a tabela com a categoria ativa
    renderCategoryData();

    // Atualiza os dados do SINISA ao final do painel
    renderSinisaCharts(stateData);
  }

  /**
   * Desfaz a seleção e retorna ao Mapa Geral
   */
  function resetStateSelection() {
    appState.selectedUF = null;

    document.querySelectorAll(".state-group").forEach(el => {
      el.classList.remove("active");
      el.querySelector("path")?.removeAttribute("style");
    });
    document.querySelectorAll(".state-pill-btn").forEach(el => el.classList.remove("active"));

    workspaceEl.classList.remove("has-state-selected");
  }

  /**
   * Inicializa as Abas das 3 Opções de Dados
   */
  function initCategoryTabEvents() {
    catTabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        appState.selectedCategory = cat;

        catTabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        renderCategoryData();
      });
    });
  }

  /**
   * Renderiza a Tabela de Dados Perfeitamente Alinhados (Valores Diretos + Unidade)
   */
  function renderCategoryData() {
    if (!appState.selectedUF) return;

    const state = STATES_DATABASE[appState.selectedUF];
    const cat = appState.selectedCategory; // 'lancamento', 'infiltracao' ou 'reuso'

    const stateCatData = state[cat];
    const brasilCatData = BRASIL_DATA[cat];

    if (!stateCatData || !brasilCatData) return;

    // Atualiza títulos das colunas
    thStateName.textContent = state.nome;

    // Atualiza a linha de normativos com links diretos
    normStateLink.textContent = `${stateCatData.norma} [LINK]`;
    normStateLink.href = stateCatData.link || "#";

    normBrasilLink.textContent = `${brasilCatData.norma} [LINK]`;
    normBrasilLink.href = brasilCatData.link || "#";

    // Constrói as linhas dos parâmetros
    normTableBody.innerHTML = "";

    const paramKeys = Object.keys(stateCatData.parametros);

    paramKeys.forEach(paramKey => {
      const meta = PARAM_DEFINITIONS[paramKey] || { sigla: paramKey, nome: paramKey };
      const stateVal = stateCatData.parametros[paramKey] || "-";
      const brasilVal = brasilCatData.parametros[paramKey] || "-";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="td-param" title="${meta.nome || meta.sigla}">
          • ${meta.sigla}
        </td>
        <td class="td-state">${stateVal}</td>
        <td class="td-brasil">${brasilVal}</td>
      `;
      normTableBody.appendChild(tr);
    });
  }

  /**
   * Renderiza os Gráficos Comparativos do SINISA ao Final da Tela
   */
  function renderSinisaCharts(state) {
    const br = BRASIL_DATA.sinisa;
    const st = state.sinisa;

    if (sinisaStateTitle) {
      sinisaStateTitle.textContent = state.nome;
    }

    // IES0001 (Atendimento com Coleta)
    ies0001StateLabel.textContent = state.nome;
    ies0001StateVal.textContent = `${st.ies0001.toFixed(0)}%`;
    ies0001StateBar.style.width = `${Math.min(st.ies0001, 100)}%`;

    ies0001BrasilVal.textContent = `${br.ies0001.toFixed(0)}%`;
    ies0001BrasilBar.style.width = `${Math.min(br.ies0001, 100)}%`;

    // IES2004 (Esgoto Tratado do Coletado)
    ies2004StateLabel.textContent = state.nome;
    ies2004StateVal.textContent = `${st.ies2004.toFixed(0)}%`;
    ies2004StateBar.style.width = `${Math.min(st.ies2004, 100)}%`;

    ies2004BrasilVal.textContent = `${br.ies2004.toFixed(0)}%`;
    ies2004BrasilBar.style.width = `${Math.min(br.ies2004, 100)}%`;
  }

  /**
   * Busca Rápida de Estados
   */
  function initSearch() {
    if (!searchInputEl) return;

    searchInputEl.addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) return;

      const matchedState = Object.values(STATES_DATABASE).find(st =>
        st.uf.toLowerCase() === q ||
        st.nome.toLowerCase().includes(q)
      );

      if (matchedState && q.length >= 2) {
        if (matchedState.uf.toLowerCase() === q || matchedState.nome.toLowerCase() === q) {
          selectState(matchedState.uf);
        }
      }
    });

    searchInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const q = searchInputEl.value.trim().toLowerCase();
        const matchedState = Object.values(STATES_DATABASE).find(st =>
          st.uf.toLowerCase() === q ||
          st.nome.toLowerCase().includes(q)
        );
        if (matchedState) {
          selectState(matchedState.uf);
          searchInputEl.blur();
        }
      }
    });
  }

  /**
   * Modal de Metodologia e Créditos
   */
  function initModal() {
    if (!infoModalEl || !openInfoBtn || !closeInfoBtn) return;

    openInfoBtn.addEventListener("click", () => {
      infoModalEl.classList.add("open");
    });

    closeInfoBtn.addEventListener("click", () => {
      infoModalEl.classList.remove("open");
    });

    infoModalEl.addEventListener("click", (e) => {
      if (e.target === infoModalEl) {
        infoModalEl.classList.remove("open");
      }
    });
  }
});
