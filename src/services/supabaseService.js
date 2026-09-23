import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { LISTINGS_DATA } from '../data/listingsData';
import { BLOG_DATA } from '../data/blogData';
import { AGENTS_DATA } from '../data/agentsData';

export const supabaseService = {
  /**
   * Fetch all luxury property listings
   */
  async getProperties() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: LISTINGS_DATA, error: null, source: 'local' };
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : LISTINGS_DATA, error: null, source: 'supabase' };
    } catch (err) {
      console.warn('Supabase query error, falling back to local data:', err.message);
      return { data: LISTINGS_DATA, error: err, source: 'local' };
    }
  },

  /**
   * Fetch single property by ID
   */
  async getPropertyById(id) {
    if (!isSupabaseConfigured || !supabase) {
      const localProp = LISTINGS_DATA.find(p => p.id === id);
      return { data: localProp || null, error: null, source: 'local' };
    }

    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null, source: 'supabase' };
    } catch (err) {
      const localProp = LISTINGS_DATA.find(p => p.id === id);
      return { data: localProp || null, error: err, source: 'local' };
    }
  },

  /**
   * Fetch all blog posts
   */
  async getBlogPosts() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: BLOG_DATA, error: null, source: 'local' };
    }

    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;
      return { data: data && data.length > 0 ? data : BLOG_DATA, error: null, source: 'supabase' };
    } catch (err) {
      return { data: BLOG_DATA, error: err, source: 'local' };
    }
  },

  /**
   * Fetch agents
   */
  async getAgents() {
    if (!isSupabaseConfigured || !supabase) {
      return { data: AGENTS_DATA, error: null, source: 'local' };
    }

    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*');

      if (error) throw error;
      return { data: data && data.length > 0 ? data : AGENTS_DATA, error: null, source: 'supabase' };
    } catch (err) {
      return { data: AGENTS_DATA, error: err, source: 'local' };
    }
  },

  /**
   * Submit VIP Inquiry or Contact form
   */
  async submitInquiry(inquiryData) {
    console.log('Submitting inquiry:', inquiryData);
    
    if (!isSupabaseConfigured || !supabase) {
      // Simulate successful submission for local mock state
      return { 
        success: true, 
        data: { id: `inq-${Date.now()}`, ...inquiryData, created_at: new Date().toISOString() }, 
        source: 'local' 
      };
    }

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          property_id: inquiryData.propertyId || null,
          property_title: inquiryData.propertyTitle || null,
          full_name: inquiryData.fullName || inquiryData.name,
          email: inquiryData.email,
          phone: inquiryData.phone || null,
          message: inquiryData.message || null,
          inquiry_type: inquiryData.inquiryType || 'VIP Inquiry',
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) throw error;
      return { success: true, data: data[0], source: 'supabase' };
    } catch (err) {
      console.error('Error submitting inquiry to Supabase:', err);
      return { success: false, error: err.message, source: 'supabase' };
    }
  },

  /**
   * Schedule property showing
   */
  async scheduleShowing(showingData) {
    if (!isSupabaseConfigured || !supabase) {
      return {
        success: true,
        data: { id: `show-${Date.now()}`, ...showingData, status: 'Confirmed' },
        source: 'local'
      };
    }

    try {
      const { data, error } = await supabase
        .from('showings')
        .insert([{
          property_id: showingData.propertyId,
          property_title: showingData.propertyTitle,
          tour_type: showingData.type || 'Private VIP In-Person Tour',
          tour_date: showingData.date,
          user_name: showingData.userName || 'VIP Client',
          user_email: showingData.userEmail || null,
          agent_name: showingData.agentName || 'Victoria Vance',
          status: 'Confirmed'
        }])
        .select();

      if (error) throw error;
      return { success: true, data: data[0], source: 'supabase' };
    } catch (err) {
      console.error('Error scheduling showing in Supabase:', err);
      return { success: false, error: err.message, source: 'supabase' };
    }
  }
};
