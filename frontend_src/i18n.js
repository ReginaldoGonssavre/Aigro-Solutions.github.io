import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: move them in a JSON file and load them via xhr) 
const resources = {
  en: {
    translation: {
      "welcome_title": "Welcome to Aigro Quantum SaaS",
      "welcome_subtitle": "Your hybrid quantum computing platform.",
      "learn_more": "Learn More",
      "our_features": "Our Features",
      "quantum_optimization_title": "Quantum Optimization",
      "quantum_optimization_description": "Solve complex problems with quantum algorithms.",
      "hybrid_data_analysis_title": "Hybrid Data Analysis",
      "hybrid_data_analysis_description": "Combine quantum and classical power for deep insights.",
      "image_upload_title": "Image Upload",
      "upload_button": "Upload Image",
      "no_file_selected": "No file selected.",
      "file_selected": "File selected: {{fileName}} ({{fileSize}} KB)",
      "upload_note": "Note: A backend is required for full upload and processing functionality.",
      "all_rights_reserved": "All rights reserved.",
      "about_title": "About Aigro Quantum SaaS",
      "about_description": "Aigro Quantum SaaS is a cutting-edge platform designed to harness the power of hybrid quantum computing. We provide innovative solutions for complex optimization and data analysis challenges, empowering businesses to achieve unprecedented insights and efficiency."
    }
  },
  pt: {
    translation: {
      "welcome_title": "Bem-vindo à Aigro Quantum SaaS",
      "welcome_subtitle": "Sua plataforma de computação quântica híbrida.",
      "learn_more": "Saiba Mais",
      "our_features": "Nossos Recursos",
      "quantum_optimization_title": "Otimização Quântica",
      "quantum_optimization_description": "Resolva problemas complexos com algoritmos quânticos.",
      "hybrid_data_analysis_title": "Análise de Dados Híbrida",
      "hybrid_data_analysis_description": "Combine o poder quântico e clássico para insights profundos.",
      "image_upload_title": "Upload de Imagem",
      "upload_button": "Carregar Imagem",
      "no_file_selected": "Nenhum arquivo selecionado.",
      "file_selected": "Arquivo selecionado: {{fileName}} ({{fileSize}} KB)",
      "upload_note": "Nota: Um backend é necessário para a funcionalidade completa de upload e processamento.",
      "all_rights_reserved": "Todos os direitos reservados.",
      "about_title": "Sobre a Aigro Quantum SaaS",
      "about_description": "A Aigro Quantum SaaS é uma plataforma de ponta projetada para aproveitar o poder da computação quântica híbrida. Fornecemos soluções inovadoras para desafios complexos de otimização e análise de dados, capacitando as empresas a obter insights e eficiência sem precedentes."
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "pt", // default language
    fallbackLng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;