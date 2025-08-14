const diasIdx = ["domingo","segunda","terca","quarta","quinta","sexta","sabado"];
let agendaData = { segunda:[], terca:[], quarta:[], quinta:[], sexta:[], sabado:[], domingo:[] };
let historico = [];

const pokemons = [
  "Absol","Aegislash","Alcremie","Armarouge","Azumarill","Blastoise","Blaziken","Blissey","Buzzwool","Ceruledge","Chandelure","Charizard",
  "Cinderace","Clefable","Comfey","Cramorant","Crustle","Darkrai","Decidueye","Delphox","Dodrio","Dragapult","Dragonite","Duraludon","Eldegoss",
  "Espeon","Falinks","Garchomp","Gardevoir","Gengar","Glaceon","Goodra","Greedent","Greninja","Gyarados","Ho-Oh","Hoopa","Inteleon","Lapras",
  "Latias","Latios","Leafeon","Lucario","Machamp","Mamoswine","Meowscarada","Metagross","Mew","Mewtwo Y","Mewtwo X","Mimikyu","Miraidon",
  "Mr. Mime","Ninetales","Pawmot","Pikachu","Psyduck","Raichu","Rapidash","Sableye","Scizor","Slowbro","Snorlax","Suicune","Sylveon","Talonflame",
  "Tinkaton","Trevenant","Tsareena","Tyranitar","Umbreon","Urshifu","Venusaur","Wigglytuff","Zacian","Zeraora","Zoroark"
];

function getDiaSemanaId(dataStr) {
  const p = dataStr.split("-");
  const d = new Date(parseInt(p[0]), parseInt(p[1]) - 1, parseInt(p[2]));
  return diasIdx[d.getDay()];
}

function formatTeamNameForImage(teamName) {
  return teamName + '.png';
}

function createActivityDiv(activity, day) {
  const div = document.createElement('div');
  div.className = 'atividade ' + (activity.atividade ? activity.atividade.replace(/\s+/g,'') : '');
  
  let advDisplay = activity.adversario;
  if ((activity.atividade === "Scrim" || activity.atividade === "Torneio") && activity.adversario) {
    const logoPath = './logos/' + formatTeamNameForImage(activity.adversario);
    advDisplay = `<img src="${logoPath}" class="team-logo" alt="${activity.adversario}" 
                 onerror="this.style.display='none'" 
                 title="${activity.adversario}">${activity.adversario}`;
  }
  
  div.innerHTML = `<strong>${activity.data} ${activity.horario}</strong> - ${activity.atividade}`;
  
  if(activity.atividade === "Torneio" && activity.campeonato) {
    div.innerHTML += `<br><small>Campeonato: ${activity.campeonato}</small>`;
  }
  
  div.innerHTML += `<br><small>Resp: ${activity.responsavel}</small>
                   <br><small>Part: ${activity.participantes}</small>`;
  
  if(activity.atividade === "Scrim" || activity.atividade === "Torneio"){
    div.innerHTML += `<br><small>Versus: ${advDisplay} | Formato: ${activity.formato} | Ban: ${activity.banimentos}</small>`;
  }
  
  const btns = document.createElement('div');
  btns.className = 'btns';

  const btnDelete = document.createElement('button');
  btnDelete.className = 'btn-delete';
  btnDelete.textContent = 'Apagar';
  btnDelete.onclick = () => { deleteActivity(activity.id, day); };

  const btnConfirm = document.createElement('button');
  btnConfirm.className = 'btn-confirm';
  btnConfirm.textContent = 'Confirmar';
  btnConfirm.onclick = () => { confirmActivity(activity.id, day); };

  const btnCopy = document.createElement('button');
  btnCopy.className = 'btn-copy';
  btnCopy.textContent = 'Copiar';
  btnCopy.onclick = () => { copyActivityToClipboard(activity); };

  const btnResult = document.createElement('button');
  btnResult.className = 'btn-result';
  btnResult.textContent = 'Cadastrar resultado';
  btnResult.onclick = () => { window.location.href = 'scrims-result.html'; };

  btns.appendChild(btnDelete);
  btns.appendChild(btnConfirm);
  btns.appendChild(btnCopy);
  if(activity.atividade === "Scrim" || activity.atividade === "Torneio") btns.appendChild(btnResult);
  div.appendChild(btns);
  return div;
}

function deleteActivity(id, day) {
  agendaData[day] = agendaData[day].filter(a => a.id !== id);
  renderDay(day);
  saveToStorage();
}

function confirmActivity(id, day) {
  const idx = agendaData[day].findIndex(a => a.id === id);
  if (idx === -1) return;
  const [activity] = agendaData[day].splice(idx, 1);
  historico.unshift(activity);
  renderDay(day);
  renderHistorico();
  saveToStorage();
}

function deleteFromHistorico(index){
  historico.splice(index,1);
  renderHistorico();
  saveToStorage();
}

function copyActivityToClipboard(activity) {
  let texto = `${activity.data} ${activity.horario} - ${activity.atividade} | Resp: ${activity.responsavel} | Part: ${activity.participantes}`;
  
  if(activity.atividade === "Torneio" && activity.campeonato) {
    texto += ` | Campeonato: ${activity.campeonato}`;
  }
  
  if(activity.atividade === "Scrim" || activity.atividade === "Torneio"){
    texto += ` | Versus: ${activity.adversario} | Formato: ${activity.formato} | Ban: ${activity.banimentos}`;
  }
  
  navigator.clipboard.writeText(texto).then(() => {
    alert('Atividade copiada!');
  });
}

function copyDayActivities(day) {
  const activities = agendaData[day];
  
  if (activities.length === 0) {
    alert('Não há atividades agendadas para este dia.');
    return;
  }
  
  const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
  let texto = `=== ${dayCapitalized.replace('terca', 'Terça').replace('quarta', 'Quarta').replace('quinta', 'Quinta').replace('sabado', 'Sábado')} ===\n\n`;
  
  activities.forEach((activity, index) => {
    texto += `${index + 1}. ${activity.data} às ${activity.horario} - ${activity.atividade}\n`;
    texto += `   Responsável: ${activity.responsavel}\n`;
    texto += `   Participantes: ${activity.participantes}\n`;
    
    if(activity.atividade === "Torneio" && activity.campeonato) {
      texto += `   Campeonato: ${activity.campeonato}\n`;
    }
    
    if(activity.atividade === "Scrim" || activity.atividade === "Torneio"){
      texto += `   Adversário: ${activity.adversario}\n`;
      texto += `   Formato: ${activity.formato}\n`;
      texto += `   Banimentos: ${activity.banimentos}\n`;
    }
    
    texto += '\n';
  });
  
  navigator.clipboard.writeText(texto).then(() => {
    alert(`Todas as atividades de ${dayCapitalized.toLowerCase()} foram copiadas!`);
  }).catch(() => {
    alert('Erro ao copiar as atividades.');
  });
}

function renderDay(day) {
  const col = document.getElementById(day);
  col.innerHTML = '';
  
  // Ordenar atividades por horário
  agendaData[day].sort((a,b) => (a.horario || '').localeCompare(b.horario || ''));
  
  // Adicionar atividades
  agendaData[day].forEach(activity => {
    col.appendChild(createActivityDiv(activity, day));
  });
  
  // Adicionar botão de copiar dia
  const copyBtn = document.createElement('button');
  copyBtn.className = 'copy-day-btn';
  copyBtn.textContent = `Copiar ${day.charAt(0).toUpperCase() + day.slice(1).replace('terca', 'Terça').replace('quarta', 'Quarta').replace('quinta', 'Quinta').replace('sabado', 'Sábado')}`;
  copyBtn.onclick = () => { copyDayActivities(day); };
  col.appendChild(copyBtn);
}

function renderHistorico() {
  const ul = document.getElementById('historico');
  ul.innerHTML = '';
  historico.forEach((item, idx) => {
    const li = document.createElement('li');
    const txt = document.createElement('div');
    txt.className = 'txt';
    
    let advDisplay = item.adversario;
    if ((item.atividade === "Scrim" || item.atividade === "Torneio") && item.adversario) {
      const logoPath = './logos/' + formatTeamNameForImage(item.adversario);
      advDisplay = `<img src="${logoPath}" class="team-logo" alt="${item.adversario}" onerror="this.style.display='none'">${item.adversario}`;
    }
    
    txt.innerHTML = `${item.data} ${item.horario} - ${item.atividade} (Resp: ${item.responsavel}, Part: ${item.participantes})`;
    
    if(item.atividade === "Torneio" && item.campeonato) {
      txt.innerHTML += ` | Campeonato: ${item.campeonato}`;
    }
    
    if(item.atividade === "Scrim" || item.atividade === "Torneio"){
      txt.innerHTML += ` | Adv: ${advDisplay} | Formato: ${item.formato} | Ban: ${item.banimentos}`;
    }
    
    const btns = document.createElement('div');
    btns.style.display = 'flex';
    btns.style.gap = '6px';

    const btnCopy = document.createElement('button');
    btnCopy.className = 'btn-copy';
    btnCopy.textContent = 'Copiar';
    btnCopy.onclick = () => { navigator.clipboard.writeText(txt.textContent).then(()=>alert('Copiado!')); };

    const btnDelete = document.createElement('button');
    btnDelete.className = 'btn-delete';
    btnDelete.textContent = 'Apagar';
    btnDelete.onclick = () => { deleteFromHistorico(idx); };

    btns.appendChild(btnCopy);
    btns.appendChild(btnDelete);

    li.appendChild(txt);
    li.appendChild(btns);
    ul.appendChild(li);
  });
}

function saveToStorage() {
  localStorage.setItem('agendaData', JSON.stringify(agendaData));
  localStorage.setItem('historico', JSON.stringify(historico));
}

function loadFromStorage() {
  const savedAgenda = JSON.parse(localStorage.getItem('agendaData'));
  const savedHist = JSON.parse(localStorage.getItem('historico'));
  if (savedAgenda) {
    for (let k in agendaData) {
      if (Array.isArray(savedAgenda[k])) agendaData[k] = savedAgenda[k];
    }
  }
  if (Array.isArray(savedHist)) historico = savedHist;
  for (let k of Object.keys(agendaData)) renderDay(k);
  renderHistorico();
}

function loadBanimentos(){
  const banSelect = document.getElementById('banimentos');
  pokemons.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = p;
    banSelect.appendChild(opt);
  });
}

document.getElementById('atividade').addEventListener('change', function(){
  const extraInfo = document.getElementById('extraInfo');
  const campeonatoLabel = document.getElementById('campeonatoLabel');
  const formatoSelect = document.getElementById('formato');
  
  if(this.value === "Scrim") {
    extraInfo.style.display = 'block';
    campeonatoLabel.style.display = 'none';
    document.getElementById('participantes').value = "Time";
    
    // Resetar para opções padrão de Scrim
    formatoSelect.innerHTML = `
      <option value="2x2">2x2</option>
      <option value="3x3">3x3</option>
    `;
  } 
  else if(this.value === "Torneio") {
    extraInfo.style.display = 'block';
    campeonatoLabel.style.display = 'flex';
    document.getElementById('participantes').value = "Time";
    
    // Adicionar opções específicas para Torneio
    formatoSelect.innerHTML = `
      <option value="MD3">MD3</option>
      <option value="MD5">MD5</option>
      <option value="2x2">2x2</option>
      <option value="3x3">3x3</option>
    `;
  }
  else {
    extraInfo.style.display = 'none';
  }
});

document.getElementById('formAtividade').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = document.getElementById('data').value;
  const horario = document.getElementById('horario').value;
  const atividade = document.getElementById('atividade').value;
  const responsavel = document.getElementById('responsavel').value;
  const participantes = document.getElementById('participantes').value;
  let adversario="", formato="", banimentos="", campeonato="";

  if(atividade === "Scrim" || atividade === "Torneio"){
    adversario = document.getElementById('adversario').value.trim();
    formato = document.getElementById('formato').value;
    banimentos = document.getElementById('banimentos').value;
    
    if(atividade === "Torneio") {
      campeonato = document.getElementById('campeonato').value.trim();
    }
    
    if (!adversario) {
      alert('Por favor, informe o nome do time adversário.');
      return;
    }
  }

  if (!data || !horario || !atividade || !responsavel || !participantes) {
    alert('Preencha todos os campos obrigatórios.');
    return;
  }

  const dia = getDiaSemanaId(data);
  if (agendaData[dia].length >= 6) {
    alert('Máximo de 6 atividades por dia.');
    return;
  }

  const activityObj = {
    id: Date.now().toString(),
    data, horario, atividade, responsavel, participantes,
    adversario, formato, banimentos, campeonato
  };

  agendaData[dia].push(activityObj);
  renderDay(dia);
  saveToStorage();
  this.reset();
  document.getElementById('extraInfo').style.display = 'none';
});

// Inicialização
loadBanimentos();
loadFromStorage();