from PIL import Image, ImageEnhance, ImageOps

def colorize_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    gray = ImageOps.grayscale(image)
    image = ImageOps.colorize(gray, black="#3b2f2f", white="#f2d2a2").convert("RGB")

    color = ImageEnhance.Color(image)
    image = color.enhance(1.35)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.08)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.03)

    image.save(output_path, quality=95)