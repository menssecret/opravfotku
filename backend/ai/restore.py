from PIL import Image, ImageFilter, ImageEnhance

def restore_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    # Jemné odstranění šumu bez plastové pleti
    image = image.filter(ImageFilter.MedianFilter(size=3))

    # Lehce vytáhnout detaily
    image = image.filter(ImageFilter.DETAIL)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.12)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.28)

    brightness = ImageEnhance.Brightness(image)
    image = brightness.enhance(1.02)

    image.save(output_path, quality=95)