import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FontSizeProvider } from "./components/FontSizeProvider";
import { LanguageProvider, useTranslations } from "./components/LanguageProvider";

function MainContent() {
  const t = useTranslations();
  
  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 py-8" tabIndex={-1}>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl mb-4">{t.welcome}</h2>
        <p className="text-gray-600 mb-4">{t.description}</p>
        <p className="text-gray-600">{t.tryFontSize}</p>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <FontSizeProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </FontSizeProvider>
    </LanguageProvider>
  );
}