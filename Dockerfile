#Build app
FROM node:22-alpine

WORKDIR usr/src/app

COPY package.json /app/package.json

RUN npm install

COPY . .

EXPOSE="8080"

RUN npm run build

CMD ['npm', 'run' 'start:n']
