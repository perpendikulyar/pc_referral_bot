#Build app
FROM --platform=linux/amd64 node:22-alpine

WORKDIR /app

COPY package.json  .
COPY package-lock.json .

RUN npm ci

COPY . .

EXPOSE 8080

RUN npm run build

CMD ["npm", "run", "start:n"]
