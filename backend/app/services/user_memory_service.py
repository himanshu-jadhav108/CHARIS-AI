from typing import Dict, Any, List, Optional

class UserMemoryService:
    """
    CHARIS User Memory Service: Stores user gifting history, favorite luxury brands,
    past budgets, important dates, and recipient notes for contextual recommendations.
    """

    def __init__(self):
        # Simulated user memory vault indexed by user_id
        self._memory_vault: Dict[str, Dict[str, Any]] = {
            "guest_vip": {
                "user_id": "usr_guest_vip",
                "full_name": "Lord Alexander",
                "favorite_brands": ["Vacheron Constantin", "Hermès", "Forest Essentials", "Cartier", "Sabyasachi"],
                "preferred_categories": ["Fine Horology", "Haute Joaillerie", "Bespoke Experiences"],
                "gifting_history": [
                    {
                        "year": "2025",
                        "recipient": "Father",
                        "occasion": "60th Birthday",
                        "gift_name": "Celestial Perpetual Calendar",
                        "category": "Fine Horology",
                        "price_inr": 5500000.0
                    },
                    {
                        "year": "2025",
                        "recipient": "Wife",
                        "occasion": "10th Anniversary",
                        "gift_name": "Fancy Vivid Blue Diamond Ring",
                        "category": "High Jewelry",
                        "price_inr": 18500000.0
                    }
                ],
                "important_dates": [
                    {"event": "Diwali Royal Celebration", "date": "10-11"},
                    {"event": "Wife's Milestone Birthday", "date": "11-24"}
                ]
            }
        }

    def get_user_memory(self, user_id: str = "guest_vip") -> Dict[str, Any]:
        return self._memory_vault.get(user_id, {
            "user_id": user_id,
            "favorite_brands": [],
            "gifting_history": [],
            "important_dates": []
        })

    def record_gift_consultation(
        self, 
        user_id: str, 
        recipient: str, 
        occasion: str, 
        gift_name: str, 
        price_inr: float
    ):
        mem = self.get_user_memory(user_id)
        history = mem.get("gifting_history", [])
        history.append({
            "year": "2026",
            "recipient": recipient,
            "occasion": occasion,
            "gift_name": gift_name,
            "price_inr": price_inr
        })
        mem["gifting_history"] = history
        self._memory_vault[user_id] = mem

    def generate_memory_context_note(self, user_id: str, recipient: str) -> Optional[str]:
        mem = self.get_user_memory(user_id)
        history = mem.get("gifting_history", [])
        
        for item in reversed(history):
            if item.get("recipient", "").lower() == recipient.lower():
                return f"I recall that in {item['year']}, you presented {recipient} with the {item['gift_name']} for their {item['occasion']}. For this occasion, I have selected something complementary that expands their collection."

        return None

user_memory_service = UserMemoryService()
