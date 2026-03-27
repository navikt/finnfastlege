FROM gcr.io/distroless/nodejs22-debian12
WORKDIR /finnfastlege

COPY package.json ./
COPY dist-server/server.js ./
COPY dist-server/server.js.map ./
COPY dist-server/server ./server
COPY dist/index.html ./dist/index.html
COPY dist/main.bundle.js ./dist/main.bundle.js
COPY node_modules ./node_modules
COPY img ./img

EXPOSE 8080
USER nonroot
CMD ["./server.js"]
