FROM node:lts-alpine

RUN npm install -g http-server

RUN mkdir -p /app/dist
WORKDIR /app

COPY ./dist ./dist

EXPOSE 8080
CMD http-server dist -p 80
