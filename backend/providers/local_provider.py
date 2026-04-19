from providers.base import AIProvider
from ai.auto import auto_image
from ai.restore import restore_image
from ai.colorize import colorize_image
from ai.upscale import upscale_image

class LocalAIProvider(AIProvider):
    def process(self, mode: str, input_path: str, output_path: str) -> None:
        if mode == "restore":
            restore_image(input_path, output_path)
        elif mode == "colorize":
            colorize_image(input_path, output_path)
        elif mode == "upscale":
            upscale_image(input_path, output_path)
        else:
            auto_image(input_path, output_path)