// Dados das equipes
const equipesData = {
  staff: {
    titulo: "Corpo Administrativo",
    membros: [
      {
        nome: "Jonathas (Lobo)",
        cargo: "CEO & Fundador",
        descricao: "Responsável pela gestão geral da organização e desenvolvimento estratégico"
      },
      {
        nome: "Nathália (Nathy)",
        cargo: "Marketing & Comunicação",
        descricao: "Responsável pela comunicação externa, marketing digital e redes sociais"
      }
    ]
  },
  pokemon: {
    titulo: "Equipe Pokémon Unite",
    membros: [
      {
        nome: "George (Shad)",
        cargo: "Coach",
        descricao: "Orientar e desenvolver a equipe, analisando desempenhos, criando estratégias e fornecendo feedback, sendo essencial para melhorar habilidades individuais e o desempenho coletivo."
      },
      {
        nome: "Pedro (Almeida)",
        cargo: "Analista",
        descricao: "Estudar jogos, estatísticas e adversários, fornecendo informações estratégicas que ajudam a equipe a tomar decisões mais precisas e otimizar o desempenho coletivo."
      },
      {
        nome: "José Matheus (Leone)",
        cargo: "Manager",
        descricao: "Coordenar a equipe, organizar treinos, estratégias e comunicações, garantindo foco, disciplina e desempenho coletivo durante competições e atividades do time."
      },                  
      {
        nome: "Israel (Deivid)",
        cargo: "Speedster",
        descricao: "Jungler - Controlar o mapa, garantindo objetivos e criando vantagens, exigindo estratégia, decisões rápidas e boa coordenação com a equipe."
      },
      {
        nome: "N/A",
        cargo: "Attacker",
        descricao: "Attack Damage Carry - Responsável por causar dano constante à distância, mantendo pressão ofensiva e convertendo vantagens em vitórias, exigindo bom posicionamento para sobreviver e ser eficaz."
      },
      {
        nome: "Matheus (Navim)",
        cargo: "Support",
        descricao: "Support - Proteger e auxiliar a equipe, garantindo segurança, controle de visão e oportunidades estratégicas, sendo essencial para manter aliados vivos e fortalecer a presença do time no mapa."
      },
      {
        nome: "Lucas (Meendes)",
        cargo: "Defender",
        descricao: "Tank - Protege áreas-chave e aliados, absorvendo dano e controlando o espaço, sendo fundamental para manter a segurança e a estabilidade do time durante as partidas."
      },
      {
        nome: "Lucas (Anúbis)",
        cargo: "All-rounder",
        descricao: "Top Laner - Adaptar às necessidades do time, desempenhando múltiplos papéis como dano, controle ou suporte, sendo essencial para flexibilidade e equilíbrio durante as partidas."
      }
    ]
  },
  yugioh: {
    titulo: "Equipe Yu-Gi-Oh!",
    membros: [
      {
        nome: "Yago (Yagamy)",
        cargo: "Duelista Principal",
        descricao: "Especialista em decks meta - Foco em Salamangreat e Sky Striker"
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