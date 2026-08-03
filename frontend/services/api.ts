import { Product, RecommendationResponse, ConsultationHistoryItem } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

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
}, token?: string): Promise<string> {
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/messages/generate`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Message generation failed');
    const data = await res.json();
    return data.generated_message;
  } catch (err) {
    return `To ${payload.recipient_name || 'Beloved'},\n\nMay this handcrafted piece bring endless joy on ${payload.occasion || 'this special milestone'}.\n\nWith high esteem,`;
  }
}

export async function fetchConsultationHistory(token: string): Promise<ConsultationHistoryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/history/consultations`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('History fetch failed');
    return await res.json();
  } catch (err) {
    return [];
  }
}

// ----------------------------------------------------
// DATABASE PERSISTENCE ACTIONS
// ----------------------------------------------------

export async function toggleBookmarkApi(productId: string, token: string): Promise<boolean> {
  const res = await fetch(`${API_BASE}/history/bookmarks/toggle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ product_id: productId })
  });
  if (!res.ok) throw new Error('Toggle bookmark failed');
  const data = await res.json();
  return data.bookmarked;
}

export async function fetchBookmarksApi(token: string): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/history/bookmarks`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Fetch bookmarks failed');
  return await res.json();
}

export async function fetchRecipientsApi(token: string): Promise<any[]> {
  const res = await fetch(`${API_BASE}/recipients`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Fetch recipients failed');
  return await res.json();
}

export async function createRecipientApi(payload: {
  name: string;
  relationship: string;
  birthday?: string;
  anniversary?: string;
  favourite_colours?: string[];
  favourite_brands?: string[];
  hobbies?: string[];
  lifestyle?: string;
  luxury_preference?: string;
  personal_notes?: string;
}, token: string): Promise<any> {
  const res = await fetch(`${API_BASE}/recipients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Create recipient failed');
  return await res.json();
}
