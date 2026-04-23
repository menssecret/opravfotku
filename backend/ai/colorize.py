from PIL import Image, ImageEnhance, ImageOps

def colorize_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    gray = ImageOps.grayscale(image)
    image = ImageOps.colorize(
        gray,
        black="#2f2620",
        white="#f0d7b1",
        mid="#b88a5a"
    ).convert("RGB")

    color = ImageEnhance.Color(image)
    image = color.enhance(1.55)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.15)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.04)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.15)

    image.save(output_path, quality=95)