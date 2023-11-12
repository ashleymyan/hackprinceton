from flask import Flask, request, jsonify
from flask_cors import CORS
import database

app = Flask(__name__)
CORS(app)

@app.cli.command('init-db')
def init_db_command():
    database.create_table()
    print('Initialized the database.')

@app.route('/create_account', methods=['POST'], strict_slashes=False)
def create_account():
    try:
        data = request.json
        name = data['name']
        email = data['email']
        password = data['password']
        database.insert_account(name, email, password)
        return jsonify({'status': 'Account created successfully'})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'success': False, 'status': 'An error occurred'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    if database.is_account(email, password):
        return jsonify({'success': True})
    return jsonify({'success': False, 'message': 'Invalid credentials'})

if __name__ == '__main__':
    app.run(debug=True)
    

