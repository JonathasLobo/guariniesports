// Dados das equipes
const equipesData = {
  staff: {
    titulo: "Corpo Técnico",
    membros: [
      {
        nome: "João Silva",
        cargo: "CEO & Fundador",
        descricao: "Responsável pela gestão geral da organização e desenvolvimento estratégico"
      },
      {
        nome: "Maria Santos",
        cargo: "Gerente de Equipes",
        descricao: "Coordena todas as equipes competitivas e gerencia os cronogramas de treinamento"
      },
      {
        nome: "Pedro Costa",
        cargo: "Analista de Performance",
        descricao: "Analisa dados de performance dos jogadores e desenvolve estratégias de melhoria"
      },
      {
        nome: "Ana Oliveira",
        cargo: "Marketing & Comunicação",
        descricao: "Responsável pela comunicação externa, marketing digital e redes sociais"
      }
    ]
  },
  pokemon: {
    titulo: "Equipe Pokemon Unite",
    membros: [
      {
        nome: "Carlos Mendes",
        cargo: "Capitão da Equipe",
        descricao: "Main Jungle - Especialista em Garchomp e Absol"
      },
      {
        nome: "Rafael Torres",
        cargo: "Atacante Principal",
        descricao: "Main Attacker - Expert em Cinderace e Pikachu"
      },
      {
        nome: "Bruno Lima",
        cargo: "Suporte",
        descricao: "Main Support - Especialista em Blissey e Eldegoss"
      },
      {
        nome: "Diego Ferreira",
        cargo: "Defensor",
        descricao: "Main Defender - Expert em Slowbro e Crustle"
      },
      {
        nome: "Lucas Rocha",
        cargo: "All-rounder",
        descricao: "Flexível - Especialista em Lucario e Machamp"
      }
    ]
  },
  yugioh: {
    titulo: "Equipe YugiOh",
    membros: [
      {
        nome: "Gabriel Alves",
        cargo: "Duelista Principal",
        descricao: "Especialista em decks meta - Foco em Salamangreat e Sky Striker"
      },
      {
        nome: "Mateus Souza",
        cargo: "Estrategista",
        descricao: "Analista de meta e desenvolvedor de side decks"
      },
      {
        nome: "Felipe Ramos",
        cargo: "Duelista Competitivo",
        descricao: "Expert em formatos alternativos e torneios regionais"
      },
      {
        nome: "Thiago Barbosa",
        cargo: "Coach",
        descricao: "Treinador da equipe e analista de matchups"
      }
    ]
  }
};

// Elementos do DOM
const modal = document.getElementById('equipeModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

const staffBtn = document.getElementById('staffBtn');
const pokemonBtn = document.getElementById('pokemonBtn');
const yugiohBtn = document.getElementById('yugiohBtn');

// Função para abrir o modal
function abrirModal(equipeKey) {
  const equipe = equipesData[equipeKey];
  if (!equipe) return;

  modalTitle.textContent = equipe.titulo;
  
  // Gerar HTML dos membros
  let membrosHTML = '';
  equipe.membros.forEach(membro => {
    membrosHTML += `
      <div class="membro-card">
        <h4>${membro.nome}</h4>
        <p class="cargo">${membro.cargo}</p>
        <p class="descricao-membro">${membro.descricao}</p>
      </div>
    `;
  });

  modalBody.innerHTML = membrosHTML;
  modalBody.className = 'modal-body';
  modal.style.display = 'block';
  
  // Previne scroll do body quando modal está aberto
  document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function fecharModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event listeners
staffBtn.addEventListener('click', () => abrirModal('staff'));
pokemonBtn.addEventListener('click', () => abrirModal('pokemon'));
yugiohBtn.addEventListener('click', () => abrirModal('yugioh'));

closeBtn.addEventListener('click', fecharModal);

// Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    fecharModal();
  }
});

// Fechar modal com a tecla ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    fecharModal();
  }
});

// Prevenir scroll da página principal quando o modal estiver aberto
modal.addEventListener('scroll', (event) => {
  event.stopPropagation();
});