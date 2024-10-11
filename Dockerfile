FROM node:18-alpine as builder
WORKDIR /finnfastlege

COPY server.ts package.json tsconfig.json ./
COPY server ./server
COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist

RUN npm install -g typescript
RUN tsc --build

FROM gcr.io/distroless/nodejs18-debian12
WORKDIR /finnfastlege

COPY --from=builder /finnfastlege/package.json ./
COPY --from=builder /finnfastlege/dist/server.js ./
COPY --from=builder /finnfastlege/dist/server.js.map ./
COPY --from=builder /finnfastlege/dist/server ./server
COPY --from=builder /finnfastlege/dist/index.html ./dist/index.html
COPY --from=builder /finnfastlege/dist/main.bundle.js ./dist/main.bundle.js
COPY --from=builder /finnfastlege/node_modules ./node_modules
COPY --from=builder /finnfastlege/img ./img

EXPOSE 8080
USER nonroot
CMD ["./server.js"]
