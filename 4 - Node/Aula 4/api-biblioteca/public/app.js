// Frontend app for Autores, Categorias & Livros (improved UX)
const api = {
  autores: '/autores',
  categorias: '/categorias',
  livros: '/livros',
};

// UI elements
const tabAutores = document.getElementById('tab-autores');
const tabCategorias = document.getElementById('tab-categorias');
const tabLivros = document.getElementById('tab-livros');
const autoresSection = document.getElementById('autores-section');
const categoriasSection = document.getElementById('categorias-section');
const livrosSection = document.getElementById('livros-section');
const autoresList = document.getElementById('autores-list');
const categoriasList = document.getElementById('categorias-list');
const livrosList = document.getElementById('livros-list');
const autorForm = document.getElementById('autor-form');
const categoriaForm = document.getElementById('categoria-form');
const livroForm = document.getElementById('livro-form');
const toastEl = document.getElementById('toast');

// New UI elements (counters, search, modal, empty states)
const autorInput = document.getElementById('autor-nome');
const categoriaInput = document.getElementById('categoria-nome');
const livroTituloInput = document.getElementById('livro-titulo');
const livroAutorSelect = document.getElementById('livro-autor');
const livroCategoriaSelect = document.getElementById('livro-categoria');
const autorCounter = document.getElementById('autor-counter');
const categoriaCounter = document.getElementById('categoria-counter');
const livroCounter = document.getElementById('livro-counter');
const autorSearch = document.getElementById('autor-search');
const categoriaSearch = document.getElementById('categoria-search');
const livroSearch = document.getElementById('livro-search');
const autoresEmpty = document.getElementById('autores-empty');
const categoriasEmpty = document.getElementById('categorias-empty');
const livrosEmpty = document.getElementById('livros-empty');

const confirmModal = document.getElementById('confirm-modal');
const confirmMessage = document.getElementById('confirm-message');
const confirmOk = document.getElementById('confirm-ok');
const confirmCancel = document.getElementById('confirm-cancel');

// Local caches
let currentAutores = [];
let currentCategorias = [];
let currentLivros = [];

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
  autoresSection.classList.remove('hidden');
  categoriasSection.classList.add('hidden');
  livrosSection.classList.add('hidden');
});

tabCategorias.addEventListener('click', () => {
  tabCategorias.classList.add('active');
  tabAutores.classList.remove('active');
  tabLivros.classList.remove('active');
  categoriasSection.classList.remove('hidden');
  autoresSection.classList.add('hidden');
  livrosSection.classList.add('hidden');
});

tabLivros.addEventListener('click', () => {
  tabLivros.classList.add('active');
  tabAutores.classList.remove('active');
  tabCategorias.classList.remove('active');
  livrosSection.classList.remove('hidden');
  autoresSection.classList.add('hidden');
  categoriasSection.classList.add('hidden');
});

// Helpers
async function request(url, options = {}) {
  try {
    const res = await fetch(url, options);
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
    if (resource === 'livros') startEditLivro(li, item);
    else startEdit(li, item, resource);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn delete';
  deleteBtn.textContent = 'Apagar';
  deleteBtn.addEventListener('click', () => handleDelete(item.id, resource, li));

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
  }
}

function populateLivroSelects() {
  // Populate author and category selects for the livro form
  if (!livroAutorSelect || !livroCategoriaSelect) return;
  livroAutorSelect.innerHTML = '<option value="">-- Autor --</option>' + currentAutores.map(a => `<option value="${a.id}">${a.nome}</option>`).join('');
  livroCategoriaSelect.innerHTML = '<option value="">-- Categoria --</option>' + currentCategorias.map(c => `<option value="${c.id}">${c.nome}</option>`).join('');
}

// Create
autorForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = autorInput.value.trim();
  if (!nome) return showToast('Nome é obrigatório', 'error');
  const res = await request(api.autores, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }),
  });
  if (res.status === 201) {
    showToast('Autor criado');
    autorInput.value = '';
    autorCounter.textContent = '0';
    await loadList('autores');
  } else {
    showToast((res.error && res.error.error) || (res.error && res.error.message) || 'Erro ao criar autor', 'error');
  }
});

categoriaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = categoriaInput.value.trim();
  if (!nome) return showToast('Nome é obrigatório', 'error');
  const res = await request(api.categorias, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome }),
  });
  if (res.status === 201) {
    showToast('Categoria criada');
    categoriaInput.value = '';
    categoriaCounter.textContent = '0';
    await loadList('categorias');
  } else {
    showToast((res.error && res.error.error) || (res.error && res.error.message) || 'Erro ao criar categoria', 'error');
  }
});

// Livro create
if (livroForm) {
  livroForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titulo = livroTituloInput.value.trim();
    const autorId = Number(livroAutorSelect.value) || undefined;
    const categoriaId = Number(livroCategoriaSelect.value) || undefined;
    if (!titulo) return showToast('Título é obrigatório', 'error');
    if (!autorId) return showToast('Autor é obrigatório', 'error');
    if (!categoriaId) return showToast('Categoria é obrigatória', 'error');

    const res = await request(api.livros, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, autorId, categoriaId }),
    });

    if (res.status === 201) {
      showToast('Livro criado');
      livroTituloInput.value = '';
      livroCounter.textContent = '0';
      await loadList('livros');
    } else {
      showToast((res.error && (res.error.error || (res.error.errors && res.error.errors.join(', ')))) || 'Erro ao criar livro', 'error');
    }
  });
}

// Edit (existing) kept for autores/categorias
function startEdit(li, item, resource) {
  const left = li.querySelector('.left');
  left.innerHTML = '';
  const input = document.createElement('input');
  input.className = 'inline-input';
  input.value = item.nome;
  input.maxLength = 200;
  left.appendChild(input);

  const actions = li.querySelector('.actions');
  actions.innerHTML = '';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn save';
  saveBtn.textContent = 'Salvar';
  saveBtn.addEventListener('click', () => saveEdit(item.id, input.value, resource, li));

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn cancel';
  cancelBtn.textContent = 'Cancelar';
  cancelBtn.addEventListener('click', async () => { await loadList(resource); });

  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  input.focus();
}

async function saveEdit(id, nome, resource, li) {
  const trimmed = nome.trim();
  if (!trimmed) return showToast('Nome não pode ser vazio', 'error');
  const res = await request(`${api[resource]}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: trimmed }),
  });
  if (res.status === 200) {
    showToast('Atualizado com sucesso');
    await loadList(resource);
  } else if (res.status === 404) {
    showToast('Registro não encontrado', 'error');
    await loadList(resource);
  } else {
    showToast((res.error && res.error.error) || (res.error && res.error.message) || 'Erro ao atualizar', 'error');
  }
}

// Start edit for livros (only title editable inline)
function startEditLivro(li, item) {
  const left = li.querySelector('.left');
  left.innerHTML = '';
  const input = document.createElement('input');
  input.className = 'inline-input';
  input.value = item.titulo;
  input.maxLength = 200;
  left.appendChild(input);

  const actions = li.querySelector('.actions');
  actions.innerHTML = '';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn save';
  saveBtn.textContent = 'Salvar';
  saveBtn.addEventListener('click', () => saveLivroEdit(item.id, input.value));

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn cancel';
  cancelBtn.textContent = 'Cancelar';
  cancelBtn.addEventListener('click', async () => { await loadList('livros'); });

  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  input.focus();
}

async function saveLivroEdit(id, titulo) {
  const trimmed = titulo.trim();
  if (!trimmed) return showToast('Título não pode ser vazio', 'error');
  const res = await request(`${api.livros}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo: trimmed }),
  });
  if (res.status === 200) {
    showToast('Livro atualizado');
    await loadList('livros');
  } else if (res.status === 404) {
    showToast('Livro não encontrado', 'error');
    await loadList('livros');
  } else {
    showToast((res.error && res.error.error) || (res.error && res.error.message) || 'Erro ao atualizar livro', 'error');
  }
}

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

// Character counters
autorInput.addEventListener('input', () => autorCounter.textContent = String(autorInput.value.length));
categoriaInput.addEventListener('input', () => categoriaCounter.textContent = String(categoriaInput.value.length));
livroTituloInput.addEventListener('input', () => livroCounter.textContent = String(livroTituloInput.value.length));

// Init
(async function init() {
  // set initial counters
  autorCounter.textContent = String(autorInput.value.length || 0);
  categoriaCounter.textContent = String(categoriaInput.value.length || 0);
  livroCounter.textContent = String(livroTituloInput.value.length || 0);

  await loadList('autores');
  await loadList('categorias');
  await loadList('livros');
})();