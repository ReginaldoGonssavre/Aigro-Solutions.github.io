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
      "product_1_tagline": "Unlocking Predictive Power with Quantum Algorithms",
      "product_1_description": "A SaaS platform for advanced predictive analytics and pattern detection in complex datasets, leveraging quantum algorithms for unparalleled accuracy and speed. Ideal for accelerated drug discovery, optimized financial portfolios, and quantum sensor data analysis.",
      "product_2_name": "QuantumRisk Guardian",
      "product_2_tagline": "Fortifying Your Future Against Quantum Threats",
      "product_2_description": "A robust solution for identifying, mitigating, and managing risks in quantum-sensitive environments. Provides insights into post-quantum cybersecurity vulnerabilities, optimizes supply chains under quantum uncertainties, and models volatile market risks.",
      "product_3_name": "QuantumEco AI",
      "product_3_tagline": "Quantum Optimization for a Sustainable Planet",
      "product_3_description": "Applies quantum algorithms to solve large-scale optimization problems in sustainability and resource management. Enables intelligent energy grid optimization, design of sustainable materials with quantum properties, and complex climate model simulations."
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
      "product_1_tagline": "Desvendando o Poder Preditivo com Algoritmos Quânticos",
      "product_1_description": "Uma plataforma SaaS para análise preditiva avançada e detecção de padrões em conjuntos de dados complexos, utilizando algoritmos quânticos para precisão e velocidade inigualáveis. Ideal para descoberta acelerada de medicamentos, portfólios financeiros otimizados e análise de dados de sensores quânticos.",
      "product_2_name": "QuantumRisk Guardian",
      "product_2_tagline": "Fortalecendo Seu Futuro Contra Ameaças Quânticas",
      "product_2_description": "Uma solução robusta para identificar, mitigar e gerenciar riscos em ambientes sensíveis à quântica. Fornece insights sobre vulnerabilidades de cibersegurança pós-quântica, otimiza cadeias de suprimentos sob incertezas quânticas e modela riscos de mercado voláteis.",
      "product_3_name": "QuantumEco AI",
      "product_3_tagline": "Otimização Quântica para um Planeta Sustentável",
      "product_3_description": "Aplica algoritmos quânticos para resolver problemas de otimização em larga escala relacionados à sustentabilidade e gestão de recursos. Permite a otimização inteligente de redes de energia, o design de materiais sustentáveis com propriedades quânticas e simulações complexas de modelos climáticos."
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