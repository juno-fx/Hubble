FROM node:alpine AS dev

WORKDIR /app

COPY . .

RUN yarn install \
    --no-progress \
    --ignore-optional \
    --ignore-platform \
    --ignore-engines

FROM node:alpine AS build

WORKDIR /app

COPY --from=dev /app/ .

RUN yarn build

FROM node:alpine AS prod

WORKDIR /app

RUN yarn global add serve

COPY --from=build /app/dist/ .

CMD ["sh", "-c", "serve -s /app/ -l tcp://0.0.0.0:3000"]
