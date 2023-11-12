import sqlite3

def create_table():
    conn = sqlite3.connect('account_data.db')
    cursor = conn.cursor()

    # Create a table for account IDs
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS accounts (
        name TEXT NOT NULL,       
        email TEXT NOT NULL,
        password TEXT NOT NULL
    )
    ''')
                
    # Commit changes and close connection
    conn.commit()
    conn.close()

#insert data
def insert_account(name, email, password):
    conn = sqlite3.connect('account_data.db')
    cursor = conn.cursor()

    cursor.execute('INSERT INTO accounts (name, email, password) VALUES (?, ?, ?)', 
                   (name, email, password))

    conn.commit()
    conn.close()

#retrieve data (format: list of tuples)
def get_accounts():
    conn = sqlite3.connect('account_data.db')
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM accounts')
    accounts = cursor.fetchall()

    conn.close()
    return accounts

def is_account(email, password):
    for tuple in get_accounts():
        if tuple[1] == email and tuple[2] == password:
            return True
    return False

def update_username(email, newName):
    conn = sqlite3.connect('account_data.db')
    cursor = conn.cursor()

    cursor.execute('UPDATE accounts SET name = ? WHERE email = ?', (newName, email))

    conn.commit()
    conn.close()



