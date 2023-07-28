FROM node:18-alpine as builder
WORKDIR /finnfastlege

COPY package.json tsconfig.json vite.config.ts ./
COPY src ./src
COPY node_modules ./node_modules
COPY dist ./dist

RUN npm install -g typescript
RUN npm install -g ts-node
RUN tsc --build

FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /finnfastlege

COPY --from=builder /finnfastlege/package.json ./
COPY --from=builder /finnfastlege/dist/index.html ./dist/index.html
COPY --from=builder /finnfastlege/node_modules ./node_modules
COPY --from=builder /finnfastlege/src ./src

EXPOSE 8080
USER nonroot
CMD ["ts-node", "./src/server/server.ts"]
