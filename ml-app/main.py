import os

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

import io
import tensorflow as tf
from tensorflow import keras
import numpy as np
from PIL import Image

from flask import Flask, request, jsonify

model = tf.saved_model.load("./model")


def transform_image(pillow_image):
    data = np.asarray(pillow_image)
    data = data[..., :3]
    data = tf.image.resize(data, [150, 150])
    data = np.expand_dims(data, axis=0)
    data = np.vstack([data])
    return data


def predict(x):
    predictions = model.serve(x)
    return np.argmax(predictions)
    # predictions = model(x)
    # predictions = tf.nn.softmax(predictions)
    # pred0 = predictions[0]
    # label0 = np.argmax(pred0)
    # return label0


app = Flask(__name__)


@app.route("/predict", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        file = request.files.get("file")
        if file is None or file.filename == "":
            return jsonify({"error": "no file"})

        try:
            image_bytes = file.read()
            pillow_img = Image.open(io.BytesIO(image_bytes))
            tensor = transform_image(pillow_img)
            prediction = predict(tensor)
            data = {"prediction": int(prediction)}
            return jsonify(data)
        except Exception as e:
            return jsonify({"error": str(e)})

    return "OK"


if __name__ == "__main__":
    app.run(debug=True)
