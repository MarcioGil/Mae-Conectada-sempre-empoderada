/**
 * Serviço de Geolocalização para Emergências
 * Captura localização GPS e gera mensagens de emergência com coordenadas
 */

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

export interface EmergencyLocationResult {
  success: boolean;
  location?: LocationData;
  message: string;
  googleMapsUrl?: string;
  whatsappMessage?: string;
}

/**
 * Solicita permissão e captura localização atual
 */
export async function getCurrentLocation(): Promise<EmergencyLocationResult> {
  return new Promise((resolve) => {
    // Verificar se geolocalização está disponível
    if (!navigator.geolocation) {
      resolve({
        success: false,
        message: "GPS não está disponível neste dispositivo"
      });
      return;
    }

    // Configurações de alta precisão para emergência
    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 segundos
      maximumAge: 30000 // Cache de 30 segundos
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        };

        const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
        
        const whatsappMessage = `🚨 EMERGÊNCIA! 🚨
Preciso de ajuda urgente!

📍 Minha localização exata:
Latitude: ${location.latitude}
Longitude: ${location.longitude}
Precisão: ${Math.round(location.accuracy)}m

🗺️ Ver no mapa: ${googleMapsUrl}

⏰ Horário: ${new Date().toLocaleString('pt-BR')}

Por favor, me ajudem ou chamem socorro!`;

        resolve({
          success: true,
          location,
          message: "Localização capturada com sucesso",
          googleMapsUrl,
          whatsappMessage
        });
      },
      (error) => {
        let errorMessage = "Erro ao obter localização";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Permissão de localização negada. Ative o GPS nas configurações.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Localização não disponível. Verifique se o GPS está ativado.";
            break;
          case error.TIMEOUT:
            errorMessage = "Tempo limite para obter localização. Tente novamente.";
            break;
        }

        resolve({
          success: false,
          message: errorMessage
        });
      },
      options
    );
  });
}

/**
 * Monitora localização continuamente para emergências
 */
export function watchLocation(callback: (result: EmergencyLocationResult) => void): number | null {
  if (!navigator.geolocation) {
    callback({
      success: false,
      message: "GPS não está disponível neste dispositivo"
    });
    return null;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 60000 // Cache de 1 minuto
  };

  return navigator.geolocation.watchPosition(
    (position) => {
      const location: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: Date.now()
      };

      const googleMapsUrl = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      
      const whatsappMessage = `🚨 EMERGÊNCIA! 🚨
Preciso de ajuda urgente!

📍 Minha localização atual:
Latitude: ${location.latitude}
Longitude: ${location.longitude}
Precisão: ${Math.round(location.accuracy)}m

🗺️ Ver no mapa: ${googleMapsUrl}

⏰ Horário: ${new Date().toLocaleString('pt-BR')}

Por favor, me ajudem ou chamem socorro!`;

      callback({
        success: true,
        location,
        message: "Localização atualizada",
        googleMapsUrl,
        whatsappMessage
      });
    },
    (error) => {
      let errorMessage = "Erro ao monitorar localização";
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Permissão de localização negada";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Localização não disponível";
          break;
        case error.TIMEOUT:
          errorMessage = "Tempo limite para obter localização";
          break;
      }

      callback({
        success: false,
        message: errorMessage
      });
    },
    options
  );
}

/**
 * Para o monitoramento de localização
 */
export function stopWatchingLocation(watchId: number): void {
  navigator.geolocation.clearWatch(watchId);
}

/**
 * Solicita permissão de localização antecipadamente
 */
export async function requestLocationPermission(): Promise<boolean> {
  try {
    if (!navigator.geolocation) {
      return false;
    }

    // Fazer uma solicitação rápida para verificar permissão
    const result = await getCurrentLocation();
    return result.success;
  } catch (error) {
    return false;
  }
}

/**
 * Formata coordenadas para compartilhamento
 */
export function formatCoordinatesForSharing(location: LocationData): string {
  return `Lat: ${location.latitude.toFixed(6)}, Long: ${location.longitude.toFixed(6)}`;
}

/**
 * Calcula distância entre duas coordenadas (em metros)
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}