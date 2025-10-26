'use client';

/**
 * Utilitário de navegação para compliance total
 * Garante funcionamento 100% no GitHub Pages
 */

export function navigateToPageSafely(href: string): void {
  try {
    // Detectar ambiente de produção (GitHub Pages)
    const isGitHubPages = typeof window !== 'undefined' && (
      window.location.hostname.includes('github.io') ||
      window.location.pathname.includes('Mae-Conecta') ||
      window.location.href.includes('Mae-Conecta')
    );
    
    if (isGitHubPages) {
      // Garantir basePath correto para GitHub Pages
      let targetUrl = href;
      
      // Adicionar basePath se necessário
      if (!href.startsWith('/Mae-Conecta') && !href.startsWith('http')) {
        targetUrl = `/Mae-Conecta${href}`;
      }
      
      // Log para debug
      console.log('🔗 Navegação GitHub Pages:', {
        original: href,
        final: targetUrl,
        currentUrl: window.location.href
      });
      
      // Navegação forçada e segura
      window.location.href = targetUrl;
      
    } else {
      // Desenvolvimento local
      console.log('🔗 Navegação local:', href);
      
      // Tentar usar router se disponível, senão usar window.location
      if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    }
  } catch (error) {
    console.error('❌ Erro na navegação:', error);
    
    // Fallback final - sempre funciona
    if (typeof window !== 'undefined') {
      const fallbackUrl = href.startsWith('/Mae-Conecta') ? href : `/Mae-Conecta${href}`;
      window.location.href = fallbackUrl;
    }
  }
}

/**
 * Verificar se uma página existe antes de navegar
 */
export async function checkPageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return true; // Assumir que existe se não conseguir verificar
  }
}

/**
 * Navegação com verificação de existência da página
 */
export async function navigateWithCheck(href: string): Promise<void> {
  const targetUrl = href.startsWith('/Mae-Conecta') ? href : `/Mae-Conecta${href}`;
  
  // Verificar se a página existe
  const exists = await checkPageExists(targetUrl);
  
  if (exists) {
    navigateToPageSafely(href);
  } else {
    console.error('❌ Página não encontrada:', targetUrl);
    // Redirecionar para home em caso de erro
    navigateToPageSafely('/');
  }
}