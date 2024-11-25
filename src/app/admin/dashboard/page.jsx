import React from 'react';

// components
import Dashboard from 'src/components/_admin/dashboard';

// Meta information
export const metadata = {
  title: 'freshpetals - Dashboard',
  description: 'Welcome to the freshpetals Dashboard. Manage your e-commerce operations with ease.',
  applicationName: 'freshpetals Dashboard',
  authors: 'freshpetals',
  keywords: 'dashboard, e-commerce, management, freshpetals',
  icons: {
    icon: '/favicon.png'
  }
};

export default function page() {
  return (
    <>
      <Dashboard />
    </>
  );
}
