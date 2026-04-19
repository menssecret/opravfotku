from PIL import Image, ImageEnhance, ImageFilter

def auto_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")
    image = image.filter(ImageFilter.SHARPEN)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.10)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.03)

    color = ImageEnhance.Color(image)
    image = color.enhance(1.10)

    width, height = image.size
    image = image.resize((width, height), Image.LANCZOS)

    image.save(output_path, quality=95)