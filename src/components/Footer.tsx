import { useTranslations } from './LanguageProvider';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  const t = useTranslations();

  const reports = [
    {
      titleKey: 'report1',
      url: 'https://example.com/reports/skill-gap-analysis-2024'
    },
    {
      titleKey: 'report2', 
      url: 'https://example.com/reports/digital-skills-framework'
    },
    {
      titleKey: 'report3',
      url: 'https://example.com/reports/industry-readiness-survey'
    },
    {
      titleKey: 'report4',
      url: 'https://example.com/reports/training-effectiveness-study'
    },
    {
      titleKey: 'report5',
      url: 'https://example.com/reports/employment-outcomes-report'
    }
  ];

  return (
    <footer id="footer" className="bg-[#1a3b73] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.aboutUs}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.keyInitiatives}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.publications}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">{t.disclosuresRTI}</a></li>
            </ul>
          </div>

          {/* Reports */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.reportsAndStudies}</h3>
            <ul className="space-y-2">
              {reports.map((report, index) => (
                <li key={index}>
                  <a 
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 text-sm"
                  >
                    {t[report.titleKey]}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t.contactInfo}</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>{t.skillBridge}</p>
              <p>{t.addressLine1}</p>
              <p>{t.addressLine2}</p>
              <p>{t.email}: info@skillbridge.gov.in</p>
              <p>{t.phone}: +91-11-2345-6789</p>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-3 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-sm"></div>
              <span className="text-sm">{t.governmentOfIndia}</span>
            </div>
            <div className="text-sm text-gray-300">
              <p>{t.copyright} © 2024 {t.skillBridge}. {t.allRightsReserved}</p>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">{t.privacyPolicy}</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">{t.termsOfService}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}