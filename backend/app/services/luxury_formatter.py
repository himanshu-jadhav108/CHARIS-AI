import re

class LuxuryFormatter:
    @staticmethod
    def format_response(text: str) -> str:
        """
        Enforces elegant spacing, beautiful section headers, and premium copywriting styling.
        """
        formatted = text.strip()

        # Replace double newlines with uniform premium spacing
        formatted = re.sub(r'\n{3,}', '\n\n', formatted)

        # Capitalize and stylize standard section headers if present
        headers = {
            "why this gift matters:": "✨ Why This Gift Matters",
            "emotional narrative:": "📜 The Emotional Narrative",
            "personal reflection:": "🕊️ Personal Reflection",
            "unboxing protocol:": "🎁 The Unboxing Protocol",
            "greeting card:": "✍️ Calligraphic Greeting Card"
        }

        for raw_hdr, premium_hdr in headers.items():
            # Case insensitive replace
            formatted = re.sub(
                re.escape(raw_hdr),
                f"\n\n{premium_hdr}\n",
                formatted,
                flags=re.IGNORECASE
            )

        return formatted
