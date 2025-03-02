import { useState } from 'react';

interface LanguageSelectorProps {
  onSelect: (language: string) => void;
  selected: string;
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'csharp', label: 'C#' },
  { value: 'lua', label: 'Lua' },
];

export default function LanguageSelector({ onSelect, selected }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const selectedLanguage = languages.find(lang => lang.value === selected)?.label || 'Select Language';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {selectedLanguage}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1">
          {languages.map((language) => (
            <button
              key={language.value}
              onClick={() => handleSelect(language.value)}
              className={`block px-4 py-2 text-sm w-full text-left ${
                selected === language.value
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
