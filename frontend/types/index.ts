export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  luxury_score: number;
  personality_tags: string[];
  interest_tags: string[];
  occasion_tags: string[];
  relationship_tags: string[];
  emotional_tags: string[];
  story: string;
  delivery: string;
  features: string[];
  reviews: Array<{
    author: string;
    rating: number;
    comment: string;
  }>;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  tier: string;
  access_token?: string;
}

export interface EmotionScore {
  primary_emotion: string;
  secondary_emotions: string[];
  intensity_score: number;
  emotional_summary: string;
}

export interface RecipientProfile {
  lifestyle?: string;
  hobbies?: string[];
  luxury_preference?: string;
  love_language?: string;
  communication_style?: string;
  favourite_colours?: string[];
  travel_preference?: string;
  work_style?: string;
  personality_traits?: string[];
  interests?: string[];
  values?: string[];
  age_group?: string;
}

export interface PreferencesState {
  recipient?: string;
  relationship?: string;
  occasion?: string;
  budget?: string;
  age?: string;
  gender?: string;
  personality?: string[];
  hobbies?: string[];
  interests?: string[];
  favorite_colors?: string[];
  luxury_preferences?: string[];
  lifestyle?: string;
  desired_emotional_impact?: string;
  special_notes?: string;
  emotion_data?: EmotionScore;
  recipient_profile?: RecipientProfile;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}

export interface MemoryBox {
  why_this_gift_matters: string;
  emotional_story: string;
  personal_reflection: string;
  luxury_presentation: string;
}

export interface GiftExperiencePackage {
  luxury_wrapping: {
    name: string;
    details: string;
    ribbon: string;
  };
  flower_pairing: {
    name: string;
    meaning: string;
    presentation: string;
  };
  chocolate_pairing: {
    name: string;
    notes: string;
    packaging: string;
  };
  greeting_card_text: string;
  delivery_protocol: string;
  presentation_advice: string;
  expected_emotional_impact: string;
}

export interface CuratedExperience {
  product: Product;
  match_score: number;
  luxury_score: number;
  tailored_reason: string;
  emotional_meaning: string;
  experience_package: GiftExperiencePackage;
  memory_box: MemoryBox;
}

export interface ConsultationHistoryItem {
  id: string;
  title: string;
  recipient?: string;
  occasion?: string;
  budget?: string;
  status: string;
  created_at: string;
  message_count: number;
  has_recommendations: boolean;
}

export interface RecommendationItem {
  product: Product;
  match_score: number;
  luxury_score: number;
  tailored_reason: string;
  emotional_meaning: string;
  story: string;
  cta_text?: string;
}

export interface RecommendationResponse {
  consultation_id?: string;
  summary: string;
  top_recommendations: RecommendationItem[];
}
