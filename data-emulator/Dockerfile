FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV production

EXPOSE 12000

CMD [ "node", "dist/battery_emulator.js" ]