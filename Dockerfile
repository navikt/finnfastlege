FROM node:14-alpine
WORKDIR /finnfastlege

COPY server.ts package.json ./
COPY server ./server

COPY node_modules ./node_modules
COPY img ./img
COPY dist ./dist

RUN npm install -g ts-node typescript

EXPOSE 8080
CMD ["ts-node", "server.ts"]
