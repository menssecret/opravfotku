from PIL import Image, ImageEnhance, ImageOps

def colorize_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    gray = ImageOps.grayscale(image)

    # Neutrální teplý tón, bez červeného nádechu
    image = ImageOps.colorize(
        gray,
        black="#242424",
        white="#e7ddd2"
    ).convert("RGB")

    color = ImageEnhance.Color(image)
    image = color.enhance(1.18)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.08)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.12)

    image.save(output_path, quality=95)