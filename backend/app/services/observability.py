import time
import logging
from typing import Dict, Any

# Configure rich logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("charis.observability")

class ObservabilityTracker:
    @staticmethod
    def track_metrics(
        stage_latencies: Dict[str, float],
        token_usage: Dict[str, int],
        metadata: Dict[str, Any]
    ):
        """
        Logs details for diagnostics and metrics.
        """
        total_time = sum(stage_latencies.values())
        
        logger.info(
            f"====== CHARIS OBSERVABILITY TRACE ======\n"
            f"Conversation ID: {metadata.get('conversation_id', 'N/A')}\n"
            f"Recommendation ID: {metadata.get('recommendation_id', 'N/A')}\n"
            f"Latency Breakdown:\n"
            f"  - Context Build: {stage_latencies.get('context_build', 0.0)*1000:.2f}ms\n"
            f"  - Conversation Summary: {stage_latencies.get('conv_summary', 0.0)*1000:.2f}ms\n"
            f"  - Prompt Build: {stage_latencies.get('prompt_build', 0.0)*1000:.2f}ms\n"
            f"  - Gemini Provider Call: {stage_latencies.get('gemini_call', 0.0)*1000:.2f}ms\n"
            f"  - Response Validation: {stage_latencies.get('validation', 0.0)*1000:.2f}ms\n"
            f"  - Luxury Formatting: {stage_latencies.get('formatting', 0.0)*1000:.2f}ms\n"
            f"  - Total Pipeline Time: {total_time*1000:.2f}ms\n"
            f"Token & Payload Metrics:\n"
            f"  - Prompt Char Size: {token_usage.get('prompt_chars', 0)}\n"
            f"  - Completion Char Size: {token_usage.get('completion_chars', 0)}\n"
            f"  - Est. Token Usage: {token_usage.get('estimated_tokens', 0)}\n"
            f"Fallback Invoked: {metadata.get('fallback_used', False)}\n"
            f"========================================"
        )
