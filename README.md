# server-http

[![Build Status](https://travis.ibm.com/PatchPorting/server-http.svg?token=GMH4xFrA9iezVJKqw2zH&branch=master)](https://travis.ibm.com/PatchPorting/server-http)

HTTP API microservice of the Patch porting project. It also includes the database model definition and it's the unique with access to the DB. The rest of the services shoul

## Install

- Install the last [Node.js](https://nodejs.org/download) stable version.
- Get a copy of the code and install the dependencies.

```sh
git clone git@github.ibm.com:PatchPorting/server-http.git
cd server-http
npm i
```

## Use

```sh
npm start
```

## Developer guide

Please check [this link](https://github.com/IBMResearch/backend-development-guide) before a contribution.

## Deploy

bx app push -b https://github.com/heroku/heroku-buildpack-nodejs patchport-http
bx app push -b https://github.com/heroku/heroku-buildpack-nodejs patchport-http-develop
