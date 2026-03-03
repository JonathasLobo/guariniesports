// ============================================
// SISTEMA DE AVALIAÇÃO DE BUILDS - build-rating.js
// ============================================

/**
 * Estrutura dos dados de avaliação no Firestore:
 * 
 * /usuarios/{userId}/builds/{buildId}
 * {
 *   ...dados da build...,
 *   ratings: {
 *     totalVotes: 10,
 *     totalStars: 45,
 *     average: 4.5,
 *     voters: {
 *       "userId1": 5,
 *       "userId2": 4,
 *       "userId3": 5
 *     }
 *   }
 * }
 */

// ============================================
// FUNÇÃO PARA CRIAR HTML DO SISTEMA DE AVALIAÇÃO
// ============================================

export function createRatingHTML(buildId, ratings, isOwnProfile, currentUserId) {
  console.log('🌟 Criando HTML de avaliação:', { buildId, ratings, isOwnProfile, currentUserId });
  
  // Valores padrão
  const totalVotes = ratings?.totalVotes || 0;
  const average = ratings?.average || 0;
  const userVote = ratings?.voters?.[currentUserId] || 0;
  
  // Se é o próprio perfil, mostrar avaliação desabilitada
  if (isOwnProfile) {
    return `
      <div class="build-rating-container disabled">
        <div class="build-average-rating">
          <span class="build-average-number">${average.toFixed(1)}</span>
          <span>⭐</span>
          <span class="build-total-votes">(${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'})</span>
        </div>
        <div class="build-stars-container">
          ${createStarsHTML(average, true)}
        </div>
        <div class="build-rating-disabled-message">
          You cannot rate your own builds
        </div>
      </div>
    `;
  }
  
  // Se não está logado
  if (!currentUserId) {
    return `
      <div class="build-rating-container">
        <div class="build-average-rating">
          <span class="build-average-number">${average.toFixed(1)}</span>
          <span>⭐</span>
          <span class="build-total-votes">(${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'})</span>
        </div>
        <div class="build-stars-container" data-build-id="${buildId}">
          ${createStarsHTML(userVote, false)}
        </div>
        <div class="rating-login-message">
          Login to rate this build
        </div>
      </div>
    `;
  }
  
  // Usuário logado e não é seu perfil - pode votar
  return `
    <div class="build-rating-container">
      <div class="build-average-rating">
        <span class="build-average-number">${average.toFixed(1)}</span>
        <span>⭐</span>
        <span class="build-total-votes">(${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'})</span>
      </div>
      <div class="build-stars-container" data-build-id="${buildId}" data-current-vote="${userVote}">
        ${createStarsHTML(userVote, false)}
      </div>
    </div>
  `;
}

// ============================================
// FUNÇÃO AUXILIAR PARA CRIAR HTML DAS ESTRELAS
// ============================================

function createStarsHTML(rating, disabled) {
  let starsHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating) ? 'filled' : '';
    const disabledClass = disabled ? 'disabled' : '';
    starsHTML += `<span class="build-star ${filled} ${disabledClass}" data-rating="${i}">★</span>`;
  }
  
  return starsHTML;
}

// ============================================
// FUNÇÃO PARA INICIALIZAR EVENTOS DAS ESTRELAS
// ============================================

export function initRatingEvents(profileUserId, db) {
  console.log('🎯 Inicializando eventos de avaliação para perfil:', profileUserId);
  
  const starsContainers = document.querySelectorAll('.build-stars-container:not(.disabled)');
  
  starsContainers.forEach(container => {
    // Efeito hover
    const stars = container.querySelectorAll('.build-star:not(.disabled)');
    
    stars.forEach((star, index) => {
      // Hover effect
      star.addEventListener('mouseenter', () => {
        highlightStars(stars, index + 1);
      });
      
      // Click para votar
      star.addEventListener('click', async () => {
        const rating = index + 1;
        const buildId = container.getAttribute('data-build-id');
        
        console.log('⭐ Votando:', { buildId, rating });
        
        await submitRating(profileUserId, buildId, rating, container, db);
      });
    });
    
    // Reset hover ao sair
    container.addEventListener('mouseleave', () => {
      const currentVote = parseInt(container.getAttribute('data-current-vote')) || 0;
      resetStars(stars, currentVote);
    });
  });
}

// ============================================
// FUNÇÃO PARA DESTACAR ESTRELAS NO HOVER
// ============================================

function highlightStars(stars, rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('hover-active');
    } else {
      star.classList.remove('hover-active');
    }
  });
}

// ============================================
// FUNÇÃO PARA RESETAR ESTRELAS
// ============================================

function resetStars(stars, currentVote) {
  stars.forEach((star, index) => {
    star.classList.remove('hover-active');
    
    if (index < currentVote) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

// ============================================
// FUNÇÃO PARA SUBMETER AVALIAÇÃO
// ============================================

async function submitRating(profileUserId, buildId, rating, container, db) {
  try {
    // Importar funções do Firebase
    const { getAuth } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js");
    const { doc, getDoc, updateDoc, increment } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
    
    const auth = getAuth();
    const currentUser = auth.currentUser;
    
    if (!currentUser) {
      alert('⚠️ You must be logged in to rate builds');
      return;
    }
    
    // Impedir próprio usuário de votar em suas builds
    if (currentUser.uid === profileUserId) {
      alert('⚠️ You cannot rate your own builds');
      return;
    }
    
    // Feedback visual
    container.classList.add('voting');
    
    console.log('💾 Salvando voto:', {
      profileUserId,
      buildId,
      rating,
      voterId: currentUser.uid
    });
    
    // Referência ao documento da build
    const buildRef = doc(db, "usuarios", profileUserId, "builds", buildId);
    const buildSnap = await getDoc(buildRef);
    
    if (!buildSnap.exists()) {
      alert('❌ Build not found');
      container.classList.remove('voting');
      return;
    }
    
    const buildData = buildSnap.data();
    const ratings = buildData.ratings || {
      totalVotes: 0,
      totalStars: 0,
      average: 0,
      voters: {}
    };
    
    // Verificar se usuário já votou
    const previousVote = ratings.voters[currentUser.uid] || 0;
    
    console.log('📊 Voto anterior:', previousVote);
    
    // Calcular novos valores
    let newTotalStars = ratings.totalStars || 0;
    let newTotalVotes = ratings.totalVotes || 0;
    
    if (previousVote > 0) {
      // Atualizar voto existente
      newTotalStars = newTotalStars - previousVote + rating;
    } else {
      // Novo voto
      newTotalStars = newTotalStars + rating;
      newTotalVotes = newTotalVotes + 1;
    }
    
    const newAverage = newTotalVotes > 0 ? newTotalStars / newTotalVotes : 0;
    
    console.log('📊 Novos valores:', {
      newTotalStars,
      newTotalVotes,
      newAverage
    });
    
    // Atualizar no Firestore
    await updateDoc(buildRef, {
      'ratings.totalVotes': newTotalVotes,
      'ratings.totalStars': newTotalStars,
      'ratings.average': newAverage,
      [`ratings.voters.${currentUser.uid}`]: rating
    });
    
    console.log('✅ Voto salvo com sucesso!');

    // ── Notificar outros módulos do site (ex: boss-raid) ──────
    // Disparar CustomEvent no document após o save confirmado.
    // Qualquer módulo pode escutar: document.addEventListener('ratingSubmitted', ...)
    // Também expor via window.onRatingSaved como alternativa direta.
    document.dispatchEvent(new CustomEvent('ratingSubmitted', {
      detail: { profileUserId, buildId, rating, voterId: currentUser.uid }
    }));
    if (typeof window.onRatingSaved === 'function') {
      window.onRatingSaved({ profileUserId, buildId, rating, voterId: currentUser.uid });
    }
    // Fallback: se o listener de ratingSubmitted nao estiver registrado ainda,
    // salvar diretamente no localStorage para o boss-raid consumir depois.
    // O perfil-view limpa esse valor se conseguir processar via CustomEvent.
    if (typeof window.missaoDiariaCompleta === 'function') {
      // boss-raid esta na mesma pagina — chamar diretamente
      window.missaoDiariaCompleta('avaliar_build');
    } else {
      try { localStorage.setItem('bossraid_pending_mission', 'avaliar_build'); } catch(e) {}
    }
    
    // Atualizar UI
    container.setAttribute('data-current-vote', rating);
    
    const stars = container.querySelectorAll('.build-star');
    stars.forEach((star, index) => {
      star.classList.remove('just-voted');
      
      if (index < rating) {
        star.classList.add('filled');
        star.classList.add('just-voted');
      } else {
        star.classList.remove('filled');
      }
    });
    
    // Atualizar média exibida
    const ratingContainer = container.closest('.build-rating-container');
    const averageElement = ratingContainer.querySelector('.build-average-number');
    const votesElement = ratingContainer.querySelector('.build-total-votes');
    
    if (averageElement) {
      averageElement.textContent = newAverage.toFixed(1);
    }
    
    if (votesElement) {
      votesElement.textContent = `(${newTotalVotes} ${newTotalVotes === 1 ? 'vote' : 'votes'})`;
    }
    
    // Remover feedback visual
    container.classList.remove('voting');
    
    // Feedback de sucesso
    console.log('🎉 Interface atualizada!');
    
  } catch (error) {
    console.error('❌ Erro ao salvar voto:', error);
    alert('❌ Error saving your vote: ' + error.message);
    container.classList.remove('voting');
  }
}

// ============================================
// FUNÇÃO PARA CARREGAR AVALIAÇÕES DE UMA BUILD
// ============================================

export async function loadBuildRating(profileUserId, buildId, db) {
  try {
    const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js");
    
    const buildRef = doc(db, "usuarios", profileUserId, "builds", buildId);
    const buildSnap = await getDoc(buildRef);
    
    if (!buildSnap.exists()) {
      return null;
    }
    
    const buildData = buildSnap.data();
    return buildData.ratings || {
      totalVotes: 0,
      totalStars: 0,
      average: 0,
      voters: {}
    };
    
  } catch (error) {
    console.error('❌ Erro ao carregar avaliação:', error);
    return null;
  }
}

// ============================================
// VERSÃO SIMPLIFICADA - APENAS VISUALIZAÇÃO (SEM ESTRELAS)
// ============================================

export function createRatingViewOnly(buildId, ratings) {
  console.log('📊 Criando visualização de rating (sem estrelas):', { buildId, ratings });
  
  const totalVotes = ratings?.totalVotes || 0;
  const average = ratings?.average || 0;
  
  return `
    <div class="build-rating-container build-rating-view-only">
      <div class="build-average-rating">
        <span class="build-average-number">${average.toFixed(1)}</span>
        <span>⭐</span>
        <span class="build-total-votes">(${totalVotes} ${totalVotes === 1 ? 'vote' : 'votes'})</span>
      </div>
    </div>
  `;
}