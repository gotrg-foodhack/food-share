FROM node:8-alpine as builder

WORKDIR /app

ADD ./package.json ./
ADD ./yarn.lock ./
ADD ./rollup.config.js ./
ADD ./webpack.config.js ./
ADD ./src ./src

RUN yarn install && yarn build

FROM node:8-alpine

WORKDIR /app

ADD ./package.json ./
ADD ./yarn.lock ./

RUN yarn install --production

COPY --from=builder /app/build ./build

EXPOSE 3000

CMD node .
