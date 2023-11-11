import os
from flask import Flask, request, jsonify

app = Flask(__name__, template_folder='templates', static_folder = 'static')

@app.route('/')
def welcome_page():
    

