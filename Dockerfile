FROM rust:1.61.0 AS wasm-build

WORKDIR /usr/src

RUN cargo install rsw wasm-pack
COPY . .

RUN rsw build

FROM node:18.3.0-alpine AS web-build

RUN npm i -g pnpm
WORKDIR /usr/src
COPY . .
RUN pnpm install
COPY --from=wasm-build /usr/src/core/pkg ./core/pkg

RUN pnpm run build

