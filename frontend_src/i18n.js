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
      "product_1_tagline": "AI-Quantum Predictive Analytics for Precision Agriculture",
      "product_1_description": "A SaaS platform leveraging Quantum Machine Learning (QML) for advanced predictive analytics in agriculture. Features include Quantum Satellite Image Analysis for early disease/stress detection, QML-optimized Yield Forecasting, and Quantum Optimization of Agricultural Resources (water, fertilizers, pesticides).",
      "product_2_name": "QuantumRisk Guardian",
      "product_2_tagline": "Quantum & Post-Quantum Risk Management for Agri-Supply Chains",
      "product_2_description": "A robust solution for protecting the agricultural value chain against emerging threats. Offers Post-Quantum Cryptography (PQC) for sensitive farm data, Quantum Market Risk Modeling for commodity price fluctuations, and Quantum-Optimized Supply Chain Resilience against disruptions.",
      "product_3_name": "QuantumEco AI",
      "product_3_tagline": "Quantum Optimization for Sustainable Agri-Environmental Solutions",
      "product_3_description": "Applies quantum algorithms to solve large-scale sustainability challenges in agriculture. Includes Quantum Energy Optimization for Smart Farms, Quantum Design of Biofuels & Materials, and Quantum Climate Modeling for agricultural impact prediction.",
      "product_4_name": "QuantumSense Connect",
      "product_4_tagline": "Integrating & Analyzing Quantum Sensor Data for Agriculture",
      "product_4_description": "A new platform for integrating and analyzing data from quantum sensors in agricultural applications. Provides APIs for ingesting data from advanced quantum sensors (e.g., for atomic-precision soil moisture, quantum pest detection), real-time visualization, and AI-Quantum powered alerts and recommendations."
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
      "product_1_tagline": "Análise Preditiva AI-Quântica para Agricultura de Precisão",
      "product_1_description": "Uma plataforma SaaS que alavanca Machine Learning Quântico (QML) para análise preditiva avançada na agricultura. Inclui Análise Quântica de Imagens de Satélite para detecção precoce de doenças/estresse, Previsão de Rendimento Otimizada por QML e Otimização Quântica de Recursos Agrícolas (água, fertilizantes, pesticidas).",
      "product_2_name": "QuantumRisk Guardian",
      "product_2_tagline": "Gestão de Riscos Quânticos e Pós-Quânticos para Cadeias de Suprimentos Agrícolas",
      "product_2_description": "Uma solução robusta para proteger a cadeia de valor agrícola contra ameaças emergentes. Oferece Criptografia Pós-Quântica (PQC) para dados sensíveis de fazendas, Modelagem de Risco de Mercado Quântico para flutuações de preços de commodities e Otimização Quântica da Resiliência da Cadeia de Suprimentos contra interrupções.",
      "product_3_name": "QuantumEco AI",
      "product_3_tagline": "Otimização Quântica para Soluções Agri-Ambientais Sustentáveis",
      "product_3_description": "Aplica algoritmos quânticos para resolver desafios de sustentabilidade em larga escala na agricultura. Inclui Otimização Quântica de Energia para Fazendas Inteligentes, Design Quântico de Biocombustíveis e Materiais, e Modelagem Climática Quântica para previsão de impacto agrícola.",
      "product_4_name": "QuantumSense Connect",
      "product_4_tagline": "Integrando e Analisando Dados de Sensores Quânticos para Agricultura",
      "product_4_description": "Uma nova plataforma para integrar e analisar dados de sensores quânticos em aplicações agrícolas. Fornece APIs para ingestão de dados de sensores quânticos avançados (ex: para umidade do solo com precisão atômica, detecção de pragas por assinaturas quânticas), visualização em tempo real e alertas e recomendações alimentados por IA-Quântica."
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