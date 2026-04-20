from PIL import Image, ImageEnhance

def colorize_image(input_path, output_path):
    image = Image.open(input_path).convert("RGB")

    # simulace "colorize" přes saturaci
    enhancer = ImageEnhance.Color(image)
    image = enhancer.enhance(1.8)

    image.save(output_path)