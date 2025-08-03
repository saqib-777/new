import { supabase } from '../lib/supabase';
import { RescueRequest } from '../types';

export class RescueService {
  async createRequest(request: Omit<RescueRequest, 'id' | 'referenceNumber' | 'publicId' | 'createdAt' | 'updatedAt' | 'priorityScore'>): Promise<RescueRequest> {
    const referenceNumber = this.generateReferenceNumber();
    const publicId = this.generatePublicId();
    const priorityScore = this.calculatePriorityScore(request.emergencyLevel);

    const { data, error } = await supabase
      .from('rescue_requests')
      .insert([{
        ...request,
        reference_number: referenceNumber,
        public_id: publicId,
        priority_score: priorityScore,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getRequestById(id: string): Promise<RescueRequest | null> {
    const { data, error } = await supabase
      .from('rescue_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data;
  }

  async getRequestByPublicId(publicId: string): Promise<RescueRequest | null> {
    const { data, error } = await supabase
      .from('rescue_requests')
      .select('*')
      .eq('public_id', publicId)
      .single();

    if (error) return null;
    return data;
  }

  async getRequestsByUser(userId: string): Promise<RescueRequest[]> {
    const { data, error } = await supabase
      .from('rescue_requests')
      .select('*')
      .eq('created_by', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  async updateRequest(id: string, updates: Partial<RescueRequest>): Promise<RescueRequest> {
    const { data, error } = await supabase
      .from('rescue_requests')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `RR-${timestamp}-${random}`.toUpperCase();
  }

  private generatePublicId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  private calculatePriorityScore(emergencyLevel: string): number {
    switch (emergencyLevel) {
      case 'critical': return 100;
      case 'urgent': return 75;
      case 'standard': return 50;
      default: return 25;
    }
  }
}

export const rescueService = new RescueService();</parameter>