from PIL import Image, ImageEnhance, ImageFilter

def restore_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")
    image = image.filter(ImageFilter.SHARPEN)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.12)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.04)

    color = ImageEnhance.Color(image)
    image = color.enhance(1.08)

    image.save(output_path, quality=95)