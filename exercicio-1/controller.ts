import TripsToSpace from "./types.ts";

// ========================
// Navegação entre views
// ========================
function goTo(view: string): void {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
    document.getElementById('view-' + view)?.classList.add('active');
    document.querySelector(`[data-view="${view}"]`)?.classList.add('active');

    if (view === 'add-member' || view === 'send-mission') {
        populateSelects();
    }
}

document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
        const view = (btn as HTMLElement).dataset['view'];
        if (view) goTo(view);
    });
});

// ========================
// Toast de feedback
// ========================
let toastTimer: ReturnType<typeof setTimeout>;

function showToast(msg: string, type: 'success' | 'error' = 'success'): void {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.className = 'toast ' + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        t.className = 'toast hidden';
    }, 2800);
}

// ========================
// Popula selects de nave
// ========================
function populateSelects(): void {
    const selMember = document.getElementById('f-ship-member') as HTMLSelectElement | null;
    const selMission = document.getElementById('f-ship-mission') as HTMLSelectElement | null;

    const result = TripsToSpace.getAll();

    if (!result.success || !result.data || result.data.length === 0) {
        const empty = '<option disabled selected>Nenhuma nave cadastrada</option>';
        if (selMember) selMember.innerHTML = empty;
        if (selMission) selMission.innerHTML = empty;
        return;
    }

    if (selMember) {
        selMember.innerHTML = result.data.map(s =>
            `<option value="${s.id}">${s.name} (${s.crews.length}/${s.crewLimit} tripulantes)</option>`
        ).join('');
    }

    if (selMission) {
        selMission.innerHTML = result.data.map(s =>
            `<option value="${s.id}">${s.name} — ${s.inMission ? 'Em missão' : 'Disponível'}</option>`
        ).join('');
    }
}

// ========================
// Renderiza lista de naves
// ========================
function renderList(): void {
    const container = document.getElementById('ship-list');
    const badge = document.getElementById('total-badge');

    const result = TripsToSpace.getAll();
    const ships = result.success && result.data ? result.data : [];

    const countResult = TripsToSpace.returnNumberOfShips();
    const count = countResult.success ? countResult.data ?? 0 : 0;

    if (badge) {
        badge.textContent = count + (count === 1 ? ' nave' : ' naves');
    }

    if (!container) return;

    if (ships.length === 0) {
        container.innerHTML = `
            <div class="empty">
                <span>🚀</span>
                Nenhuma nave cadastrada ainda.<br><br>
                <button onclick="goTo('new-ship')" style="margin-top:8px;padding:7px 18px;font-size:13px;border-radius:8px;border:1px solid #ccc;background:#fff;cursor:pointer;">
                    Cadastrar primeira nave
                </button>
            </div>`;
        return;
    }

    container.innerHTML = ships.map(s => {
        const pct = s.crewLimit > 0 ? Math.round((s.crews.length / s.crewLimit) * 100) : 0;
        const minCrew = Math.floor(s.crewLimit / 3);
        const barClass = pct >= 100 ? 'danger' : pct < 40 ? 'warn' : '';

        const crewTags = s.crews.length
            ? s.crews.map(c => `<span class="crew-tag">👤 ${c.name}</span>`).join('')
            : `<span style="font-size:12px;color:#aaa">Sem tripulantes</span>`;

        const statusPill = s.inMission
            ? `<span class="pill pill-mission">🚀 Em missão</span>`
            : `<span class="pill pill-idle">Disponível</span>`;

        const canMission = !s.inMission && s.crews.length >= minCrew;

        return `
            <div class="card">
                <div class="card-header">
                    <div>
                        <div class="card-title">${s.name}</div>
                        <div class="card-sub">Piloto: ${s.pilot}</div>
                    </div>
                    ${statusPill}
                </div>

                <div class="crew-bar">
                    <div class="crew-label">
                        ${s.crews.length} / ${s.crewLimit} tripulantes &nbsp;·&nbsp; mínimo para missão: ${minCrew}
                    </div>
                    <div class="bar-track">
                        <div class="bar-fill ${barClass}" style="width:${pct}%"></div>
                    </div>
                </div>

                <div class="crew-tags">${crewTags}</div>

                <div class="actions">
                    <button onclick="quickAddMember(${s.id})" ${s.crews.length >= s.crewLimit ? 'disabled' : ''}>
                        👤 Adicionar membro
                    </button>
                    <button class="btn-primary" onclick="quickMission(${s.id})" ${!canMission ? 'disabled' : ''}>
                        🚀 Enviar para missão
                    </button>
                </div>
            </div>`;
    }).join('');
}

// Atalhos dos botões do card
function quickAddMember(id: number): void {
    populateSelects();
    const sel = document.getElementById('f-ship-member') as HTMLSelectElement | null;
    if (sel) sel.value = String(id);
    goTo('add-member');
}

function quickMission(id: number): void {
    populateSelects();
    const sel = document.getElementById('f-ship-mission') as HTMLSelectElement | null;
    if (sel) sel.value = String(id);
    goTo('send-mission');
}

// ========================
// Ações dos formulários
// ========================
function submitNewShip(): void {
    const name = (document.getElementById('f-name') as HTMLInputElement)?.value.trim();
    const pilot = (document.getElementById('f-pilot') as HTMLInputElement)?.value.trim();
    const limitRaw = (document.getElementById('f-limit') as HTMLInputElement)?.value;
    const limit = parseInt(limitRaw);

    if (!name || !pilot) return showToast('Nome e piloto são obrigatórios.', 'error');
    if (!limit || limit <= 0) return showToast('Limite deve ser maior que zero.', 'error');

    const result = TripsToSpace.newSpaceShip(name, pilot, limit);

    if (!result.success) {
        return showToast(result.message ?? 'Erro ao cadastrar nave.', 'error');
    }

    (document.getElementById('f-name') as HTMLInputElement).value = '';
    (document.getElementById('f-pilot') as HTMLInputElement).value = '';
    (document.getElementById('f-limit') as HTMLInputElement).value = '';

    showToast(`Nave "${name}" cadastrada com sucesso!`);
    goTo('list');
    renderList();
}

function submitAddMember(): void {
    const sel = document.getElementById('f-ship-member') as HTMLSelectElement | null;
    const id = parseInt(sel?.value ?? '');
    const memberName = (document.getElementById('f-member-name') as HTMLInputElement)?.value.trim();

    if (!memberName) return showToast('Nome do tripulante é obrigatório.', 'error');

    const result = TripsToSpace.addNewMember(id, memberName);

    if (!result.success) {
        return showToast(result.message ?? 'Erro ao adicionar membro.', 'error');
    }

    (document.getElementById('f-member-name') as HTMLInputElement).value = '';

    showToast(result.message ?? 'Membro adicionado com sucesso!');
    goTo('list');
    renderList();
}

function submitSendMission(): void {
    const sel = document.getElementById('f-ship-mission') as HTMLSelectElement | null;
    const id = parseInt(sel?.value ?? '');

    const result = TripsToSpace.sendToTheMission(id);

    if (!result.success) {
        return showToast(result.message ?? 'Erro ao enviar nave.', 'error');
    }

    showToast(result.message ?? 'Nave enviada para missão!');
    goTo('list');
    renderList();
}

// Expõe funções chamadas via onclick no HTML
(window as any).goTo = goTo;
(window as any).quickAddMember = quickAddMember;
(window as any).quickMission = quickMission;
(window as any).submitNewShip = submitNewShip;
(window as any).submitAddMember = submitAddMember;
(window as any).submitSendMission = submitSendMission;

// Inicia
renderList();