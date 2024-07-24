#Build app
FROM node:22-alpine

WORKDIR /app

COPY package.json  .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 8080

RUN npm run build

CMD ['npm', 'run' 'start:n']
