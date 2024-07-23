#Build app
FROM node:lts

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm ci

COPY . /app

ENV CI=true

RUN npx tsc

CMD ['npm', 'run' 'start:n']