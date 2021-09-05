# USSD Application Demo

USSD Aplication built with NodeJs + Postgres + [Africa's Talking platform](https://africastalking.com)

## Features
-  Authentication
-  Send money
-  Check savings
-  Change PIN
-  View statement

## Staging environment base URL
`https://my-ussd-app.herokuapp.com`

## Setting Up The Application in development environment

1. Open your terminal

2. Run `git clone https://github.com/victkarangwa/USSD-Code-App.git` OR [Download](https://github.com/victkarangwa/USSD-Code-App/archive/refs/heads/master.zip) the project


### I. Setting up the environment

1. **Create** a `.env` file reflecting to `.env.example` file

2. Add the values to all environmental variables in `.env` file

3. Make sure you have PostgreSQL installed (You can download it [here](https://www.postgresql.org/download/))

### II. Running the application

Open termin in the directory you clone the repo from:

1. Run `npm install` to install all dependencies

2. Using postgres, create database for both dev and testing environment. In your `.env`, database URL should be of this format:
   `DATABASE_DEV_URL=postgres://[user]:[password]@[host]:[port/[db_name]`
   ex:
   `DATABASE_DEV_URL=postgres://postgres:1122@localhost:5432/ussd_db`

3. Run `npm run db:migrate` or `yarn db:migrate` to automatically create all necessary models

4. Run `npm run db:seed` or `yarn db:seed` to populate data in the database

5. Run `npm run start:dev` to start local development server. You can also simulate production server locally by running `npm start`

6. Expose a web server running on your local machine to the internet using [ngrok](https://ngrok.com), for more about setting up ngrok use: https://dashboard.ngrok.com/get-started/setup


### III. Setting up simulator with Africa's talking platform

Please read [this article](https://medium.com/@chegemaimuna/africas-talking-node-js-express-ussd-application-7e10aa400b98) if you want to setup your own simulator


## Sample Screenshots

![initial page](https://res.cloudinary.com/victorkarangwa4/image/upload/v1599628720/My%20repo/soo1wgucejaq0e776msu.jpg)

![Menu page](https://res.cloudinary.com/victorkarangwa4/image/upload/v1599628720/My%20repo/tg3vpiht9eklmpre9chr.jpg)

![Saving page](https://res.cloudinary.com/victorkarangwa4/image/upload/v1599628721/My%20repo/vegksui7br36v8g3kmnk.jpg)

![Send Money page](https://res.cloudinary.com/victorkarangwa4/image/upload/v1599628722/My%20repo/zzqhivtvftbewamh7w8s.jpg)

![Change PIN page](https://res.cloudinary.com/victorkarangwa4/image/upload/v1599628722/My%20repo/xblheasmp0w2mhfc6lg4.jpg)

#### Authors
-   Victor Karangwa - [@victorkarangwa4](https://github.com/victorkarangwa4)