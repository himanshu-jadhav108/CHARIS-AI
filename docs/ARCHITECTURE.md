# CHARIS — Architecture & System Design

```mermaid
graph TD
    Client([Next.js 14 Web Client]) <--> RestAPI[FastAPI Backend REST Endpoints]
    
    subgraph Frontend Architecture [/frontend]
        Client --> Zustand[Zustand State Stores]
        Client --> Components[Luxury UI Glassmorphism System]
        Zustand --> ApiService[Fetch API Services]
    end

    subgraph Backend Architecture [/backend]
        RestAPI --> AgentEngine[Concierge Agent - Preference Extractor]
        RestAPI --> RecEngine[Hybrid Recommendation Engine]
        RestAPI --> MsgGen[AI Gift Message Generator]
        
        AgentEngine <--> SessionDB[(SQLite DB - Consultations & History)]
        RecEngine <--> ProductDB[(SQLite DB - 50 Luxury Vault Items)]
    end
```

## System Workflow & Agent Pipeline

1. **User Turn**: User sends message to `/api/chat/message`.
2. **Preference Extraction**: `ConciergeAgent` parses message against intent heuristics & regex rules to update Recipient, Relationship, Occasion, Budget, Personality, and Emotional Impact tags.
3. **Turn Decision**: Agent responds with warm Mayfair concierge phrasing and suggests dynamic quick reply options.
4. **Completeness Check**: When 3+ core parameters are present, `is_complete` becomes `true`.
5. **Recommendation Pipeline**: `RecommendationEngine` evaluates all 50 items using budget bounding, tag match scoring, and luxury score weightings to select & rank the Top 3 items with custom story cards.
6. **Message Artistry**: `/api/messages/generate` dynamically composes gold calligraphic gift cards across 6 distinct luxury tones.
