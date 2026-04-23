from PIL import Image, ImageEnhance, ImageFilter

def upscale_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    new_size = (image.width * 2, image.height * 2)
    image = image.resize(new_size, Image.LANCZOS)

    image = image.filter(ImageFilter.SHARPEN)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.4)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.06)

    image.save(output_path, quality=95)