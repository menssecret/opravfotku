from PIL import Image, ImageFilter, ImageEnhance

def auto_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    image = image.filter(ImageFilter.MedianFilter(size=3))
    image = image.filter(ImageFilter.SMOOTH_MORE)
    image = image.filter(ImageFilter.DETAIL)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.22)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.05)

    color = ImageEnhance.Color(image)
    image = color.enhance(1.18)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.35)

    image.save(output_path, quality=95)