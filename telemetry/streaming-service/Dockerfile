FROM node:18-alpine

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 12000
EXPOSE 8080

CMD ["npm", "start"]