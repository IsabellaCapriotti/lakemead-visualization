from flask import Flask
from flask_cors import CORS
import urllib.request

app = Flask(__name__)
CORS(app)

@app.route("/elevation_data")
def get_elevation_data():
    res = urllib.request.urlopen("https://www.usbr.gov/uc/water/hydrodata/reservoir_data/921/json/49.json")
    return res 