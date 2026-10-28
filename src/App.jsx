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
import FieldManagement from './pages/FieldManagement';
import CropManagement from './pages/CropManagement';
import SoilHealth from './pages/SoilHealth';
import EquipmentHub from './pages/EquipmentHub';
import ExpertConsultation from './pages/ExpertConsultation';
import CommunityForum from './pages/CommunityForum';
import AiAssistant from './pages/AiAssistant';
import SettingsPage from './pages/Settings';

import { useAuth } from './context/AuthContext';

export default function App() {
  const {
    user,
    isLoggedIn,
    loading,
    logout
  } = useAuth();

  const [activeTab, setActiveTab] =
    useState('home');

  const [isAuthModalOpen, setIsAuthModalOpen] =
    useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  /*
   * While Supabase checks the existing session.
   */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-center">

          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-[#006c49] text-white flex items-center justify-center animate-pulse">
            🌱
          </div>

          <p className="text-sm font-bold text-[#006c49]">
            Loading AgriAI 366...
          </p>

        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();

      setActiveTab('home');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error(
        'Logout failed:',
        error
      );
    }
  };

  const handleTabChange = (tabId) => {

    if (!isLoggedIn && tabId !== 'home') {
      setIsAuthModalOpen(true);
      return;
    }

    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const renderHome = () => {
    return (
      <Home
        isLoggedIn={isLoggedIn}
        onOpenAuth={() =>
          setIsAuthModalOpen(true)
        }
        onGoogleLogin={() =>
          setIsAuthModalOpen(true)
        }
        setActiveTab={handleTabChange}
      />
    );
  };

  const renderActivePage = () => {

    if (
      !isLoggedIn ||
      activeTab === 'home'
    ) {
      return renderHome();
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

      case 'fields':
        return <FieldManagement />;

      case 'crops':
        return <CropManagement />;

      case 'soil':
        return <SoilHealth />;

      case 'equipment':
        return <EquipmentHub />;

      case 'experts':
        return <ExpertConsultation />;

      case 'forum':
        return <CommunityForum />;

      case 'ai':
        return <AiAssistant />;

      case 'settings':
        return (
          <SettingsPage
            user={user}
          />
        );

      default:
        return renderHome();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex selection:bg-[#10b981] selection:text-white bg-[#f8fafc]">

      {/* Background */}
      <div className="fixed inset-0 z-0 opacity-15 pointer-events-none w-full h-full">
        <WebGLShaderCanvas className="w-full h-full" />
      </div>

      {/* Sidebar */}
      {isLoggedIn && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isLoggedIn={isLoggedIn}
          user={user}
          onOpenAuth={() =>
            setIsAuthModalOpen(true)
          }
          onLogout={handleLogout}
          isMobileMenuOpen={
            isMobileMenuOpen
          }
          setIsMobileMenuOpen={
            setIsMobileMenuOpen
          }
        />
      )}

      {/* Main */}
      <div className={`relative z-10 flex-1 flex flex-col justify-between min-w-0 min-h-screen ${isLoggedIn ? 'lg:pl-64' : ''}`}>

        <Navbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          isLoggedIn={isLoggedIn}
          user={user}
          onOpenAuth={() =>
            setIsAuthModalOpen(true)
          }
          onLogout={handleLogout}
          isMobileMenuOpen={
            isMobileMenuOpen
          }
          setIsMobileMenuOpen={
            setIsMobileMenuOpen
          }
        />

        <main
          className={`w-full flex-1 transition-all duration-300 ${
            isLoggedIn
              ? 'pb-20 lg:pb-0'
              : ''
          }`}
        >
          {renderActivePage()}
        </main>

        {/* Footer only landing page */}
        {(!isLoggedIn ||
          activeTab === 'home') && (
          <Footer
            setActiveTab={
              handleTabChange
            }
          />
        )}

      </div>

      {/* Auth */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() =>
          setIsAuthModalOpen(false)
        }
      />

    </div>
  );
}
