from PIL import Image, ImageEnhance, ImageFilter

def upscale_image(input_path: str, output_path: str):
    image = Image.open(input_path).convert("RGB")

    image = image.resize(
        (image.width * 2, image.height * 2),
        Image.LANCZOS
    )

    image = image.filter(ImageFilter.DETAIL)

    sharpness = ImageEnhance.Sharpness(image)
    image = sharpness.enhance(1.35)

    contrast = ImageEnhance.Contrast(image)
    image = contrast.enhance(1.04)

    image.save(output_path, quality=95)