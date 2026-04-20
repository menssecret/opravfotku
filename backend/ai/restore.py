from PIL import Image, ImageFilter, ImageEnhance

def restore_image(input_path, output_path):
    image = Image.open(input_path)

    # silné vyhlazení
    image = image.filter(ImageFilter.SMOOTH_MORE)

    # zvýšení kontrastu
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(1.4)

    # lehké doostření
    image = image.filter(ImageFilter.SHARPEN)

    image.save(output_path)