# WeatherStation

Before getting started please install `MongoDB` and `Node.js` to your system

# Development

To start the project
```bash
yarn start
```
Start scripts are set in `package.json`

You can also run in development mode, this uses nodemon to watch for changes

```bash
yarn dev
```

To initialize the database use the following command
(this uses `migrate-mongo` to initialize the database with data)

```bash
yarn db:init
```

For viewing the database use the following command
(this starts a `mongo-express` session to the local Mongo DB)
```bash
yarn db
```
 
### Used technologies

 - `yarn ` as a package management
 - `prettier` auto code formatting
 - `sass` for css preprocessing
 - `nodemon` for auto reloading
 - `express` for the server
 - `mongoose` for the database communication

> **_NOTE:_**  Prettier and scss are set to autorun on save in WebStorm

---

# TODO List

 - [ ] Create /api endpoint for the measurements to save the measurements
 - [ ] Create admin and regular user accounts
    - [ ] Admin account should have access to all features
      - API Token generation only can be accessed by the admin
    - [ ] Sensor can be assigned to one user
    - [ ] For every user show only their sensors
    - [ ] Users can only change their settings, and can't create new users
 - [ ] Set date range for the graphs
 - [ ] Add a*X + b formula to renderd sensor datas
 - [ ] Group and reduce data in the database query
   - [ ] Maybe MongoDB-s new time series collection can be used somehow
 - [ ] Add login error massages
 - [ ] Add server one time notification system (breadcrumb or something)
   - [ ] Do error handling
 - [ ] Add pop up warning for deleting a sensor
 - [ ] Add pop up warning for deleting a sensor type
 - [ ] Add pop up warning for deleting a user
 - [ ] Migrate the project to TypeScript
 - [ ] Create render middleware, and make all the routes available as an API also
