from PIL import Image, ImageEnhance

def colorize_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    color = ImageEnhance.Color(image)
    image = color.enhance(1.25)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.05)

    image.save(output_path, quality=95)