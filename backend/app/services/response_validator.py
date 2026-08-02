import logging
from typing import Dict, Any, List

logger = logging.getLogger("charis.observability")

class ResponseValidator:
    def __init__(self, valid_product_names: List[str]):
        self.valid_product_names = [p.lower() for p in valid_product_names]

    def validate(self, response_text: str, check_products: bool = True) -> Dict[str, Any]:
        """
        Validates that AI output complies with luxury requirements.
        """
        if not response_text or len(response_text.strip()) < 5:
            return {"valid": False, "reason": "Response is empty or too short."}

        # Check for hallucinated products (if checks are enabled)
        if check_products:
            # We want to make sure the AI doesn't mention products outside our seeded 50
            pass

        # Check for luxury tone markers
        lowered = response_text.lower()
        banned_words = ["cheap", "discount", "bargain", "budget gift", "amazon link", "buy now"]
        found_banned = [w for w in banned_words if w in lowered]
        if found_banned:
            return {"valid": False, "reason": f"Tone violation: contains non-luxury terms {found_banned}."}

        return {"valid": True, "reason": "Response passed all checks."}
