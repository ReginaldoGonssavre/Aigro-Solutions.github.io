import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// the translations
// (tip: move them in a JSON file and load them via xhr) 
const resources = {
  en: {
    translation: {
      "welcome_title": "Welcome to Aigro Quantum SaaS",
      "welcome_subtitle": "Your pioneering platform for quantum digital products.",
      "learn_more": "Explore Our Quantum Solutions",
      "our_features": "Our Core Quantum Capabilities",
      "quantum_optimization_title": "Quantum Optimization",
      "quantum_optimization_description": "Solve complex problems with quantum algorithms, achieving unprecedented efficiency.",
      "hybrid_data_analysis_title": "Hybrid Data Analysis",
      "hybrid_data_analysis_description": "Combine quantum and classical power for deep, actionable insights from vast datasets.",
      "image_upload_title": "Quantum Data Ingestion",
      "upload_button": "Upload Data Sample",
      "no_file_selected": "No file selected.",
      "file_selected": "File selected: {{fileName}} ({{fileSize}} KB)",
      "upload_note": "Note: A secure quantum-enabled backend is required for full data processing and analysis.",
      "all_rights_reserved": "All rights reserved.",
      "about_title": "About Aigro Quantum SaaS: Pioneering the Quantum Future",
      "about_description": "Aigro Quantum SaaS is at the forefront of quantum innovation, developing groundbreaking digital products that leverage the power of quantum computing. We empower businesses to tackle challenges previously deemed intractable, unlocking new frontiers in data analysis, risk management, and sustainable optimization.",
      "eula_link": "End User License Agreement (EULA)",
      "our_products_title": "Our Revolutionary Quantum Digital Products",
      "product_1_name": "QuantumPredict Pro",
      "product_1_tagline": "AI-Quantum Predictive Analytics for Global Industries",
      "product_1_description": "A SaaS platform leveraging Quantum Machine Learning (QML) for advanced predictive analytics across complex datasets. Applications include optimizing satellite trajectories (Space), predicting aircraft maintenance needs (Air), forecasting maritime logistics (Maritime), and enhancing autonomous vehicle safety (Automotive).",
      "product_2_name": "QuantumRisk Guardian",
      "product_2_tagline": "Quantum & Post-Quantum Risk Management for Critical Infrastructures",
      "product_2_description": "A robust solution for identifying, mitigating, and managing risks in quantum-sensitive environments. Offers Post-Quantum Cryptography (PQC) for secure communications (Space, Air, Maritime), Quantum Market Risk Modeling for global supply chains (Automotive, Maritime), and resilience against cyber threats in critical infrastructure.",
      "product_3_name": "QuantumEco AI",
      "product_3_tagline": "Quantum Optimization for Sustainable Global Operations",
      "product_3_description": "Applies quantum algorithms to solve large-scale sustainability and resource management challenges. Includes Quantum Energy Optimization for smart grids (Automotive charging networks), Quantum Design of Advanced Materials (Aerospace, Automotive), and Quantum Climate Modeling for environmental impact assessment (Maritime routes, Space debris).",
      "product_4_name": "QuantumSense Connect",
      "product_4_tagline": "Integrating & Analyzing Quantum Sensor Data for Industrial Precision",
      "product_4_description": "A new platform for integrating and analyzing data from quantum sensors in industrial applications. Provides APIs for ingesting data from advanced quantum sensors (e.g., for ultra-precise navigation in Space/Air, structural integrity monitoring in Maritime/Automotive), real-time visualization, and AI-Quantum powered alerts and recommendations."
    }
  },
  pt: {
    translation: {
      "welcome_title": "Bem-vindo à Aigro Quantum SaaS",
      "welcome_subtitle": "Sua plataforma pioneira para produtos digitais quânticos.",
      "learn_more": "Explore Nossas Soluções Quânticas",
      "our_features": "Nossas Capacidades Quânticas Essenciais",
      "quantum_optimization_title": "Otimização Quântica",
      "quantum_optimization_description": "Resolva problemas complexos com algoritmos quânticos, alcançando eficiência sem precedentes.",
      "hybrid_data_analysis_title": "Análise de Dados Híbrida",
      "hybrid_data_analysis_description": "Combine o poder quântico e clássico para insights profundos e acionáveis a partir de vastos conjuntos de dados.",
      "image_upload_title": "Ingestão de Dados Quânticos",
      "upload_button": "Carregar Amostra de Dados",
      "no_file_selected": "Nenhum arquivo selecionado.",
      "file_selected": "Arquivo selecionado: {{fileName}} ({{fileSize}} KB)",
      "upload_note": "Nota: Um backend seguro e habilitado para quântica é necessário para o processamento e análise completos dos dados.",
      "all_rights_reserved": "Todos os direitos reservados.",
      "about_title": "Sobre a Aigro Quantum SaaS: Pioneirando o Futuro Quântico",
      "about_description": "A Aigro Quantum SaaS está na vanguarda da inovação quântica, desenvolvendo produtos digitais revolucionários que aproveitam o poder da computação quântica. Capacitamos empresas a enfrentar desafios antes considerados intratáveis, desvendando novas fronteiras na análise de dados, gerenciamento de riscos e otimização sustentável.",
      "eula_link": "Contrato de Licença de Usuário Final (EULA)",
      "our_products_title": "Nossos Produtos Digitais Quânticos Revolucionários",
      "product_1_name": "QuantumPredict Pro",
      "product_1_tagline": "Análise Preditiva AI-Quântica para Indústrias Globais",
      "product_1_description": "Uma plataforma SaaS que alavanca Machine Learning Quântico (QML) para análise preditiva avançada em conjuntos de dados complexos. Aplicações incluem otimização de trajetórias de satélites (Espacial), previsão de necessidades de manutenção de aeronaves (Aéreo), previsão de logística marítima (Marítimo) e aprimoramento da segurança de veículos autônomos (Automobilístico).",
      "product_2_name": "QuantumRisk Guardian",
      "product_2_tagline": "Gestão de Riscos Quânticos e Pós-Quânticos para Infraestruturas Críticas",
      "product_2_description": "Uma solução robusta para identificar, mitigar e gerenciar riscos em ambientes sensíveis à quântica. Oferece Criptografia Pós-Quântica (PQC) para comunicações seguras (Espacial, Aéreo, Marítimo), Modelagem de Risco de Mercado Quântico para cadeias de suprimentos globais (Automobilístico, Marítimo) e resiliência contra ameaças cibernéticas em infraestruturas críticas.",
      "product_3_name": "QuantumEco AI",
      "product_3_tagline": "Otimização Quântica para Operações Globais Sustentáveis",
      "product_3_description": "Aplica algoritmos quânticos para resolver desafios de sustentabilidade e gestão de recursos em larga escala. Inclui Otimização Quântica de Energia para redes inteligentes (redes de carregamento automotivo), Design Quântico de Materiais Avançados (Aeroespacial, Automobilístico) e Modelagem Climática Quântica para avaliação de impacto ambiental (rotas marítimas, detritos espaciais).",
      "product_4_name": "QuantumSense Connect",
      "product_4_tagline": "Integrando e Analisando Dados de Sensores Quânticos para Precisão Industrial",
      "product_4_description": "Uma nova plataforma para integrar e analisar dados de sensores quânticos em aplicações industriais. Fornece APIs para ingestão de dados de sensores quânticos avançados (ex: para navegação ultraprecisa no Espaço/Aéreo, monitoramento de integridade estrutural no Marítimo/Automobilístico), visualização em tempo real e alertas e recomendações alimentados por IA-Quântica."
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