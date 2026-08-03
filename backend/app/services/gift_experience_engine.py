from typing import Dict, Any, List
from app.models.product import Product

class GiftExperienceEngine:
    """
    CHARIS Gift Experience Engine: Transforms standalone product items into complete 360° 
    curated luxury gift experiences.
    """

    WRAPPING_SELECTIONS = [
        {
            "name": "Imperial Monogrammed Burgundy Silk",
            "details": "Wrapped in hand-woven Mulberry Burgundy silk with gold metallic thread stitching and a hand-poured gold wax seal featuring the CHARIS crown insignia.",
            "ribbon": "24K Gold Leaf Satin Ribbon"
        },
        {
            "name": "Obsidian & Champagne Leather Envelope",
            "details": "Encased in a custom matte obsidian leather presentation box lined with champagne velvet and magnetic brass closure.",
            "ribbon": "Champagne Grosgrain Ribbon"
        },
        {
            "name": "Royal Emerald Velvet Vault",
            "details": "Housed in deep emerald plush velvet with custom carved brass corner protectors and silk interior cushion.",
            "ribbon": "Double-Faced Gold Foil Ribbon"
        }
    ]

    FLOWER_PAIRINGS = [
        {
            "name": "Ecuadorian White Avalanche Roses & Gilded Eucalyptus",
            "meaning": "Purity, devotion, and timeless luxury elegance.",
            "presentation": "Arranged in a mouth-blown smoked crystal vase."
        },
        {
            "name": "Royal Kashmiri Saffron Crocus & Night-Blooming Jasmine",
            "meaning": "Sensory delight, warmth, and rare Indian royal heritage.",
            "presentation": "Presented in a brass hand-etched urn."
        },
        {
            "name": "Deep Crimson Piano Roses & Dried Gold Wheat",
            "meaning": "Passionate love, prosperity, and enduring abundance.",
            "presentation": "Bouquet bound with gold silk thread."
        }
    ]

    CHOCOLATE_PAIRINGS = [
        {
            "name": "Valrhona Single-Origin Dark Truffles with 24K Gold Leaf",
            "notes": "Infused with 80-year-old cognac and dusted with edible gold leaf.",
            "packaging": "Hand-numbered black wooden ballotin box."
        },
        {
            "name": "Artisanal Kashmiri Saffron & Pistachio Pralines",
            "notes": "Hand-rolled ganache blended with wild Himalayan honey and Kashmiri saffron.",
            "packaging": "Gold embossed velvet box."
        },
        {
            "name": "Pierre Marcolini Grand Cru Cocoa Selection",
            "notes": "Rare Criollo cocoa beans sourced from single estates in Madagascar and Ecuador.",
            "packaging": "Signature white linen presentation box."
        }
    ]

    def create_experience(
        self, 
        product: Product, 
        recipient_name: str, 
        occasion: str, 
        primary_emotion: str,
        index: int = 0
    ) -> Dict[str, Any]:
        
        wrap = self.WRAPPING_SELECTIONS[index % len(self.WRAPPING_SELECTIONS)]
        flower = self.FLOWER_PAIRINGS[index % len(self.FLOWER_PAIRINGS)]
        chocolate = self.CHOCOLATE_PAIRINGS[index % len(self.CHOCOLATE_PAIRINGS)]

        # Custom presentation advice
        advice = (
            f"Present this piece in a dimly lit, intimate setting after dinner. "
            f"Hand over the {wrap['name']} box first, encouraging {recipient_name} to unseal "
            f"the gold wax stamp personally while the Ecuadorian roses infuse the room with soft fragrance."
        )

        greeting_card = (
            f"Dearest {recipient_name},\n\n"
            f"To commemorate {occasion}, may this {product.name} serve as a lasting symbol of "
            f"our deepest {primary_emotion.lower()} and cherished memories.\n\n"
            f"With eternal affection,"
        )

        return {
            "luxury_wrapping": wrap,
            "flower_pairing": flower,
            "chocolate_pairing": chocolate,
            "greeting_card_text": greeting_card,
            "delivery_protocol": "White-Glove Armored Courier with temperature-controlled security case and handover specialist.",
            "presentation_advice": advice,
            "expected_emotional_impact": f"Evokes profound {primary_emotion.lower()}, joyful wonder, and an unforgettable sense of heirloom distinction."
        }

gift_experience_engine = GiftExperienceEngine()
