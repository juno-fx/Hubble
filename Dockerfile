FROM node:alpine AS dev

WORKDIR /app

COPY . .

RUN yarn install

FROM node:alpine AS build

WORKDIR /app

COPY . .

RUN yarn install \
    && yarn build

FROM node:alpine

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/build/ .

CMD ["sh", "-c", "serve -s . -l tcp://0.0.0.0:3000"]
