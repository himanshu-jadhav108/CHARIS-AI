# CHARIS API Specifications

Base URL: `http://localhost:8000/api`

## Endpoints Summary

### 1. Authentication (`/auth`)
- `POST /api/auth/login`: Authenticate user via Email or Google OAuth mock. Returns persistent JWT session.
- `GET /api/auth/me`: Get current logged in VIP user profile.

### 2. AI Concierge Chat (`/chat`)
- `POST /api/chat/message`: Process user consultation message, extract preferences dynamically, and return next turn & recommendations if complete.
- `GET /api/chat/session/{id}`: Fetch existing consultation session state.

### 3. Products Catalog (`/products`)
- `GET /api/products`: Filter and search the 50 luxury products catalog (`category`, `search`, `min_price`, `max_price`).
- `GET /api/products/{id}`: Fetch detailed product payload with gallery, luxury score, reviews, and features.

### 4. Recommendation Engine (`/recommend`)
- `POST /api/recommend/get`: Directly run preference matching algorithm against 50 products and return top 3.

### 5. AI Gift Message Writer (`/messages`)
- `POST /api/messages/generate`: Compose or refine gift card message across 6 tones (`Luxury`, `Romantic`, `Professional`, `Family`, `Friend`, `Heartfelt`).

### 6. History & Bookmarks (`/history`)
- `GET /api/history/consultations`: Get recent consultation history for user.
- `GET /api/history/bookmarks`: Get bookmarked luxury products.
- `POST /api/history/bookmarks/toggle`: Toggle bookmark state for a product.
