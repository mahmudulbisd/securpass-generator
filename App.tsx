
import React, { useState, useCallback, useEffect } from 'react';
import { PasswordCard } from './components/PasswordCard';
import { generateSecurePassword } from './utils/generator';

const App: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [length, setLength] = useState<number>(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(() => {
    const hasSelected = Object.values(options).some(val => val);
    
    if (!hasSelected) {
      setError('Please select at least one character type.');
      return;
    }

    setError(null);
    const newPassword = generateSecurePassword(length, options);
    setPassword(newPassword);
  }, [length, options]);

  // Generate initial password on mount
  useEffect(() => {
    handleGenerate();
  }, []);

  const toggleOption = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      <PasswordCard 
        password={password}
        length={length}
        setLength={setLength}
        options={options}
        toggleOption={toggleOption}
        onGenerate={handleGenerate}
        error={error}
      />
    </div>
  );
};

export default App;
