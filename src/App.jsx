import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import WebGLShaderCanvas from './components/WebGLShaderCanvas';

import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import WeatherIntel from './pages/WeatherIntel';
import DiseaseScan from './pages/DiseaseScan';
import FarmManagement from './pages/FarmManagement';
import EquipmentHub from './pages/EquipmentHub';
import ExpertConsultation from './pages/ExpertConsultation';
import CommunityForum from './pages/CommunityForum';
import AiAssistant from './pages/AiAssistant';
import SettingsPage from './pages/Settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('home');
  };

  const handleTabChange = (tabId) => {
    if (!isLoggedIn && tabId !== 'home') {
      setIsAuthModalOpen(true);
      return;
    }
    setActiveTab(tabId);
  };

  const renderActivePage = () => {
    if (!isLoggedIn || activeTab === 'home') {
      return (
        <Home
          isLoggedIn={isLoggedIn}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onGoogleLogin={() => {
            handleLoginSuccess({
              name: 'Gurpreet Singh (Google)',
              email: 'gurpreet.singh@gmail.com',
              phone: '+91 98123 45678'
            });
          }}
          setActiveTab={handleTabChange}
        />
      );
    }

    switch (activeTab) {
      case 'marketplace':
        return <Marketplace />;
      case 'weather':
        return <WeatherIntel />;
      case 'disease':
        return <DiseaseScan />;
      case 'farm':
        return <FarmManagement />;
      case 'equipment':
        return <EquipmentHub />;
      case 'experts':
        return <ExpertConsultation />;
      case 'forum':
        return <CommunityForum />;
      case 'ai':
        return <AiAssistant />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <Home
            isLoggedIn={isLoggedIn}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onGoogleLogin={() => {
              handleLoginSuccess({
                name: 'Gurpreet Singh (Google)',
                email: 'gurpreet.singh@gmail.com',
                phone: '+91 98123 45678'
              });
            }}
            setActiveTab={handleTabChange}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full flex overflow-x-hidden selection:bg-[#10b981] selection:text-white bg-[#f8fafc]">
      
      {/* Background Animated GLSL WebGL Shader */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none w-full h-full">
        <WebGLShaderCanvas className="w-full h-full" />
      </div>

      {/* LEFT SIDEBAR NAVIGATION (Visible after user logs in) */}
      {isLoggedIn && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isLoggedIn={isLoggedIn}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />
      )}

      {/* RIGHT MAIN CONTENT CONTAINER */}
      <div className="relative z-10 flex-1 flex flex-col justify-between min-w-0 min-h-screen">
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isLoggedIn={isLoggedIn}
          user={user}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
        />

        <main className="w-full flex-1 transition-all duration-300">
          {renderActivePage()}
        </main>

        {/* Footer Banner rendered ONLY on the Landing Page */}
        {(!isLoggedIn || activeTab === 'home') && (
          <Footer setActiveTab={handleTabChange} />
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
