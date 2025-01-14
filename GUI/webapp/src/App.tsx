import React from 'react';
import './styles/global.scss';

// Since we're not using Next.js, we'll use @font-face for fonts
const App: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-root antialiased">
      {children}
    </div>
  );
};

export default App;