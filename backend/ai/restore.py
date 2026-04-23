from PIL import Image, ImageFilter, ImageEnhance

def restore_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    image = image.filter(ImageFilter.MedianFilter(size=5))
    image = image.filter(ImageFilter.SMOOTH_MORE)
    image = image.filter(ImageFilter.DETAIL)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.5)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.8)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.06)

    image.save(output_path, quality=95)