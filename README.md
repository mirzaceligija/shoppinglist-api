# Shopping List API
---

REST API that allows authenticated users to create, update, edit and delete shopping list.

## Features

- Create Products
- Create, Read, Update, Delete Shopping lists
- Sign up & Sign in \w JWT (Access and Refresh Token)
- Product count based on provided date range

## Tools and Technologies

This API is created using **ExpressJs, Nodejs, Typescript, Docker & Docker compose, Mongoose** with **MongoDb** as a database. Additional tools and technologies used:

- Postman for testing
- 3rd party libraries (config, nanoid, jsonwebtoken, pino, yup, bcrypt, loadash)
- Visual Studio Code and Visual Studio (IDE)

## How to run the project

To run this project you will need **NodeJs**, as well as **Docker for Desktop**.
After installing all of the dependencies, clone the repository, open the terminal and run the following commands:

#### SERVER

```sh
npm --version
docker --version
docker-compose --version
```
If you can see the version of the npm, docker and docker-compose, you are good to go!
Now run the following commands:
```
npm i
npm run dev
```

#### DOCKER AND DATABASE

To run a docker container execute the following command:

```sh
docker-compose up
```

## License

MIT

**Free Software, Hell Yeah!**
