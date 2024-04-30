# Development
Steps to launch application in development


1. Create ```.env``` and add environment variables
   ```
   DB_USER     = ****************
   DB_NAME     = ****************
   DB_PASSWORD = ****************
   ```

2. Go to [Paypal Developer](https://developer.paypal.com/home), log-in (or sign-up), create a App (careful with checkbox sandbox/live, must be check in  sandbox) and get APIs Credentials

3. write APIs Credentials as environment variables on ```.env```
   ```
   NEXT_PUBLIC_PAYPAL_CLIENT_ID  = ***************
   NEXT_PUBLIC_PAYPAL_SECRET_KEY = ***************
   ```
   4.1 Little tip (optional): create a test customer user on [Paypal Developer Accounts](https://developer.paypal.com/dashboard/accounts/).


4. Copy this environment variables and add to ```.env```
   ```
   PAYPAL_OAUTH_URL=https://api-m.sandbox.paypal.com/v1/oauth2/token
   PAYPAL_ORDERS_URL=https://api.sandbox.paypal.com/v2/checkout/orders
   ```

5. Go to [Cloudinary](https://cloudinary.com/) and Log in create app to get api key, api secret and cloud name for add to ```.env```:
   ```
   CLOUD_NAME       = ***************
   CLOUD_API_KEY    = ***************
   CLOUD_API_SECRET = ***************
   ```

6. Excecute command ``` npm install ```

7. Create data bases   ``` docker compose up -d ```

8. Run prisma migrations ``` npx prisma migrate dev ```

9. Excecute seed ``` npm run seed ```

## Launch development mode

10. Excecute command ``` npm run dev ```
