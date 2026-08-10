export interface RecipientProfileData {
  id: string;
  name: string;
  relationship: string;
  lifestyle: string;
  birthday: string;
  anniversary?: string;
  profession: string;
  interests: string[];
  hobbies: string[];
  favourite_brands: string[];
  favourite_colours: string[];
  luxury_style: string;
  last_gift: string;
  notes: string;
  avatar_color: string;
  timeline: { year: string; gift: string; occasion: string }[];
}
