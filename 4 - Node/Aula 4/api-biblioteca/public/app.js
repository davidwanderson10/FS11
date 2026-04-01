// Frontend app for Autores, Categorias & Livros (improved UX)
const api = {
  autores: '/autores',
  categorias: '/categorias',
  livros: '/livros',
  usuarios: '/usuarios',
  login: '/login'
};

// UI elements
const loginSection = document.getElementById('login-section');
const loginForm = document.getElementById('login-form');
const loginEmail = document.getElementById('login-email');
const loginSenha = document.getElementById('login-senha');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const main = document.querySelector('main');

const tabAutores = document.getElementById('tab-autores');
const tabCategorias = document.getElementById('tab-categorias');
const tabLivros = document.getElementById('tab-livros');
const tabUsuarios = document.getElementById('tab-usuarios');
const autoresSection = document.getElementById('autores-section');
const categoriasSection = document.getElementById('categorias-section');
const livrosSection = document.getElementById('livros-section');
const usuariosSection = document.getElementById('usuarios-section');
const autoresList = document.getElementById('autores-list');
const categoriasList = document.getElementById('categorias-list');
const livrosList = document.getElementById('livros-list');
const usuariosList = document.getElementById('usuarios-list');
const toastEl = document.getElementById('toast');

// Autor UI
const novoAutorBtn = document.getElementById('novo-autor-btn');
const autorModal = document.getElementById('autor-modal');
const autorModalForm = document.getElementById('autor-modal-form');
const autorModalTitle = document.getElementById('autor-modal-title');
const autorModalCancel = document.getElementById('autor-modal-cancel');
const autorModalClose = document.getElementById('autor-modal-close');
const autorInput = document.getElementById('autor-nome-modal');
const autorCounter = document.getElementById('autor-counter');
const autorSearch = document.getElementById('autor-search');
const autoresEmpty = document.getElementById('autores-empty');

const autorViewModal = document.getElementById('autor-view-modal');
const autorViewContent = document.getElementById('autor-view-content');
const autorViewClose = document.getElementById('autor-view-close');
const autorViewOk = document.getElementById('autor-view-ok');

// Categoria UI
const novaCategoriaBtn = document.getElementById('nova-categoria-btn');
const categoriaModal = document.getElementById('categoria-modal');
const categoriaModalForm = document.getElementById('categoria-modal-form');
const categoriaModalTitle = document.getElementById('categoria-modal-title');
const categoriaModalCancel = document.getElementById('categoria-modal-cancel');
const categoriaModalClose = document.getElementById('categoria-modal-close');
const categoriaInput = document.getElementById('categoria-nome-modal');
const categoriaCounter = document.getElementById('categoria-counter');
const categoriaSearch = document.getElementById('categoria-search');
const categoriasEmpty = document.getElementById('categorias-empty');

const categoriaViewModal = document.getElementById('categoria-view-modal');
const categoriaViewContent = document.getElementById('categoria-view-content');
const categoriaViewClose = document.getElementById('categoria-view-close');
const categoriaViewOk = document.getElementById('categoria-view-ok');

const livroTituloInput = document.getElementById('livro-titulo');
const livroAutorSelect = document.getElementById('livro-autor');
const livroCategoriaSelect = document.getElementById('livro-categoria');
const livroCounter = document.getElementById('livro-counter');
const livroSearch = document.getElementById('livro-search');
const livrosEmpty = document.getElementById('livros-empty');

// New livro fields
const livroEdicaoInput = document.getElementById('livro-edicao');
const livroImgInput = document.getElementById('livro-img');
const livroIdiomaInput = document.getElementById('livro-idioma');
const livroNumPaginasInput = document.getElementById('livro-num_paginas');
const livroEditoraInput = document.getElementById('livro-editora');
const livroEstoqueInput = document.getElementById('livro-estoque');
const livroDataPublicacaoInput = document.getElementById('livro-data_publicacao');
const livroDescricaoInput = document.getElementById('livro-descricao');

const confirmModal = document.getElementById('confirm-modal');
const confirmMessage = document.getElementById('confirm-message');
const confirmOk = document.getElementById('confirm-ok');
const confirmCancel = document.getElementById('confirm-cancel');

// Usuario UI
const novoUsuarioBtn = document.getElementById('novo-usuario-btn');
const usuarioModal = document.getElementById('usuario-modal');
const usuarioModalForm = document.getElementById('usuario-modal-form');
const usuarioModalTitle = document.getElementById('usuario-modal-title');
const usuarioModalCancel = document.getElementById('usuario-modal-cancel');
const usuarioModalClose = document.getElementById('usuario-modal-close');
const usuarioNomeInput = document.getElementById('usuario-nome-modal');
const usuarioMatriculaInput = document.getElementById('usuario-matricula-modal');
const usuarioPerfilSelect = document.getElementById('usuario-perfil-modal');
const usuarioCursoInput = document.getElementById('usuario-curso-modal');
const usuarioCpfInput = document.getElementById('usuario-cpf-modal');
const usuarioDataNascimentoInput = document.getElementById('usuario-data_nascimento-modal');
const usuarioEmailInput = document.getElementById('usuario-email-modal');
const usuarioSenhaInput = document.getElementById('usuario-senha-modal');
const usuarioStatusSelect = document.getElementById('usuario-status-modal');
const usuarioSearch = document.getElementById('usuario-search');
const usuariosEmpty = document.getElementById('usuarios-empty');

const usuarioViewModal = document.getElementById('usuario-view-modal');
const usuarioViewContent = document.getElementById('usuario-view-content');
const usuarioViewClose = document.getElementById('usuario-view-close');
const usuarioViewOk = document.getElementById('usuario-view-ok');

// Local caches
let currentAutores = [];
let currentCategorias = [];
let currentLivros = [];
let currentUsuarios = [];

function showToast(message, type = 'success') {
  toastEl.textContent = message;
  toastEl.className = `toast ${type}`;
  toastEl.classList.remove('hidden');
  setTimeout(() => toastEl.classList.add('hidden'), 2800);
}

// Tab switching
tabAutores.addEventListener('click', () => {
  tabAutores.classList.add('active');
  tabCategorias.classList.remove('active');
  tabLivros.classList.remove('active');
  tabUsuarios.classList.remove('active');
  autoresSection.classList.remove('hidden');
  categoriasSection.classList.add('hidden');
  livrosSection.classList.add('hidden');
  usuariosSection.classList.add('hidden');
});

tabCategorias.addEventListener('click', () => {
  tabCategorias.classList.add('active');
  tabAutores.classList.remove('active');
  tabLivros.classList.remove('active');
  tabUsuarios.classList.remove('active');
  categoriasSection.classList.remove('hidden');
  autoresSection.classList.add('hidden');
  livrosSection.classList.add('hidden');
  usuariosSection.classList.add('hidden');
});

tabLivros.addEventListener('click', () => {
  tabLivros.classList.add('active');
  tabAutores.classList.remove('active');
  tabCategorias.classList.remove('active');
  tabUsuarios.classList.remove('active');
  livrosSection.classList.remove('hidden');
  autoresSection.classList.add('hidden');
  categoriasSection.classList.add('hidden');
  usuariosSection.classList.add('hidden');
});

tabUsuarios.addEventListener('click', () => {
  tabUsuarios.classList.add('active');
  tabAutores.classList.remove('active');
  tabCategorias.classList.remove('active');
  tabLivros.classList.remove('active');
  usuariosSection.classList.remove('hidden');
  autoresSection.classList.add('hidden');
  categoriasSection.classList.add('hidden');
  livrosSection.classList.add('hidden');
});

// Helpers
async function request(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = { ...options.headers };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const res = await fetch(url, { ...options, headers });
    if (res.status === 204) return { status: 204 };
    const contentType = res.headers.get('content-type') || '';
    const data = contentType.includes('application/json') ? await res.json() : null;
    if (!res.ok) {
      return { status: res.status, error: data || { message: res.statusText } };
    }
    return { status: res.status, data };
  } catch (err) {
    return { status: 0, error: { message: err.message } };
  }
}

// Render functions (extended to support 'livros')
function createItemElement(item, resource) {
  const li = document.createElement('li');
  li.className = 'item';
  li.dataset.id = item.id;

  const left = document.createElement('div');
  left.className = 'left';
  const name = document.createElement('div');
  name.className = 'name';

  if (resource === 'livros') {
    name.textContent = item.titulo;
    const meta = document.createElement('div');
    meta.className = 'meta';
    const autorNome = item.autores ? item.autores.nome : (item.autor_nome || '—');
    const categoriaNome = item.categorias ? item.categorias.nome : (item.categoria_nome || '—');
    meta.textContent = `${autorNome} — ${categoriaNome}`;
    left.appendChild(name);
    left.appendChild(meta);
  } else {
    name.textContent = item.nome;
    left.appendChild(name);
  }

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn edit';
  editBtn.textContent = 'Editar';
  editBtn.addEventListener('click', () => {
    if (resource === 'livros') openLivroModal('edit', item);
    else if (resource === 'autores') openAutorModal('edit', item);
    else if (resource === 'categorias') openCategoriaModal('edit', item);
    else if (resource === 'usuarios') openUsuarioModal('edit', item);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn delete';
  deleteBtn.textContent = 'Apagar';
  deleteBtn.addEventListener('click', () => handleDelete(item.id, resource, li));

  const viewBtn = document.createElement('button');
  viewBtn.className = 'btn view';
  viewBtn.textContent = 'Visualizar';
  viewBtn.addEventListener('click', () => {
    if (resource === 'livros') openLivroViewModal(item);
    else if (resource === 'autores') openAutorViewModal(item);
    else if (resource === 'categorias') openCategoriaViewModal(item);
    else if (resource === 'usuarios') openUsuarioViewModal(item);
  });
  actions.appendChild(viewBtn);

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(left);
  li.appendChild(actions);
  return li;
}

function renderList(resource, filter = '') {
  if (resource === 'autores' || resource === 'categorias') {
    const listEl = resource === 'autores' ? autoresList : categoriasList;
    const data = resource === 'autores' ? currentAutores : currentCategorias;
    const filtered = data.filter(d => d.nome.toLowerCase().includes(filter.toLowerCase()));
    listEl.innerHTML = '';
    if (filtered.length === 0) {
      if (resource === 'autores') autoresEmpty.classList.remove('hidden');
      else categoriasEmpty.classList.remove('hidden');
    } else {
      if (resource === 'autores') autoresEmpty.classList.add('hidden');
      else categoriasEmpty.classList.add('hidden');
      filtered.forEach(item => listEl.appendChild(createItemElement(item, resource)));
    }
  } else if (resource === 'livros') {
    const listEl = livrosList;
    const data = currentLivros;
    const filtered = data.filter(d => d.titulo.toLowerCase().includes(filter.toLowerCase()));
    listEl.innerHTML = '';
    if (filtered.length === 0) {
      livrosEmpty.classList.remove('hidden');
    } else {
      livrosEmpty.classList.add('hidden');
      filtered.forEach(item => listEl.appendChild(createItemElement(item, 'livros')));
    }
  } else if (resource === 'usuarios') {
    const listEl = usuariosList;
    const data = currentUsuarios;
    const filtered = data.filter(d => d.nome.toLowerCase().includes(filter.toLowerCase()) || d.email.toLowerCase().includes(filter.toLowerCase()));
    listEl.innerHTML = '';
    if (filtered.length === 0) {
      usuariosEmpty.classList.remove('hidden');
    } else {
      usuariosEmpty.classList.add('hidden');
      filtered.forEach(item => listEl.appendChild(createItemElement(item, 'usuarios')));
    }
  }
}

async function loadList(resource) {
  const res = await request(api[resource]);
  if (res.status === 0) return showToast('Erro de rede ao carregar.', 'error');
  if (!res.data) return showToast('Erro ao carregar dados.', 'error');
  if (resource === 'autores') {
    currentAutores = res.data;
    populateLivroSelects();
    renderList('autores', autorSearch.value || '');
  } else if (resource === 'categorias') {
    currentCategorias = res.data;
    populateLivroSelects();
    renderList('categorias', categoriaSearch.value || '');
  } else if (resource === 'livros') {
    currentLivros = res.data;
    renderList('livros', livroSearch.value || '');
  } else if (resource === 'usuarios') {
    currentUsuarios = res.data;
    renderList('usuarios', usuarioSearch.value || '');
  }
}

function populateLivroSelects() {
  // Populate author and category selects for the livro form
  if (!livroAutorSelect || !livroCategoriaSelect) return;
  livroAutorSelect.innerHTML = '<option value="">-- Autor --</option>' + currentAutores.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');
  livroCategoriaSelect.innerHTML = '<option value="">-- Categoria --</option>' + currentCategorias.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
}

// Modals state
let editingAutorId = null;
let editingCategoriaId = null;

// =======================
// AUTOR MODALS
// =======================
function openAutorModal(mode, item = null) {
  editingAutorId = mode === 'edit' && item ? item.id : null;
  autorModalTitle.textContent = mode === 'edit' ? 'Editar Autor' : 'Novo Autor';
  autorInput.value = item?.nome || '';
  autorCounter.textContent = String(autorInput.value.length || 0);
  autorModal.classList.remove('hidden');
  autorModal.setAttribute('aria-hidden', 'false');
}

function closeAutorModal() {
  editingAutorId = null;
  autorModal.classList.add('hidden');
  autorModal.setAttribute('aria-hidden', 'true');
}

function openAutorViewModal(item) {
  let html = `
    <div class="view-group full-width">
      <span class="view-label">ID</span>
      <span class="view-value">${item.id}</span>
    </div>
    <div class="view-group full-width">
      <span class="view-label">Nome do Autor</span>
      <span class="view-value" style="font-size:18px;font-weight:bold">${item.nome || '—'}</span>
    </div>
  `;
  autorViewContent.innerHTML = html;
  autorViewModal.classList.remove('hidden');
  autorViewModal.setAttribute('aria-hidden', 'false');
}

function closeAutorViewModal() {
  autorViewModal.classList.add('hidden');
  autorViewModal.setAttribute('aria-hidden', 'true');
}

if (novoAutorBtn) novoAutorBtn.addEventListener('click', () => openAutorModal('create'));
if (autorModalCancel) autorModalCancel.addEventListener('click', () => closeAutorModal());
if (autorModalClose) autorModalClose.addEventListener('click', () => closeAutorModal());
if (autorViewClose) autorViewClose.addEventListener('click', () => closeAutorViewModal());
if (autorViewOk) autorViewOk.addEventListener('click', () => closeAutorViewModal());

if (autorModalForm) {
  autorModalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = autorInput.value.trim();
    if (!nome) return showToast('Nome é obrigatório', 'error');

    try {
      let res;
      if (editingAutorId) {
        res = await request(`${api.autores}/${editingAutorId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome }),
        });
      } else {
        res = await request(api.autores, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome }),
        });
      }

      if (res.status === 200 || res.status === 201) {
        showToast(editingAutorId ? 'Autor atualizado' : 'Autor criado');
        closeAutorModal();
        await loadList('autores');
      } else {
        showToast((res.error && res.error.error) || 'Erro ao salvar autor', 'error');
      }
    } catch (err) {
      showToast('Erro de rede ao salvar', 'error');
    }
  });
}

// =======================
// CATEGORIA MODALS
// =======================
function openCategoriaModal(mode, item = null) {
  editingCategoriaId = mode === 'edit' && item ? item.id : null;
  categoriaModalTitle.textContent = mode === 'edit' ? 'Editar Categoria' : 'Nova Categoria';
  categoriaInput.value = item?.nome || '';
  categoriaCounter.textContent = String(categoriaInput.value.length || 0);
  categoriaModal.classList.remove('hidden');
  categoriaModal.setAttribute('aria-hidden', 'false');
}

function closeCategoriaModal() {
  editingCategoriaId = null;
  categoriaModal.classList.add('hidden');
  categoriaModal.setAttribute('aria-hidden', 'true');
}

function openCategoriaViewModal(item) {
  let html = `
    <div class="view-group full-width">
      <span class="view-label">ID</span>
      <span class="view-value">${item.id}</span>
    </div>
    <div class="view-group full-width">
      <span class="view-label">Nome da Categoria</span>
      <span class="view-value" style="font-size:18px;font-weight:bold">${item.nome || '—'}</span>
    </div>
  `;
  categoriaViewContent.innerHTML = html;
  categoriaViewModal.classList.remove('hidden');
  categoriaViewModal.setAttribute('aria-hidden', 'false');
}

function closeCategoriaViewModal() {
  categoriaViewModal.classList.add('hidden');
  categoriaViewModal.setAttribute('aria-hidden', 'true');
}

if (novaCategoriaBtn) novaCategoriaBtn.addEventListener('click', () => openCategoriaModal('create'));
if (categoriaModalCancel) categoriaModalCancel.addEventListener('click', () => closeCategoriaModal());
if (categoriaModalClose) categoriaModalClose.addEventListener('click', () => closeCategoriaModal());
if (categoriaViewClose) categoriaViewClose.addEventListener('click', () => closeCategoriaViewModal());
if (categoriaViewOk) categoriaViewOk.addEventListener('click', () => closeCategoriaViewModal());

if (categoriaModalForm) {
  categoriaModalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = categoriaInput.value.trim();
    if (!nome) return showToast('Nome é obrigatório', 'error');

    try {
      let res;
      if (editingCategoriaId) {
        res = await request(`${api.categorias}/${editingCategoriaId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome }),
        });
      } else {
        res = await request(api.categorias, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome }),
        });
      }

      if (res.status === 200 || res.status === 201) {
        showToast(editingCategoriaId ? 'Categoria atualizada' : 'Categoria criada');
        closeCategoriaModal();
        await loadList('categorias');
      } else {
        showToast((res.error && res.error.error) || 'Erro ao salvar categoria', 'error');
      }
    } catch (err) {
      showToast('Erro de rede ao salvar', 'error');
    }
  });
}

// Livro modal (ADD / EDIT)
// Modal elements
const novoLivroBtn = document.getElementById('novo-livro-btn');
const livroModal = document.getElementById('livro-modal');
const livroModalForm = document.getElementById('livro-modal-form');
const livroModalTitle = document.getElementById('livro-modal-title');
const livroModalCancel = document.getElementById('livro-modal-cancel');
const livroModalClose = document.getElementById('livro-modal-close');

// View Modal elements
const livroViewModal = document.getElementById('livro-view-modal');
const livroViewContent = document.getElementById('livro-view-content');
const livroViewClose = document.getElementById('livro-view-close');
const livroViewOk = document.getElementById('livro-view-ok');

let editingLivroId = null;
let editingUsuarioId = null;

function formatDateForInput(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function openLivroModal(mode, item = null) {
  editingLivroId = mode === 'edit' && item ? item.id : null;
  livroModalTitle.textContent = mode === 'edit' ? 'Editar Livro' : 'Novo Livro';
  // Populate fields or clear
  livroTituloInput.value = item?.titulo || '';
  livroCounter.textContent = String(livroTituloInput.value.length || 0);
  livroEdicaoInput.value = item?.edicao || '';
  if (livroImgInput) livroImgInput.value = ''; // Reset file input
  livroIdiomaInput.value = item?.idioma || '';
  livroNumPaginasInput.value = item?.num_paginas ?? '';
  livroEditoraInput.value = item?.editora || '';
  livroEstoqueInput.value = item?.estoque ?? '';
  livroDataPublicacaoInput.value = formatDateForInput(item?.data_publicacao);
  livroDescricaoInput.value = item?.descricao || '';
  // select values
  livroAutorSelect.value = item?.autorId || '';
  livroCategoriaSelect.value = item?.categoriaId || '';

  livroModal.classList.remove('hidden');
  livroModal.setAttribute('aria-hidden', 'false');
}

function closeLivroModal() {
  editingLivroId = null;
  livroModal.classList.add('hidden');
  livroModal.setAttribute('aria-hidden', 'true');
}

function openLivroViewModal(item) {
  const autorNome = item.autores ? item.autores.nome : (item.autor_nome || '—');
  const categoriaNome = item.categorias ? item.categorias.nome : (item.categoria_nome || '—');
  
  let html = '';
  
  if (item.img) {
    html += `<div class="view-image-container">
      <img src="${item.img}" alt="Capa do livro" class="view-image" onerror="this.style.display='none'">
    </div>`;
  }
  
  html += `
    <div class="view-group full-width">
      <span class="view-label">Título</span>
      <span class="view-value" style="font-size:18px;font-weight:bold">${item.titulo || '—'}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Autor</span>
      <span class="view-value">${autorNome}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Categoria</span>
      <span class="view-value">${categoriaNome}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Edição</span>
      <span class="view-value">${item.edicao || '—'}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Idioma</span>
      <span class="view-value">${item.idioma || '—'}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Número de Páginas</span>
      <span class="view-value">${item.num_paginas ?? '—'}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Editora</span>
      <span class="view-value">${item.editora || '—'}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Estoque</span>
      <span class="view-value">${item.estoque ?? '—'}</span>
    </div>
    <div class="view-group">
      <span class="view-label">Data de Publicação</span>
      <span class="view-value">${formatDateForInput(item.data_publicacao) || '—'}</span>
    </div>
    <div class="view-group full-width">
      <span class="view-label">Descrição</span>
      <span class="view-value">${item.descricao || '—'}</span>
    </div>
  `;

  livroViewContent.innerHTML = html;
  livroViewModal.classList.remove('hidden');
  livroViewModal.setAttribute('aria-hidden', 'false');
}

function closeLivroViewModal() {
  livroViewModal.classList.add('hidden');
  livroViewModal.setAttribute('aria-hidden', 'true');
}

if (novoLivroBtn) novoLivroBtn.addEventListener('click', () => openLivroModal('create'));
if (livroModalCancel) livroModalCancel.addEventListener('click', () => closeLivroModal());
if (livroModalClose) livroModalClose.addEventListener('click', () => closeLivroModal());

if (livroViewClose) livroViewClose.addEventListener('click', () => closeLivroViewModal());
if (livroViewOk) livroViewOk.addEventListener('click', () => closeLivroViewModal());

// Usuario modal functions
function openUsuarioModal(mode, item = null) {
  editingUsuarioId = item ? item.id : null;
  usuarioModalTitle.textContent = mode === 'create' ? 'Novo Usuario' : 'Editar Usuario';
  if (mode === 'edit' && item) {
    usuarioNomeInput.value = item.nome || '';
    usuarioMatriculaInput.value = item.matricula || '';
    usuarioPerfilSelect.value = item.perfil || '';
    usuarioCursoInput.value = item.curso || '';
    usuarioCpfInput.value = item.cpf || '';
    usuarioDataNascimentoInput.value = item.data_nascimento ? item.data_nascimento.split('T')[0] : '';
    usuarioEmailInput.value = item.email || '';
    usuarioSenhaInput.value = ''; // Don't prefill password
    usuarioStatusSelect.value = item.status || '';
  } else {
    usuarioModalForm.reset();
  }
  usuarioModal.classList.remove('hidden');
  usuarioModal.setAttribute('aria-hidden', 'false');
  usuarioNomeInput.focus();
}

function closeUsuarioModal() {
  usuarioModal.classList.add('hidden');
  usuarioModal.setAttribute('aria-hidden', 'true');
  editingUsuarioId = null;
}

function openUsuarioViewModal(item) {
  usuarioViewContent.innerHTML = `
    <p><strong>Nome:</strong> ${item.nome || '—'}</p>
    <p><strong>Matrícula:</strong> ${item.matricula || '—'}</p>
    <p><strong>Perfil:</strong> ${item.perfil || '—'}</p>
    <p><strong>Curso:</strong> ${item.curso || '—'}</p>
    <p><strong>CPF:</strong> ${item.cpf || '—'}</p>
    <p><strong>Data de Nascimento:</strong> ${item.data_nascimento ? new Date(item.data_nascimento).toLocaleDateString('pt-BR') : '—'}</p>
    <p><strong>Email:</strong> ${item.email || '—'}</p>
    <p><strong>Status:</strong> ${item.status || '—'}</p>
  `;
  usuarioViewModal.classList.remove('hidden');
  usuarioViewModal.setAttribute('aria-hidden', 'false');
}

function closeUsuarioViewModal() {
  usuarioViewModal.classList.add('hidden');
  usuarioViewModal.setAttribute('aria-hidden', 'true');
}

if (novoUsuarioBtn) novoUsuarioBtn.addEventListener('click', () => openUsuarioModal('create'));
if (usuarioModalCancel) usuarioModalCancel.addEventListener('click', () => closeUsuarioModal());
if (usuarioModalClose) usuarioModalClose.addEventListener('click', () => closeUsuarioModal());

if (usuarioViewClose) usuarioViewClose.addEventListener('click', () => closeUsuarioViewModal());
if (usuarioViewOk) usuarioViewOk.addEventListener('click', () => closeUsuarioViewModal());

// close modal with Escape
document.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') {
    if (!livroModal.classList.contains('hidden')) closeLivroModal();
    if (!livroViewModal.classList.contains('hidden')) closeLivroViewModal();
    if (!usuarioModal.classList.contains('hidden')) closeUsuarioModal();
    if (!usuarioViewModal.classList.contains('hidden')) closeUsuarioViewModal();
    if (!autorModal.classList.contains('hidden')) closeAutorModal();
    if (!autorViewModal.classList.contains('hidden')) closeAutorViewModal();
    if (!categoriaModal.classList.contains('hidden')) closeCategoriaModal();
    if (!categoriaViewModal.classList.contains('hidden')) closeCategoriaViewModal();
  }
});

// submit modal form (create or update)
if (livroModalForm) {
  livroModalForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = livroTituloInput.value.trim();
    const autorId = livroAutorSelect.value;
    const categoriaId = livroCategoriaSelect.value;
    
    if (!titulo) return showToast('Título é obrigatório', 'error');
    if (!autorId) return showToast('Autor é obrigatório', 'error');
    if (!categoriaId) return showToast('Categoria é obrigatória', 'error');

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('autorId', autorId);
    formData.append('categoriaId', categoriaId);
    
    if (livroEdicaoInput && livroEdicaoInput.value.trim()) formData.append('edicao', livroEdicaoInput.value.trim());
    if (livroIdiomaInput && livroIdiomaInput.value.trim()) formData.append('idioma', livroIdiomaInput.value.trim());
    if (livroNumPaginasInput && livroNumPaginasInput.value !== '') formData.append('num_paginas', livroNumPaginasInput.value);
    if (livroEditoraInput && livroEditoraInput.value.trim()) formData.append('editora', livroEditoraInput.value.trim());
    if (livroEstoqueInput && livroEstoqueInput.value !== '') formData.append('estoque', livroEstoqueInput.value);
    if (livroDataPublicacaoInput && livroDataPublicacaoInput.value) formData.append('data_publicacao', livroDataPublicacaoInput.value);
    if (livroDescricaoInput && livroDescricaoInput.value.trim()) formData.append('descricao', livroDescricaoInput.value.trim());
    
    if (livroImgInput && livroImgInput.files && livroImgInput.files[0]) {
      formData.append('img', livroImgInput.files[0]);
    }

    try {
      let res;
      if (editingLivroId) {
        res = await fetch(`${api.livros}/${editingLivroId}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        res = await fetch(api.livros, {
          method: 'POST',
          body: formData,
        });
      }

      const isJson = res.headers.get('content-type')?.includes('application/json');
      const data = isJson ? await res.json() : null;

      if (res.status === 200 || res.status === 201) {
        showToast(editingLivroId ? 'Livro atualizado' : 'Livro criado');
        closeLivroModal();
        await loadList('livros');
      } else {
        showToast((data && (data.error || (data.errors && data.errors.join(', ')))) || 'Erro ao salvar livro', 'error');
      }
    } catch (err) {
      showToast('Erro de rede ao salvar', 'error');
    }
  });
}

usuarioModalForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = usuarioNomeInput.value.trim();
  const matricula = usuarioMatriculaInput.value.trim();
  const perfil = usuarioPerfilSelect.value;
  const curso = usuarioCursoInput.value.trim();
  const cpf = usuarioCpfInput.value.trim();
  const dataNascimento = usuarioDataNascimentoInput.value;
  const email = usuarioEmailInput.value.trim();
  const senha = usuarioSenhaInput.value.trim();
  const status = usuarioStatusSelect.value;

  if (!nome || !cpf || !dataNascimento || !email || !senha || !perfil || !status) {
    return showToast('Todos os campos obrigatórios devem ser preenchidos', 'error');
  }

  const usuarioData = {
    nome,
    matricula,
    perfil,
    curso,
    cpf,
    data_nascimento: dataNascimento,
    email,
    senha,
    status
  };

  try {
    let res;
    if (editingUsuarioId) {
      res = await request(`${api.usuarios}/${editingUsuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
      });
    } else {
      res = await request(api.usuarios, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioData)
      });
    }

    if (res.status === 200 || res.status === 201) {
      showToast(editingUsuarioId ? 'Usuario atualizado' : 'Usuario criado');
      closeUsuarioModal();
      await loadList('usuarios');
    } else {
      showToast((res.error && res.error.error) || 'Erro ao salvar usuario', 'error');
    }
  } catch (err) {
    showToast('Erro de rede ao salvar', 'error');
  }
});

// Confirmation modal helper
function showConfirm(message) {
  return new Promise((resolve) => {
    confirmMessage.textContent = message;
    confirmModal.classList.remove('hidden');
    confirmModal.setAttribute('aria-hidden', 'false');

    function cleanup() {
      confirmModal.classList.add('hidden');
      confirmModal.setAttribute('aria-hidden', 'true');
      confirmOk.removeEventListener('click', onOk);
      confirmCancel.removeEventListener('click', onCancel);
    }

    function onOk() { cleanup(); resolve(true); }
    function onCancel() { cleanup(); resolve(false); }

    confirmOk.addEventListener('click', onOk);
    confirmCancel.addEventListener('click', onCancel);
  });
}

// Delete (uses modal)
async function handleDelete(id, resource, li) {
  const confirmed = await showConfirm('Tem certeza que deseja apagar este registro?');
  if (!confirmed) return;
  const res = await request(`${api[resource]}/${id}`, { method: 'DELETE' });
  // Accept 200 (with message) or 204 (no content) as successful delete
  if (res.status === 200 || res.status === 204) {
    const msg = (res.status === 200 && res.data && res.data.message) ? res.data.message : 'Deletado';
    showToast(msg);
    await loadList(resource);
  } else if (res.status === 404) {
    showToast('Registro não encontrado', 'error');
    await loadList(resource);
  } else if (res.status === 409) {
    showToast((res.error && res.error.error) || 'Não é possível deletar: existem registros relacionados', 'error');
  } else {
    showToast((res.error && res.error.error) || (res.error && res.error.message) || 'Erro ao deletar', 'error');
  }
}

// Search with debounce
function debounce(fn, wait = 250) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

autorSearch.addEventListener('input', debounce((e) => renderList('autores', e.target.value)));
categoriaSearch.addEventListener('input', debounce((e) => renderList('categorias', e.target.value)));
livroSearch.addEventListener('input', debounce((e) => renderList('livros', e.target.value)));
usuarioSearch.addEventListener('input', debounce((e) => renderList('usuarios', e.target.value)));

// Character counters
autorInput.addEventListener('input', () => autorCounter.textContent = String(autorInput.value.length));
categoriaInput.addEventListener('input', () => categoriaCounter.textContent = String(categoriaInput.value.length));
livroTituloInput.addEventListener('input', () => livroCounter.textContent = String(livroTituloInput.value.length));

// Login functions
async function login(email, senha) {
  const res = await request(api.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });
  if (res.status === 200 && res.data.token) {
    localStorage.setItem('token', res.data.token);
    showMain();
    await loadAllLists();
    return true;
  } else {
    const errorMsg = (res.error && res.error.error) || 'Erro no login';
    loginError.textContent = errorMsg;
    loginError.classList.remove('hidden');
    return false;
  }
}

function logout() {
  localStorage.removeItem('token');
  showLogin();
}

function showLogin() {
  loginSection.classList.remove('hidden');
  main.classList.add('hidden');
  logoutBtn.classList.add('hidden');
}

function showMain() {
  loginSection.classList.add('hidden');
  main.classList.remove('hidden');
  logoutBtn.classList.remove('hidden');
}

async function loadAllLists() {
  await loadList('autores');
  await loadList('categorias');
  await loadList('livros');
  await loadList('usuarios');
}

// Event listeners for login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginEmail.value.trim();
  const senha = loginSenha.value.trim();
  if (await login(email, senha)) {
    loginForm.reset();
    loginError.classList.add('hidden');
  }
});

logoutBtn.addEventListener('click', logout);

// Init
(async function init() {
  // Check if token exists
  const token = localStorage.getItem('token');
  if (token) {
    // Try to validate token by making a request
    const res = await request('/validate-token');
    if (res.status === 200) {
      showMain();
      await loadAllLists();
    } else {
      localStorage.removeItem('token');
      showLogin();
    }
  } else {
    showLogin();
  }

  // set initial counters
  autorCounter.textContent = String(autorInput.value.length || 0);
  categoriaCounter.textContent = String(categoriaInput.value.length || 0);
  livroCounter.textContent = String(livroTituloInput.value.length || 0);
})();
