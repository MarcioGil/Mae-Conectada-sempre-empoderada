/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Extensão da interface Window para Web Speech API
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}