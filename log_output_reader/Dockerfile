FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV PINGS_URL="http://pong-svc:2345/pingpong"

CMD ["npm", "start"]