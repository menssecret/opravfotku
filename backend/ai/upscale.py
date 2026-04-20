from PIL import Image

def upscale_image(input_path, output_path):
    image = Image.open(input_path)

    new_size = (image.width * 2, image.height * 2)
    image = image.resize(new_size, Image.LANCZOS)

    image.save(output_path)