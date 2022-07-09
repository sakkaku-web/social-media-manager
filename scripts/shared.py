import os


def resolve_image_paths(image_paths):
    file_paths = []
    for path in image_paths:
        if os.path.isfile(path):
            file_paths.append(path)
        else:
            with os.scandir(path) as dirs:
                for entry in dirs:
                    if entry.is_file():
                        file_paths.append(entry.path)
    return file_paths


def build_images(images: [str]):
    return [('images', open(i, 'rb'))
            for i in resolve_image_paths(images)]


BASE_URL = 'https://sns-manager.herokuapp.com/api'
# BASE_URL = 'http://localhost:5000/api'
