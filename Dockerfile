FROM node:16-alpine as builder
WORKDIR /finnfastlege

COPY server.ts package.json tsconfig.json ./
COPY server ./server
COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist

RUN npm install -g typescript
RUN tsc --build

RUN ls -la
RUN ls -la dist
RUN ls -la dist/server
RUN ls -la node_modules
RUN ls -la img

FROM gcr.io/distroless/nodejs16-debian11
WORKDIR /finnfastlege

COPY --from=builder /finnfastlege/package.json ./
COPY --from=builder /finnfastlege/dist/server.js ./
COPY --from=builder /finnfastlege/dist/server.js.map ./
COPY --from=builder /finnfastlege/dist/server ./server
COPY --from=builder /finnfastlege/dist/index.html ./dist/index.html
COPY --from=builder /finnfastlege/dist/main.bundle.js ./dist/main.bundle.js
COPY --from=builder /finnfastlege/dist/main.bundle.js.map ./dist/main.bundle.js.map
COPY --from=builder /finnfastlege/node_modules ./node_modules
COPY --from=builder /finnfastlege/img ./img

EXPOSE 8080
USER nonroot
CMD ["./server.js"]
