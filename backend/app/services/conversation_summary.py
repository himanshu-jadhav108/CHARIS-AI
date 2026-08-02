import logging
from typing import List, Dict, Any

logger = logging.getLogger("charis.observability")

class ConversationSummaryService:
    @staticmethod
    def generate_summary(chat_history: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Creates a structured summary from raw conversation dialogue.
        """
        summary = {
            "recipient": None,
            "relationship": None,
            "occasion": None,
            "budget": None,
            "emotional_intent": [],
            "user_preferences": [],
            "previous_gifts_discussed": [],
            "important_notes": "",
            "outstanding_questions": []
        }

        # Scan history for explicit signals
        for msg in chat_history:
            text = msg.get("text", "").lower()
            sender = msg.get("sender")

            if sender == "user":
                # Basic key phrase extraction
                if "wife" in text or "husband" in text or "partner" in text:
                    summary["relationship"] = "Partner"
                elif "father" in text or "dad" in text:
                    summary["relationship"] = "Father"
                elif "mother" in text or "mom" in text:
                    summary["relationship"] = "Mother"

                if "diwali" in text:
                    summary["occasion"] = "Diwali Royal Celebration"
                elif "birthday" in text:
                    summary["occasion"] = "Milestone Birthday"
                elif "anniversary" in text:
                    summary["occasion"] = "Wedding Anniversary"

                if "₹" in text or "rupee" in text or "budget" in text:
                    # Capture basic budget notes
                    summary["budget"] = msg.get("text")

        logger.info(f"Summarized {len(chat_history)} chat history turns for prompt builder.")
        return summary
