FROM node:16-alpine3.15

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./tsconfig.json ./
RUN npm ci

COPY . .
RUN npm i typescript -g
RUN tsc
RUN ls | grep -v 'dist' | grep -v 'node_modules' | xargs rm -rf
CMD [ "node", "./dist/app.js" ]