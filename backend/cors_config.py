from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Habilita CORS para todas as rotas
    CORS(app, origins="*")
    
    return app

