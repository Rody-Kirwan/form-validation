FROM mhart/alpine-node:10 AS deps

WORKDIR /build
COPY ./package-lock.json /build/package-lock.json
COPY ./package.json /build/package.json

RUN npm ci

FROM mhart/alpine-node:10 as spa 

WORKDIR /build
COPY --from=deps /build/node_modules /build/node_modules
COPY ./package.json /build/package.json
COPY ./webpack.config.js /build/webpack.config.js
COPY ./index.html /build/index.html
COPY ./.babelrc /build/.babelrc
COPY ./.browserslistrc /build/.browserslistrc
COPY ./src /build/src

RUN npm rebuild node-sass && npm run build 

FROM mhart/alpine-node

WORKDIR /app
COPY --from=spa /build/dist /app/dist

RUN npm i -g serve

CMD ["serve", "-p", "80", "-s", "./dist"]



