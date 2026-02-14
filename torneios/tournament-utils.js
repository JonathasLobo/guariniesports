// tournament-utils.js - Funções compartilhadas entre modules
export function normalizeTeamName(name) {
  if (!name) return '';
  return name.trim().toLowerCase();
}

export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function validatePlayerId(playerId) {
  if (!playerId || typeof playerId !== 'string') return false;
  return playerId.length === 7 && /^[A-Z0-9]+$/.test(playerId);
}

export function validateTeamId(teamId) {
  if (!teamId || typeof teamId !== 'string') return false;
  return teamId.length === 8 && /^[A-Z0-9]+$/.test(teamId);
}