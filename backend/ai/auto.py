from ai.restore import restore_image
from ai.upscale import upscale_image

def auto_image(input_path, output_path):
    temp_path = output_path + "_temp.jpg"

    restore_image(input_path, temp_path)
    upscale_image(temp_path, output_path)