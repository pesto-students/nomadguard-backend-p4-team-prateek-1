# NomadGUARD SERVER

A Borderless Future of Health and Travel Insurance for Nomads & Remote working employees. 
</br>
Travel medical insurance. We cover people from all over the world, while outside their home country.
<br/>

# Table of Contents

1. [Demo](#demo)
2. [Local Setup](#local-setup)
3. [Technology Stack](#technology-stack)
4. [Authors](#authors)
5. [License](#license)

# Demo
[Live Demo](https://nomadguard.netlify.app/)
Test Credentials:

- For Admin
  - Email: admin@ng.com
  - Password: 123


<br/>

# LOCAL SETUP

Prerequisites:

-   You will need a mongoDB atlas account.

1. Clone the repo on your local ('dev' branch) and run "npm install".
2. Create a ".env" file and use the contents shared below.
6. Finally command "npm run dev" to run the server instance.

Port 5000 should be used, otherwise update the env variables accordingly.

".env" file

```
PORT = 8080
MONGO_URI = mongodb+srv://<username>:<password>@cluster0-c60su.mongodb.net/nomadGUARD?retryWrites=true&w=majority


EMAIL_USERNAME = "apikey"
EMAIL_PASSWORD = "SG.S4djv-G8RY-aUnXYXlFJDA.VHnsFdErNsoAgUV9oYHGhCctBz-THB7sVqFb2Ok" (DUMMY FORMAT)

STRIPE_SECRET_KEY = sk_test_51MOZhmSGd20pUt0cXZxPqyjPoYIPJP1VWhQs67oPjF0IgBksXLRXFWtxJZUMHO6Dvy18PsKfn6Kkxt00e5Q1fzdX  (DUMMY FORMAT)
```
<br/>

# Technology Stack

- [Material MUI](https://mui.com/)
- [React 18.2.0](https://reactjs.org/)
- [MondoDB](https://www.mongodb.com/)
- [Node](https://nodejs.org/en/)  


</br>

# License

[MIT](https://opensource.org/licenses/MIT)