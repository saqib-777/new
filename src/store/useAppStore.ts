import { create } from 'zustand';
import { SearchFilters, Animal, Notification } from '../types';

interface AppStore {
  // UI state
  sidebarOpen: boolean;
  notifications: Notification[];
  
  // Data state
  searchFilters: SearchFilters;
  
  // Actions
  toggleSidebar: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  sidebarOpen: false,
  notifications: [],
  searchFilters: {
    type: 'all',
    age: 'all',
    size: 'all',
    gender: 'all',
    location: 'all',
    specialNeeds: false,
    goodWith: [],
    sortBy: 'date_added',
    sortOrder: 'desc'
  },
  
  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [
        { ...notification, id: Math.random().toString(36) }, 
        ...state.notifications
      ] 
    })),
    
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
    
  updateSearchFilters: (filters) =>
    set((state) => ({
      searchFilters: { ...state.searchFilters, ...filters }
    })),
    
  clearNotifications: () => set({ notifications: [] })
}));</parameter>