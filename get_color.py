from PIL import Image
import sys

def get_hex(path):
    try:
        img = Image.open(path)
        img = img.resize((1, 1))
        color = img.getpixel((0, 0))
        # handle alpha if present
        if len(color) == 4:
            r, g, b, a = color
        else:
            r, g, b = color
        return '#{:02x}{:02x}{:02x}'.format(r, g, b)
    except Exception as e:
        print(f"Error: {e}")
        return "ERROR"

img1 = '/Users/ito3/.gemini/antigravity/brain/84509355-4bb8-471d-8922-685429db3b7f/uploaded_media_0_1769895303271.png'
img2 = '/Users/ito3/.gemini/antigravity/brain/84509355-4bb8-471d-8922-685429db3b7f/uploaded_media_1_1769895303271.png'

print(f"Image 1: {get_hex(img1)}")
print(f"Image 2: {get_hex(img2)}")
