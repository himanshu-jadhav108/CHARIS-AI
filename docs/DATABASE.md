# CHARIS Database Schema & Postgres Curation

## PostgreSQL Normalized Relational Model

```mermaid
erDiagram
    users {
        uuid id PK
        string email
        string full_name
        string avatar_url
        string tier
        timestamp created_at
    }
    user_preferences {
        uuid id PK
        uuid user_id FK
        string preferred_currency
        string language
        string theme_preference
        string notification_preference
        string luxury_preference
    }
    recipients {
        uuid id PK
        uuid user_id FK
        string name
        string relationship
        date birthday
        date anniversary
        jsonb favourite_colours
        jsonb favourite_brands
        jsonb hobbies
        string lifestyle
        string luxury_preference
        text personal_notes
    }
    gift_history {
        uuid id PK
        uuid user_id FK
        uuid recipient_id FK
        string product_id FK
        string occasion
        date date
        string budget
        text generated_message
        string delivery_preference
    }
    products {
        string id PK
        string name
        string brand
        double price
        string category
        text image
        jsonb gallery
        text description
        double luxury_score
        text story
        text delivery
        jsonb features
    }
    users ||--o| user_preferences : has
    users ||--o{ recipients : manages
    users ||--o{ gift_history : logs
    recipients ||--o{ gift_history : receives
    products ||--o{ gift_history : "selected in"
```

## Row Level Security (RLS) Configuration

Supabase Row Level Security guarantees that patrons only query their own dossiers.

```sql
-- 1. Enable RLS on recipients table
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;

-- 2. Create Security Policy
CREATE POLICY "Patrons can only read own recipients"
ON recipients FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Patrons can write own recipients"
ON recipients FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());
```

## Product Catalog Seeding (50 Items)
Product prices are seeded in **Indian Rupees (₹)**:
- Vacheron Constantin Celestial Watch: ₹58,50,000
- Sabyasachi Polki Emerald Necklace: ₹1,25,00,000
- Taj Lake Palace Udaipur Retreat: ₹18,50,000
- Apple Watch Hermès Titanium: ₹1,75,000
