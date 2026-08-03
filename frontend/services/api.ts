import { Product, RecommendationResponse, ConsultationHistoryItem } from '@/types';

const API_BASE = 'http://localhost:8000/api';

export async function fetchProducts(category?: string, search?: string): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);

    const res = await fetch(`${API_BASE}/products?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return await res.json();
  } catch (err) {
    console.warn("API offline - using dummy client catalog fallback");
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Failed to fetch product');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function generateGiftCardMessage(payload: {
  recipient_name?: string;
  relationship?: string;
  occasion?: string;
  tone: string;
  gift_name?: string;
  user_notes?: string;
  existing_message?: string;
}): Promise<string> {
  try {
    const res = await fetch(`${API_BASE}/messages/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Message generation failed');
    const data = await res.json();
    return data.generated_message;
  } catch (err) {
    return `To ${payload.recipient_name || 'Beloved'},\n\nMay this handcrafted piece bring endless joy on ${payload.occasion || 'this special milestone'}.\n\nWith high esteem,`;
  }
}

export async function fetchConsultationHistory(): Promise<ConsultationHistoryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/history/consultations?user_id=guest_vip`);
    if (!res.ok) throw new Error('History fetch failed');
    return await res.json();
  } catch (err) {
    return [];
  }
}
