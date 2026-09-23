import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { ComparisonDrawer } from './components/common/ComparisonDrawer';
import { QuickInquiryModal } from './components/common/QuickInquiryModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ListingsPage } from './pages/ListingsPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AgentProfilePage } from './pages/AgentProfilePage';
import { AgentsListPage } from './pages/AgentsListPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NeighborhoodDetailPage } from './pages/NeighborhoodDetailPage';
import { NeighborhoodsListPage } from './pages/NeighborhoodsListPage';
import { AboutPage } from './pages/AboutPage';
import { SellValuationPage } from './pages/SellValuationPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

import { LISTINGS_DATA } from './data/listingsData';
import { AGENTS_DATA } from './data/agentsData';
import { NEIGHBORHOODS_DATA } from './data/neighborhoodsData';
import { BLOG_DATA } from './data/blogData';

const MainApp = () => {
  const [activePage, setActivePage] = useState('home');
  const [selectedProperty, setSelectedProperty] = useState(LISTINGS_DATA[0]);
  const [selectedAgent, setSelectedAgent] = useState(AGENTS_DATA[0]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(NEIGHBORHOODS_DATA[0]);
  const [selectedArticle, setSelectedArticle] = useState(BLOG_DATA[0]);
  const [searchFilters, setSearchFilters] = useState({});

  const navigateTo = (page, params = {}) => {
    if (page === 'listings' && params) {
      setSearchFilters(params);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectListing = (listing) => {
    setSelectedProperty(listing);
    setActivePage('property');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAgent = (agent) => {
    setSelectedAgent(agent);
    setActivePage('agent');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNeighborhood = (neighborhood) => {
    setSelectedNeighborhood(neighborhood);
    setActivePage('neighborhood');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article) => {
    setSelectedArticle(article);
    setActivePage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHeroTransparent = activePage === 'home' || activePage === 'neighborhood' || activePage === 'neighborhoods' || activePage === 'agents';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      {/* Custom Luxury Magnetic Cursor */}
      <CustomCursor />

      {/* Global Sticky Navigation */}
      <Navbar
        activePage={activePage}
        onNavigate={navigateTo}
        transparentHero={isHeroTransparent}
      />

      {/* Main Routed Page Content */}
      <main style={{ flex: 1 }}>
        {activePage === 'home' && (
          <HomePage
            onNavigate={navigateTo}
            onSelectListing={handleSelectListing}
            onSelectAgent={handleSelectAgent}
            onSelectNeighborhood={handleSelectNeighborhood}
          />
        )}

        {activePage === 'listings' && (
          <ListingsPage
            initialFilters={searchFilters}
            onSelectListing={handleSelectListing}
            onSelectNeighborhood={handleSelectNeighborhood}
          />
        )}

        {activePage === 'property' && (
          <PropertyDetailPage
            property={selectedProperty}
            onSelectListing={handleSelectListing}
            onSelectAgent={handleSelectAgent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'agent' && (
          <AgentProfilePage
            agent={selectedAgent}
            onSelectListing={handleSelectListing}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'agents' && (
          <AgentsListPage
            onSelectAgent={handleSelectAgent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            onSelectArticle={handleSelectArticle}
          />
        )}

        {activePage === 'blog-detail' && (
          <BlogDetailPage
            article={selectedArticle}
            onNavigate={navigateTo}
            onSelectAgent={handleSelectAgent}
          />
        )}

        {activePage === 'contact' && (
          <ContactPage
            onSelectAgent={handleSelectAgent}
          />
        )}

        {activePage === 'neighborhood' && (
          <NeighborhoodDetailPage
            neighborhood={selectedNeighborhood}
            onSelectListing={handleSelectListing}
            onSelectAgent={handleSelectAgent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'neighborhoods' && (
          <NeighborhoodsListPage
            onSelectNeighborhood={handleSelectNeighborhood}
            onSelectListing={handleSelectListing}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onSelectAgent={handleSelectAgent}
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'sell' && (
          <SellValuationPage
            onNavigate={navigateTo}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            onSelectListing={handleSelectListing}
            onNavigate={navigateTo}
          />
        )}

        {activePage === '404' && (
          <NotFoundPage
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Floating Listing Comparison Drawer */}
      <ComparisonDrawer
        onSelectListing={handleSelectListing}
      />

      {/* Global Quick VIP Inquiry Modal */}
      <QuickInquiryModal />

      {/* Global Luxury Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
