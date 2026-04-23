from PIL import Image, ImageFilter, ImageEnhance

def restore_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    # vyčištění drobného šumu a nečistot
    image = image.filter(ImageFilter.MedianFilter(size=5))
    image = image.filter(ImageFilter.SMOOTH_MORE)

    # kontrast
    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.45)

    # ostrost
    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.6)

    # mírné projasnění
    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.06)

    image.save(output_path, quality=95)