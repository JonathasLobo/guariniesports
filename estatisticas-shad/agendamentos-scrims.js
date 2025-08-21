// Elementos do DOM
const scheduleEl = document.getElementById("schedule");
const modal = document.getElementById("modal");
const form = document.getElementById("scrimForm");
const selectedDateInput = document.getElementById("selectedDate");
const team2Input = document.getElementById("team2");
const matchTimeInput = document.getElementById("matchTime");
const matchFormatInput = document.getElementById("matchFormat");
const editIndexInput = document.getElementById("editIndex");

// Dados dos scrims
let scrims = JSON.parse(localStorage.getItem("scrims")) || {};

// Funções
function saveScrims() {
  localStorage.setItem("scrims", JSON.stringify(scrims));
}

function formatDate(date) {
  return date.toLocaleDateString("pt-BR").replace(/\//g, "-");
}

function loadImagePath(teamName) {
  const imagePath = `./images/logos/${teamName}.png`;
  const testImg = new Image();
  testImg.src = imagePath;
  return new Promise((resolve) => {
    testImg.onload = () => resolve(imagePath);
    testImg.onerror = () => resolve("./images/logos/noimage.png");
  });
}

async function renderSchedule() {
  scheduleEl.innerHTML = "";
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const formatted = formatDate(date);
    const dayScrims = scrims[formatted] || [];

    const row = document.createElement("div");
    row.className = "bg-white rounded shadow p-4";

    const dateEl = document.createElement("div");
    dateEl.className = "font-bold text-lg mb-2 flex justify-between items-center";
    
    // Só mostra o formato se existirem scrims agendadas para esta data
    const formatDisplay = dayScrims.length > 0 ? ` (${dayScrims[0]?.format || '2x2'})` : '';
    
    dateEl.innerHTML = `
      <span>${formatted}${formatDisplay}</span>
      <button class="text-green-600 text-xl hover:text-green-800" onclick="openModal('${formatted}')">+</button>
    `;
    row.appendChild(dateEl);

    const list = document.createElement("div");
    if (dayScrims.length === 0) {
      list.textContent = "-------------------";
    } else {
      for (let j = 0; j < dayScrims.length; j++) {
        const { team2, time, format } = dayScrims[j];
        const team1 = "Guarini";

        const [img1, img2] = await Promise.all([
          loadImagePath(team1),
          loadImagePath(team2)
        ]);

        const matchRow = document.createElement("div");
        matchRow.className = "flex items-center justify-between mb-2";

        matchRow.innerHTML = `
          <div class="flex items-center space-x-2">
            <span class="text-gray-500">${time}</span>
            <img src="${img1}" class="h-10 w-10 object-contain" />
            <span>${team1}</span>
            <span class="font-bold">x</span>
            <span>${team2}</span>
            <img src="${img2}" class="h-10 w-10 object-contain" />
          </div>
          <div class="space-x-1">
            <button class="text-yellow-500 hover:text-yellow-700" onclick="openModal('${formatted}', ${j})">✏️</button>
            <button class="text-red-500 hover:text-red-700" onclick="deleteScrim('${formatted}', ${j})">✖</button>
          </div>
        `;

        list.appendChild(matchRow);
      }
    }

    row.appendChild(list);
    scheduleEl.appendChild(row);
  }
}

function openModal(date, index = -1) {
  selectedDateInput.value = date;
  editIndexInput.value = index;

  if (index >= 0) {
    const { team2, time, format } = scrims[date][index];
    team2Input.value = team2;
    matchTimeInput.value = time;
    matchFormatInput.value = format || '2x2';
  } else {
    team2Input.value = "";
    matchTimeInput.value = "";
    matchFormatInput.value = "2x2";
  }

  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

function deleteScrim(date, index) {
  scrims[date].splice(index, 1);
  if (scrims[date].length === 0) {
    delete scrims[date];
  }
  saveScrims();
  renderSchedule();
}

// Event Listeners
form.onsubmit = (e) => {
  e.preventDefault();
  const date = selectedDateInput.value;
  const team2 = team2Input.value.trim();
  const time = matchTimeInput.value;
  const format = matchFormatInput.value;
  const editIndex = parseInt(editIndexInput.value, 10);

  if (!team2 || !time) return;

  if (!scrims[date]) scrims[date] = [];

  if (editIndex >= 0) {
    scrims[date][editIndex] = { team2, time, format };
  } else {
    scrims[date].push({ team2, time, format });
  }

  saveScrims();
  closeModal();
  renderSchedule();
};

// Inicialização
document.addEventListener('DOMContentLoaded', renderSchedule);

// Exportar funções para uso no HTML
window.openModal = openModal;
window.closeModal = closeModal;
window.deleteScrim = deleteScrim;