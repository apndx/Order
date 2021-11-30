#!/bin/sh

./node_modules/.bin/sequelize db:migrate
node index.js
