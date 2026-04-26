from PIL import Image, ImageFilter, ImageEnhance

def auto_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    image = image.filter(ImageFilter.DETAIL)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.1)

    color = ImageEnhance.Color(image)
    image = color.enhance(1.08)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.2)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.02)

    image.save(output_path, quality=95)