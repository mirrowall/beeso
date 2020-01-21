# coding: utf-8

from PIL import Image

def clipimage(size):
    width = int(size[0])
    height = int(size[1])
    box = ()
    if (width > height):
        dx = width - height
        box = (dx / 2, 0, height + dx / 2,  height)
    else:
        dx = height - width
        box = (0, dx / 2, width, width + dx / 2)
    return box

def thumb_photo(file_path,file_name):
    __img = Image.open(file_path)
    box = clipimage(__img.size)
    region = __img.crop(box)
    size = (348, 348)
    region.thumbnail(size, Image.ANTIALIAS)
    saveToPath = file_name
    region.save(saveToPath, "JPEG")

thumb_photo("./24406.jpg", "./2.jpg")
