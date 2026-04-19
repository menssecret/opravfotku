import os

from providers.local_provider import LocalAIProvider
from providers.external_provider import ExternalAIProvider

def get_ai_provider():
    provider_name = os.getenv("AI_PROVIDER", "local").lower()

    if provider_name == "external":
        return ExternalAIProvider()

    return LocalAIProvider()