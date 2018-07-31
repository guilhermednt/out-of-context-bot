FROM node:8

WORKDIR /bot
COPY ./package*.json /bot/
RUN npm install
COPY . /bot

ENTRYPOINT [ "node", "app.js" ]
