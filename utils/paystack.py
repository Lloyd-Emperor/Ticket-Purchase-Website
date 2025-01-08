import os
import requests
from config import PAYSTACK_SECRET_KEY

BASE_URL = os.environ.get('BASE_URL')
# callback_url = f"{BASE_URL}/payment/success"

def initialize_payment(email, amount, name, phone, quantity, ticket_type):
    if not isinstance(phone, str) or not phone.isdigit():
        raise ValueError("Phone number must contain only digits.")
    if quantity <= 0:
        raise ValueError("Select Ticket Quantity.")

    url = "https://api.paystack.co/transaction/initialize"
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "email": email,
        "amount": amount * 100,
        "currency": "NGN",
        # "callback_url": "https://bb96-197-211-59-71.ngrok-free.app/payment/success",
        # "callback_url": "http://127.0.0.1:5000/payment/success",
        "callback_url": "https://ticketpurchasewebsite.onrender.com/payment/success",
        "metadata": {
             "custom_fields": [
                {"display_name": "Full Name", "variable_name": "full_name", "value": name},
                {"display_name": "Phone Number", "variable_name": "phone_number", "value": phone},
                {"display_name": "Ticket Quantity", "variable_name": "quantity", "value": quantity},
                {"display_name": "Ticket Category", "variable_name": "amount", "value": f"{ticket_type} - ₦{amount/quantity:,}"},
            ]
        }
    }

    try:
        response = requests.post(url, json=data, headers=headers)
        print(response.json())
        response_data = response.json()

        # Check for errors in response
        if not response_data.get('status'):
            raise Exception(f"Payment initialization failed: {response_data.get('message', 'Unknown error')}")

        return response_data
    except requests.RequestException as e:
        raise Exception(f"An error occurred while connecting to Paystack: {e}")


def verify_payment(reference):
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}"
    }
    response = requests.get(url, headers=headers)
    return response.json()
