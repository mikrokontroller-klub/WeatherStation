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

