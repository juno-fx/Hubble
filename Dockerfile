FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN npm i && npm run-script build

FROM node:alpine

WORKDIR /app

RUN npm i serve -g

COPY --from=build /app/build/ .

CMD ["sh", "-c", "serve -s ."]
