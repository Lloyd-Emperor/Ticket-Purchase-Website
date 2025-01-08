import os
from flask import Flask, render_template, request, redirect
from utils.paystack import initialize_payment, verify_payment
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable cross-origin requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tickets', methods=['GET', 'POST'])
def tickets():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = (request.form['phone'])
        ticket_price = int(request.form['ticket_price'])
        amount = ticket_price
        quantity = int(request.form['quantity'])
        ticket_type = request.form['ticket_category']
        
        response = initialize_payment(email, amount, name, phone, quantity, ticket_type)

        if response['status']:
            return redirect(response['data']['authorization_url'])
        else:
            return render_template('error.html', message="Payment initialization failed.")    
    return render_template('tickets.html')

@app.route('/payment/success')
def payment_success():
    reference = request.args.get('reference')
    verification = verify_payment(reference)

    if verification['status'] and verification['data']['status'] == 'success':
        return render_template('success.html', transaction=verification['data'])
    else:
        return render_template('error.html', message="Payment verification failed.")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3000))
    app.run(host='35.160.120.126', port=port)
    app.run(debug=False)