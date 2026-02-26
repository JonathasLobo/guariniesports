// ===========================
//   BINGO CREATOR - bingo.js
// ===========================

const TOTAL_CELLS = 25;

// State
const cellData = Array.from({ length: TOTAL_CELLS }, () => ({
  imgSrc: null,
  text: '',
  textPos: 'bottom',
  textColor: '#ffffff',
}));

let editingIndex = null;
let tempImgSrc = null;
let tempTextPos = 'bottom';
let tempTextColor = '#ffffff';

// DOM refs
const cellsGrid     = document.getElementById('cellsGrid');
const editModal     = document.getElementById('editModal');
const modalOverlay  = document.getElementById('modalOverlay');
const fileInput     = document.getElementById('fileInput');
const previewImg    = document.getElementById('previewImg');
const imageDropZone = document.getElementById('imageDropZone');
const btnRemoveImg  = document.getElementById('btnRemoveImg');
const cellTextInput = document.getElementById('cellTextInput');
const btnModalSave  = document.getElementById('btnModalSave');
const btnModalCancel= document.getElementById('btnModalCancel');
const btnExport     = document.getElementById('btnExport');
const btnClear      = document.getElementById('btnClear');
const bingoTitleInput    = document.getElementById('bingoTitleInput');
const bingoSubtitleInput = document.getElementById('bingoSubtitleInput');
const boardTitleDisplay  = document.getElementById('boardTitleDisplay');
const boardSubtitleDisplay = document.getElementById('boardSubtitleDisplay');

// ---- Build grid ----
function buildGrid() {
  cellsGrid.innerHTML = '';
  for (let i = 0; i < TOTAL_CELLS; i++) {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell';
    cell.dataset.index = i;
    cell.addEventListener('click', () => openModal(i));
    cellsGrid.appendChild(cell);
  }
  renderAllCells();
}

// ---- Render a single cell ----
function renderCell(index) {
  const cell = cellsGrid.children[index];
  if (!cell) return;

  const data = cellData[index];
  cell.innerHTML = '';

  // Background image
  if (data.imgSrc) {
    const img = document.createElement('img');
    img.src = data.imgSrc;
    img.className = 'cell-bg-img';
    cell.appendChild(img);
  } else {
    const hint = document.createElement('div');
    hint.className = 'cell-add-hint';
    hint.innerHTML = `<span class="hint-icon">+</span><span>Adicionar</span>`;
    cell.appendChild(hint);
  }

  // Text label
  if (data.text.trim()) {
    const label = document.createElement('div');
    label.className = `cell-text-label pos-${data.textPos}`;
    label.style.color = data.textColor;
    label.textContent = data.text;
    cell.appendChild(label);
  }

  // Hover overlay
  const overlay = document.createElement('div');
  overlay.className = 'cell-overlay';
  cell.appendChild(overlay);
}

function renderAllCells() {
  for (let i = 0; i < TOTAL_CELLS; i++) renderCell(i);
}

// ---- Modal ----
function openModal(index) {
  editingIndex = index;
  const data = cellData[index];

  tempImgSrc   = data.imgSrc;
  tempTextPos  = data.textPos;
  tempTextColor= data.textColor;

  cellTextInput.value = data.text;
  setModalImage(tempImgSrc);
  setActivePos(tempTextPos);
  setActiveSwatch(tempTextColor);

  editModal.classList.remove('hidden');
}

function closeModal() {
  editModal.classList.add('hidden');
  editingIndex = null;
  tempImgSrc = null;
  fileInput.value = '';
}

function setModalImage(src) {
  if (src) {
    previewImg.src = src;
    previewImg.classList.remove('hidden');
    imageDropZone.classList.add('hidden');
    btnRemoveImg.classList.remove('hidden');
  } else {
    previewImg.src = '';
    previewImg.classList.add('hidden');
    imageDropZone.classList.remove('hidden');
    btnRemoveImg.classList.add('hidden');
  }
}

function setActivePos(pos) {
  document.querySelectorAll('.pos-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.pos === pos);
  });
  tempTextPos = pos;
}

function setActiveSwatch(color) {
  document.querySelectorAll('.swatch').forEach(sw => {
    sw.classList.toggle('active', sw.dataset.color === color);
  });
  tempTextColor = color;
}

// Position buttons
document.querySelectorAll('.pos-btn').forEach(btn => {
  btn.addEventListener('click', () => setActivePos(btn.dataset.pos));
});

// Swatches
document.querySelectorAll('.swatch').forEach(sw => {
  sw.addEventListener('click', () => setActiveSwatch(sw.dataset.color));
});

// Image drop zone click
imageDropZone.addEventListener('click', () => fileInput.click());

// Drag and drop
imageDropZone.addEventListener('dragover', e => {
  e.preventDefault();
  imageDropZone.classList.add('drag-over');
});
imageDropZone.addEventListener('dragleave', () => imageDropZone.classList.remove('drag-over'));
imageDropZone.addEventListener('drop', e => {
  e.preventDefault();
  imageDropZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadImageFile(file);
});

// File input change
fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) loadImageFile(fileInput.files[0]);
});

function loadImageFile(file) {
  const reader = new FileReader();
  reader.onload = e => {
    tempImgSrc = e.target.result;
    setModalImage(tempImgSrc);
  };
  reader.readAsDataURL(file);
}

// Remove image
btnRemoveImg.addEventListener('click', () => {
  tempImgSrc = null;
  setModalImage(null);
});

// Save
btnModalSave.addEventListener('click', () => {
  if (editingIndex === null) return;
  cellData[editingIndex].imgSrc    = tempImgSrc;
  cellData[editingIndex].text      = cellTextInput.value.trim();
  cellData[editingIndex].textPos   = tempTextPos;
  cellData[editingIndex].textColor = tempTextColor;
  renderCell(editingIndex);
  closeModal();
});

// Cancel
btnModalCancel.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ---- Title / Subtitle live update ----
bingoTitleInput.addEventListener('input', () => {
  boardTitleDisplay.textContent = bingoTitleInput.value || 'MEU BINGO';
});
bingoSubtitleInput.addEventListener('input', () => {
  boardSubtitleDisplay.textContent = bingoSubtitleInput.value || 'O que será anunciado?';
});

// ---- Clear all ----
btnClear.addEventListener('click', () => {
  if (!confirm('Limpar todo o bingo? Esta ação não pode ser desfeita.')) return;
  for (let i = 0; i < TOTAL_CELLS; i++) {
    cellData[i] = { imgSrc: null, text: '', textPos: 'bottom', textColor: '#ffffff' };
  }
  bingoTitleInput.value = '';
  bingoSubtitleInput.value = '';
  boardTitleDisplay.textContent = 'MEU BINGO';
  boardSubtitleDisplay.textContent = 'O que será anunciado?';
  renderAllCells();
});

// ---- Export image ----
btnExport.addEventListener('click', async () => {
  if (typeof html2canvas === 'undefined') {
    alert('Biblioteca de exportação não carregada. Verifique sua conexão.');
    return;
  }

  btnExport.disabled = true;
  btnExport.textContent = '⏳ Gerando...';

  const board = document.getElementById('bingoBoard');

  try {
    const canvas = await html2canvas(board, {
      backgroundColor: '#161616',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const link = document.createElement('a');
    const title = bingoTitleInput.value.trim().replace(/\s+/g, '_') || 'meu_bingo';
    link.download = `${title}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    console.error(err);
    alert('Erro ao exportar. Tente novamente.');
  } finally {
    btnExport.disabled = false;
    btnExport.textContent = '📸 Exportar Imagem';
  }
});

// ---- Init ----
buildGrid();
