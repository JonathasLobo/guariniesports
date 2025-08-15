// ===== FUNCIONALIDADES DOS VÍDEOS - GUARINÍ E-SPORT =====

// Array com os títulos das jogadas (personalize com os nomes dos seus jogadores)
const jogadas = [
  "Roubo de Rayquaza espetacular do <span class='jogador'>LOBO</span>",
  "Penta de respeito do <span class='jogador'>ANUBIS</span>", 
  "Fora do meta? Não para o <span class='jogador'>SHAD</span>"
];

let currentVideo = 1;
let videoTimers = new Map(); // Para controlar os timers individuais

/**
 * Função para controlar duração de 30 segundos
 * @param {HTMLVideoElement} video - Elemento de vídeo
 */
function setup30SecondLimit(video) {
  video.addEventListener('play', function() {
    // Limpar timer anterior se existir
    if (videoTimers.has(this)) {
      clearTimeout(videoTimers.get(this));
    }
    
    // Criar novo timer de 30 segundos
    const timer = setTimeout(() => {
      if (!this.paused) {
        this.pause();
        this.currentTime = 0;
        
        // Passar para o próximo vídeo automaticamente
        let nextVideo = currentVideo + 1;
        if (nextVideo > 3) nextVideo = 1;
        showVideo(nextVideo);
        
        console.log('Vídeo completou 30 segundos, passando para o próximo');
      }
    }, 30000);
    
    videoTimers.set(this, timer);
  });
  
  video.addEventListener('pause', function() {
    // Limpar timer quando pausado manualmente
    if (videoTimers.has(this)) {
      clearTimeout(videoTimers.get(this));
      videoTimers.delete(this);
    }
  });
}

/**
 * Função para mostrar um vídeo específico
 * @param {number} videoNumber - Número do vídeo (1, 2 ou 3)
 */
function showVideo(videoNumber) {
  // Esconder todos os vídeos
  const allVideos = document.querySelectorAll('.video-item');
  const allIndicators = document.querySelectorAll('.indicator');
  
  allVideos.forEach(video => {
    video.classList.remove('active');
    const videoElement = video.querySelector('video');
    videoElement.pause();
    videoElement.currentTime = 0;
  });
  
  // Remover active de todos os indicadores
  allIndicators.forEach(indicator => {
    indicator.classList.remove('active');
  });

  // Mostrar vídeo selecionado
  const selectedVideo = document.querySelector(`[data-video="${videoNumber}"]`);
  const selectedIndicator = document.querySelectorAll('.indicator')[videoNumber - 1];
  
  selectedVideo.classList.add('active');
  selectedIndicator.classList.add('active');

  // Atualizar texto da jogada
  document.getElementById('jogada-texto').innerHTML = jogadas[videoNumber - 1];
  
  // Atualizar vídeo atual
  currentVideo = videoNumber;

  // Auto-play do novo vídeo
  const newVideoElement = selectedVideo.querySelector('video');
  newVideoElement.play().catch(e => console.log('Auto-play blocked:', e));
}

/**
 * Função para alternar entre play/pause
 * @param {HTMLElement} button - Botão que foi clicado
 */
function togglePlay(button) {
  const videoItem = button.closest('.video-item');
  const video = videoItem.querySelector('video');
  
  if (video.paused) {
    video.play();
    button.textContent = '⏸';
  } else {
    video.pause();
    button.textContent = '▶';
  }
}

/**
 * Função para ajustar o volume
 * @param {HTMLElement} slider - Elemento do slider de volume
 * @param {Event} event - Evento do clique
 */
function adjustVolume(slider, event) {
  const rect = slider.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const percentage = Math.max(0, Math.min(1, x / rect.width));
  
  const activeVideo = document.querySelector('.video-item.active video');
  activeVideo.volume = percentage;
  
  // Visual feedback no slider
  slider.style.background = `linear-gradient(to right, #ffad00 0%, #ffad00 ${percentage * 100}%, rgba(255,255,255,0.3) ${percentage * 100}%, rgba(255,255,255,0.3) 100%)`;
}

/**
 * Função para inicializar os vídeos quando a página carrega
 */
function initializeVideos() {
  // Auto-start primeiro vídeo
  const firstVideo = document.querySelector('.video-item.active video');
  if (firstVideo) {
    firstVideo.play().catch(e => console.log('Auto-play blocked:', e));
  }
  
  // Configurar event listeners para todos os vídeos
  const allVideos = document.querySelectorAll('.video-item video');
  allVideos.forEach(video => {
    // Configurar limite de 30 segundos
    setup30SecondLimit(video);
    
    // Quando o vídeo começa a tocar
    video.addEventListener('play', function() {
      const button = this.parentElement.querySelector('.play-pause-btn');
      if (button) button.textContent = '⏸';
    });
    
    // Quando o vídeo é pausado
    video.addEventListener('pause', function() {
      const button = this.parentElement.querySelector('.play-pause-btn');
      if (button) button.textContent = '▶';
    });
    
    // Quando o vídeo termina naturalmente
    video.addEventListener('ended', function() {
      const button = this.parentElement.querySelector('.play-pause-btn');
      if (button) button.textContent = '▶';
      
      // Se o vídeo é mais curto que 30s, pode reiniciar
      if (this.duration < 30) {
        this.currentTime = 0;
        this.play();
      }
    });
  });
}

// ===== INICIALIZAÇÃO =====

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  initializeVideos();
});

// ===== FUNÇÕES UTILITÁRIAS =====

/**
 * Função para parar todos os vídeos
 */
function stopAllVideos() {
  const allVideos = document.querySelectorAll('.video-item video');
  allVideos.forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

/**
 * Função para definir volume para todos os vídeos
 * @param {number} volume - Volume de 0 a 1
 */
function setGlobalVolume(volume) {
  const allVideos = document.querySelectorAll('.video-item video');
  allVideos.forEach(video => {
    video.volume = volume;
  });
}

/**
 * Função para obter informações do vídeo atual
 * @returns {Object} Informações do vídeo atual
 */
function getCurrentVideoInfo() {
  const activeVideo = document.querySelector('.video-item.active video');
  if (!activeVideo) return null;
  
  return {
    videoNumber: currentVideo,
    duration: activeVideo.duration,
    currentTime: activeVideo.currentTime,
    paused: activeVideo.paused,
    volume: activeVideo.volume
  };
}