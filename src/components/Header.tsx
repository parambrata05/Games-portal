import { ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import skillBridgeLogo from 'figma:asset/69fdc19843d64074ee7614ce751659e0561b9a01.png';
import sihLogo from 'figma:asset/d826f773271919ef5a554dd102edd6b7eb45dc7d.png';
import ashokaEmblem from 'figma:asset/464268ea7c7279c2e939a24fa006f95a123492d2.png';
import { useFontSize } from './FontSizeProvider';
import { useLanguage, useTranslations, languageNames, Language } from './LanguageProvider';
import { useState } from 'react';

export function Header() {
  const { fontSize, decreaseFontSize, setFontSize, increaseFontSize } = useFontSize();
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const regionalLanguages: Language[] = ['hindi', 'bengali', 'tamil', 'telugu', 'marathi', 'gujarati', 'kannada', 'malayalam', 'punjabi', 'odia', 'assamese'];

  const handleSitemapClick = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSkipToMainClick = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
      mainContent.focus();
    }
  };

  return (
    <header className="w-full">
      {/* Top utility bar */}
      <div className="bg-[#1a3b73] px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-6 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-sm"></div>
              <div className="w-10 h-10">
                <img 
                  src={ashokaEmblem} 
                  alt="Ashoka Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-10 h-10">
                <img 
                  src={sihLogo} 
                  alt="SIH Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 relative">
              <button 
                onClick={() => setLanguage('english')}
                className={`text-sm hover:text-blue-200 ${language === 'english' ? 'text-white' : 'text-gray-300'}`}
              >
                English
              </button>
              <span className="text-white">|</span>
              <div className="relative">
                <button 
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="text-white text-sm hover:text-blue-200 flex items-center gap-1"
                >
                  {language === 'english' ? 'Hindi' : languageNames[language]}
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showLanguageDropdown && (
                  <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[150px]">
                    {regionalLanguages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageDropdown(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                          language === lang ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <button 
                  onClick={decreaseFontSize}
                  className={`w-5 h-4 text-xs flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors ${
                    fontSize === 'small' ? 'bg-white text-black' : 'bg-gray-300 text-gray-700'
                  }`}
                  title="Decrease font size"
                >
                  -A
                </button>
                <button 
                  onClick={() => setFontSize('medium')}
                  className={`w-4 h-4 text-xs flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors ${
                    fontSize === 'medium' ? 'bg-white text-black' : 'bg-gray-300 text-gray-700'
                  }`}
                  title="Default font size"
                >
                  A
                </button>
                <button 
                  onClick={increaseFontSize}
                  className={`w-5 h-4 text-xs flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors ${
                    fontSize === 'large' ? 'bg-white text-black' : 'bg-gray-300 text-gray-700'
                  }`}
                  title="Increase font size"
                >
                  +A
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSitemapClick}
                className="text-white text-sm hover:text-blue-200"
              >
                {t.sitemap}
              </button>
              <button 
                onClick={handleSkipToMainClick}
                className="text-white text-sm hover:text-blue-200"
              >
                {t.skipToMain}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#1a3b73] px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          {/* Center - SkillBridge Logo and Title */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 mb-2">
              <img 
                src={skillBridgeLogo} 
                alt="SkillBridge Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-white text-xl font-semibold">{t.skillBridge}</h1>
          </div>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="bg-[#1a3b73] border-t border-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-3">
            <div className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer">
              <span className="text-sm">Home</span>
            </div>
            <div className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer">
              <span className="text-sm">{t.aboutUs}</span>
            </div>
            <div className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer">
              <span className="text-sm">{t.internshipOpportunities}</span>
            </div>
            <div className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer">
              <span className="text-sm">{t.mentorshipConnect}</span>
            </div>
            <div className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer">
              <span className="text-sm">{t.myMatches}</span>
            </div>
            <div className="flex items-center gap-1 text-white hover:text-blue-200 cursor-pointer">
              <span className="text-sm">{t.profile}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}