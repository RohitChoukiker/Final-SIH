import React from 'react';


export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-blue-00  shadow-md mt-auto">
      
        
        <div className="border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-00">
          © {new Date().getFullYear()} E-DakConnect. All rights reserved.
        </div>
      
    </footer>
  );
};