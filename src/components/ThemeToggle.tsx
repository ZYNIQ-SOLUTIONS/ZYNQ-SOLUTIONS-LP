import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

function readSavedTheme(): string | null {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Default is light. Only switch to dark if explicitly saved.
    if (readSavedTheme() === 'dark') {
      setTheme('dark');
      document.documentElement.classList.remove('light');
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // Storage unavailable (private mode): the choice just won't persist.
    }
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 border border-transparent hover:border-rule transition-colors cursor-pointer text-muted hover:text-ink"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
