import os
from PIL import Image, ImageEnhance, ImageFilter

def auto_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    image = image.filter(ImageFilter.MedianFilter(size=3))
    image = image.filter(ImageFilter.SMOOTH_MORE)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.18)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.04)

    color = ImageEnhance.Color(image)
    image = color.enhance(1.12)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.22)

    image.save(output_path, quality=95)