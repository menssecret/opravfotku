from PIL import Image, ImageEnhance

def upscale_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    width, height = image.size
    upscaled = image.resize((width * 2, height * 2), Image.LANCZOS)

    sharpness = ImageEnhance.Sharpness(upscaled)
    upscaled = sharpness.enhance(1.2)

    upscaled.save(output_path, quality=95)