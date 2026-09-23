import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LISTINGS_DATA } from '../data/listingsData';
import { supabaseService } from '../services/supabaseService';
import { isSupabaseConfigured } from '../lib/supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [properties, setProperties] = useState(LISTINGS_DATA);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(isSupabaseConfigured);
  const [isLoadingProperties, setIsLoadingProperties] = useState(false);

  // Fetch properties from Supabase on mount (or local fallback)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoadingProperties(true);
      const res = await supabaseService.getProperties();
      if (isMounted && res.data) {
        setProperties(res.data);
        if (res.source === 'supabase') {
          setIsSupabaseConnected(true);
        }
      }
      if (isMounted) setIsLoadingProperties(false);
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Favorites persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('evolvix_favorites');
      return saved ? JSON.parse(saved) : ['prop-01', 'prop-03'];
    } catch {
      return ['prop-01', 'prop-03'];
    }
  });

  // Comparison listings (max 3)
  const [compareIds, setCompareIds] = useState(['prop-01', 'prop-02']);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Saved searches
  const [savedSearches, setSavedSearches] = useState([
    {
      id: 'search-1',
      title: 'Beverly Hills & Bel Air Estates ($15M+)',
      filters: { location: 'Bel Air', minPrice: 15000000, beds: 5 },
      date: 'Jan 28, 2025',
      frequency: 'Instant Alert',
      count: 4
    },
    {
      id: 'search-2',
      title: 'SoHo & TriBeCa Penthouses',
      filters: { location: 'SoHo', propertyType: 'penthouse' },
      date: 'Jan 15, 2025',
      frequency: 'Daily Digest',
      count: 2
    }
  ]);

  // Scheduled Showings
  const [scheduledShowings, setScheduledShowings] = useState([
    {
      id: 'show-1',
      propertyId: 'prop-01',
      propertyTitle: 'The Bel Air Promontory',
      date: 'Tomorrow, 2:00 PM',
      type: 'Private VIP In-Person Tour',
      agentName: 'Victoria Vance',
      status: 'Confirmed'
    }
  ]);

  // Schedule a new showing (syncs with Supabase if configured)
  const scheduleShowing = useCallback(async (showingData) => {
    const result = await supabaseService.scheduleShowing(showingData);
    if (result.success && result.data) {
      setScheduledShowings(prev => [result.data, ...prev]);
    }
    return result;
  }, []);

  // Submit VIP Inquiry (syncs with Supabase if configured)
  const submitInquiry = useCallback(async (inquiryData) => {
    return await supabaseService.submitInquiry(inquiryData);
  }, []);

  // Recently Viewed Properties
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(['prop-01', 'prop-02', 'prop-03']);

  // Quick VIP Inquiry Modal
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryContext, setInquiryContext] = useState({ propertyId: null, propertyTitle: null });

  // Custom Cursor hover text
  const [cursorState, setCursorState] = useState({ active: false, text: '', mode: 'default' });

  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('evolvix_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  }, []);

  const toggleCompare = useCallback((propertyId) => {
    setCompareIds(prev => {
      if (prev.includes(propertyId)) {
        return prev.filter(id => id !== propertyId);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 luxury residences at a time.');
        return prev;
      }
      return [...prev, propertyId];
    });
  }, []);

  const addRecentlyViewed = useCallback((propertyId) => {
    if (!propertyId) return;
    setRecentlyViewedIds(prev => {
      if (prev[0] === propertyId) return prev;
      const filtered = prev.filter(id => id !== propertyId);
      return [propertyId, ...filtered].slice(0, 6);
    });
  }, []);

  const saveSearch = useCallback((title, filters) => {
    const newSearch = {
      id: `search-${Date.now()}`,
      title: title || 'Custom Luxury Search Alert',
      filters,
      date: 'Today',
      frequency: 'Instant Alert',
      count: properties.length
    };
    setSavedSearches(prev => [newSearch, ...prev]);
  }, [properties.length]);

  const removeSavedSearch = useCallback((searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  }, []);

  const openInquiryModal = useCallback((propertyId = null, propertyTitle = null) => {
    setInquiryContext({ propertyId, propertyTitle });
    setIsInquiryModalOpen(true);
  }, []);

  const closeInquiryModal = useCallback(() => {
    setIsInquiryModalOpen(false);
  }, []);

  return (
    <AppContext.Provider value={{
      properties,
      isSupabaseConnected,
      isLoadingProperties,
      favorites,
      toggleFavorite,
      compareIds,
      toggleCompare,
      isCompareOpen,
      setIsCompareOpen,
      savedSearches,
      saveSearch,
      removeSavedSearch,
      scheduledShowings,
      setScheduledShowings,
      scheduleShowing,
      submitInquiry,
      recentlyViewedIds,
      addRecentlyViewed,
      isInquiryModalOpen,
      inquiryContext,
      openInquiryModal,
      closeInquiryModal,
      cursorState,
      setCursorState
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

