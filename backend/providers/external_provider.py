import os
import base64
import replicate
import requests

from providers.base import AIProvider
from ai.auto import auto_image
from ai.colorize import colorize_image
from ai.upscale import upscale_image


def file_to_data_url(path: str, mime_type: str = "image/jpeg") -> str:
    with open(path, "rb") as f:
        encoded = base64.b64encode(f.read()).decode("utf-8")
    return f"data:{mime_type};base64,{encoded}"


class ExternalAIProvider(AIProvider):
    def process(self, mode: str, input_path: str, output_path: str) -> None:
        if mode == "colorize":
            colorize_image(input_path, output_path)
            return

        if mode == "upscale":
            upscale_image(input_path, output_path)
            return

        if mode == "auto":
            auto_image(input_path, output_path)
            return

        if mode != "restore":
            raise Exception(f"Nepodporovaný režim: {mode}")

        token = os.getenv("REPLICATE_API_TOKEN")
        if not token:
            raise Exception("Chybí REPLICATE_API_TOKEN v .env")

        os.environ["REPLICATE_API_TOKEN"] = token

        image_data_url = file_to_data_url(input_path)

        prompt = (
            "Restore this old or damaged photo. "
            "Remove dust, scratches, stains, and small cracks. "
            "Improve clarity and preserve the original identity, pose, composition, and realism. "
            "Do not add new objects, do not change framing, and keep the photo natural."
        )

        output = replicate.run(
            "google/nano-banana",
            input={
                "prompt": prompt,
                "image_input": [image_data_url],
            },
        )

        if not output:
            raise Exception("AI nevrátil žádný výstup")

        image_url = output[0] if isinstance(output, list) else output

        response = requests.get(str(image_url), timeout=120)
        if response.status_code != 200:
            raise Exception("Nepodařilo se stáhnout AI výsledek")

        with open(output_path, "wb") as f:
            f.write(response.content)