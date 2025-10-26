/**
 * Utilitários para roteamento no GitHub Pages
 */

// Detecta se estamos no GitHub Pages
export const isGitHubPages = typeof window !== 'undefined' && 
  window.location.hostname === 'marciogil.github.io';

// Base path do GitHub Pages
export const basePath = isGitHubPages ? '/Mae-Conecta' : '';

/**
 * Cria uma rota completa com basePath quando necessário
 * @param path - Caminho da rota (ex: '/direitos')
 * @returns Rota completa para o ambiente atual
 */
export function createRoute(path: string): string {
  // Se já tem o basePath, retorna como está
  if (path.startsWith('/Mae-Conecta')) {
    return path;
  }
  
  // Adiciona basePath se estiver no GitHub Pages
  return `${basePath}${path}`;
}

/**
 * Navega para uma rota usando o método apropriado para o ambiente
 * @param router - Router do Next.js
 * @param path - Caminho da rota
 */
export function navigateToRoute(router: any, path: string): void {
  if (isGitHubPages) {
    // No GitHub Pages, usa window.location para garantir funcionamento
    window.location.href = createRoute(path);
  } else {
    // Em desenvolvimento, usa router.push
    router.push(path);
  }
}