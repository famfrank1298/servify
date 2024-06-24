import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ui/theme-provider';
import Nav from './layout/Nav/Nav';
import Footer from './layout/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Nav />
        {children}
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Layout;
