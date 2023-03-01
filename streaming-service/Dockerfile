FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV TCP_PORT=12000

EXPOSE 12000

CMD ["npm", "start"]