FROM node:lts-alpine
WORKDIR /app

COPY src src
COPY *.json .
RUN npm i

CMD npm run start
