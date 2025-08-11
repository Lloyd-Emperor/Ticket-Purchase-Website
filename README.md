<<<<<<< HEAD
## Couples and Lovers Retreat – Ticketing Site

Romantic-themed ticket purchase website for the Couples and Lovers Retreat. It provides a modern landing page, ticket purchase form with live pricing, and Paystack integration for payments.

### Features
- **Modern landing page**: Hero, event details, highlights, and clear CTAs.
- **Tickets page**: Clean form, ticket category selector, quantity, and live total price.
- **Payment**: Paystack initialization and verification flows.
- **Responsive UI**: Works well on mobile, tablet, and desktop.
- **Quality of life**: Persists selected category/quantity, smooth scroll, and back-to-top button.

### Tech Stack
- **Backend**: Python, Flask
- **Payments**: Paystack REST API
- **Frontend**: HTML, CSS, vanilla JS
- **Web server (prod)**: gunicorn/waitress

### Project Structure
```
Paystack_Ticket_Site/
  app.py
  config.py
  requirements.txt
  utils/
    paystack.py
  templates/
    index.html
    tickets.html
    success.html
    error.html
  static/
    styles.css
    main.js
    heart.png
    heart-rate.png
    heart-divider.png
```

### Prerequisites
- Python 3.10+
- A Paystack account (test keys for development)

### Configuration
There are two things to set up: your Paystack keys and the callback URL.

- Open `config.py` and set your keys:
  ```python
  PAYSTACK_SECRET_KEY = 'sk_test_xxx'
  PAYSTACK_PUBLIC_KEY = 'pk_test_xxx'
  ```
- Set the payment callback URL used by Paystack after a successful payment. In `utils/paystack.py`, update `callback_url` to your environment/domain:
  ```python
  # utils/paystack.py (inside initialize_payment data)
  "callback_url": "https://your-domain.example.com/payment/success",
  ```
  Optional: You can drive this via an environment variable by setting `BASE_URL` and adjusting the code to build the callback: `f"{BASE_URL}/payment/success"`.

Security note: Never commit real secret keys. Use test keys locally and set real keys as deployment secrets.

### Installation (Windows PowerShell)
```powershell
cd C:\Users\HP\Documents\Paystack_Ticket_Site
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Run Locally
The app defaults to port 3000.

Option A (Flask dev server):
```powershell
set PORT=3000
python app.py
```

Option B (Waitress, recommended on Windows):
```powershell
.\.venv\Scripts\Activate.ps1
waitress-serve --listen=0.0.0.0:3000 app:app
```

Option C (gunicorn, Linux/macOS):
```bash
PORT=3000 gunicorn -b 0.0.0.0:$PORT app:app
```

Open `http://localhost:3000` in your browser.

### Routes
- `/` – Landing page
- `/tickets` – Ticket purchase form (POST submits to Paystack initialization)
- `/payment/success` – Paystack redirect/verification endpoint

### Updating Ticket Categories and Prices
Edit `templates/tickets.html` and adjust the `<option>` entries. Prices are read from the `data-price` attribute in Naira and used for live totals.
```html
<option value="VIP" data-price="100000">VIP - ₦100,000</option>
```

### How Payments Work
1. User completes the form on `/tickets`.
2. Server calls Paystack `transaction/initialize` with amount, customer, and metadata.
3. User is redirected to Paystack checkout.
4. Paystack redirects back to `/payment/success?reference=...`.
5. Server verifies the reference via `transaction/verify` and shows success or error.

### Testing with Paystack (Sandbox)
- Use your Paystack test keys in `config.py`.
- Test card (from Paystack docs): `4084 0840 8408 4081`, any future expiry, CVV `408`, PIN `1234`, OTP `123456`.

### Frontend Notes
- Styles live in `static/styles.css`. Key classes: `navbar`, `hero`, `section`, `feature-grid`, `ticket-form`, `btn`, `btn-primary`.
- JS (`static/main.js`) handles:
  - Smooth scroll for in-page links.
  - Persisting `ticketCategory` and `quantity` via `localStorage`.
  - Live total price, hidden `ticket_price` form value, and back-to-top button.

### Deployment Notes
- Ensure `callback_url` in `utils/paystack.py` points to your deployed domain.
- Set `PORT` via your PaaS (e.g., Render/Heroku). Start command examples:
  - `gunicorn -b 0.0.0.0:$PORT app:app` (Linux)
  - `waitress-serve --listen=0.0.0.0:$PORT app:app` (Windows servers)
- Configure environment secrets for your Paystack keys. Do not commit real keys.

### Validation and Edge Cases
- Phone must be digits-only (`utils/paystack.py` enforces this and quantity > 0).
- Amount is computed from the selected category price times quantity.

### Troubleshooting
- Payment initialization failed: Check network, keys in `config.py`, and that the amount is in kobo (`amount * 100` is already handled server-side).
- Wrong redirect: Update `callback_url` to your current public domain or ngrok URL.
- Prices not updating: Ensure your `<option>` elements include `data-price` and the IDs `ticketCategory`, `quantity`, and `totalPrice` exist in the form.

### License
Proprietary – for internal/event use. Replace with your preferred license if needed.

=======
# Event Ticket Purchase Website

A modern and user-friendly ticket purchase platform designed to streamline ticket booking for events. This website offers a seamless experience for users to select ticket categories and complete payments securely.

## Features
- Easy ticket selection with multiple categories (Regular, VIP, Platinum, Table for 5)
- Secure online payment integration with Paystack
- Responsive and visually appealing design
- Real-time ticket availability updates
- User-friendly interface and smooth navigation
- Automated email confirmation after successful payment

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Flask
- **Payment Gateway:** Paystack
- **Deployment:** Render

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Lloyd-Emperor/Lloyd-Emperor-Ticket-Purchase-Website.git
   cd Lloyd-Emperor-Ticket-Purchase-Website
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

## Usage
1. Start the server:
   ```bash
   python app.py
   ```

2. Open your browser and navigate to:
   ```bash
   http://localhost:3000
   ```

3. Follow the instructions to purchase tickets and complete payments.

## License
This project is licensed under the MIT License.

## Contributions
Contributions are welcome! Feel free to open issues and submit pull requests to enhance the platform.

>>>>>>> c18ac702f45399295895c7349b4fe26eb1ba147c
