import { supabase } from '../lib/supabase';
import { Animal, SearchFilters } from '../types';

export class AnimalService {
  async getAnimals(filters?: Partial<SearchFilters>): Promise<Animal[]> {
    let query = supabase
      .from('animals')
      .select('*')
      .eq('status', 'available');

    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters?.size && filters.size !== 'all') {
      query = query.eq('size', filters.size);
    }

    if (filters?.gender && filters.gender !== 'all') {
      query = query.eq('gender', filters.gender);
    }

    if (filters?.specialNeeds) {
      query = query.eq('special_needs', true);
    }

    if (filters?.query) {
      query = query.or(`name.ilike.%${filters.query}%,breed.ilike.%${filters.query}%`);
    }

    // Sorting
    const sortBy = filters?.sortBy || 'created_at';
    const sortOrder = filters?.sortOrder === 'asc' ? { ascending: true } : { ascending: false };
    query = query.order(sortBy, sortOrder);

    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  }

  async getAnimalById(id: string): Promise<Animal | null> {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async getFeaturedAnimals(): Promise<Animal[]> {
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .limit(6);

    if (error) throw error;
    return data || [];
  }

  async createAnimal(animal: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Animal> {
    const { data, error } = await supabase
      .from('animals')
      .insert([animal])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateAnimal(id: string, updates: Partial<Animal>): Promise<Animal> {
    const { data, error } = await supabase
      .from('animals')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export const animalService = new AnimalService();</parameter>