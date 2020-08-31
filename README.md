# Node.js & Passport Login + Simple lists app

This is a user login and registration app using Node.js, Express, Passport, Mongoose, EJS and some other packages. It can also create simple lists/posts and delete them.

### Usage

```sh
$ npm install
```

```sh
$ npm start
# Or run with Nodemon
$ npm run dev

# Visit http://localhost:5000
```

### MongoDB

Open ".env" and add your MongoDB URI, local or Atlas

### Docker usage

```sh
# Run in Docker
docker-compose up
# use -d flag to run in background

# Tear down
docker-compose down

# To be able to edit files, add volume to compose file
volumes: ['./:/usr/src/app']

# To re-build
docker-compose build
```
