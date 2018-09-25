FROM docker.adeo.no:5000/pus/node as node-builder
ADD /src/frontend /source
ADD /src/main /main
WORKDIR /source
RUN npm ci && npm run test && npm run build

FROM docker.adeo.no:5000/bekkci/maven-builder as maven-builder
ADD / /source
WORKDIR /source
COPY --from=node-builder /main/webapp /source/src/main/webapp
RUN mvn package

FROM docker.adeo.no:5000/bekkci/nais-java-app
COPY --from=maven-builder /source/target/fastlegefront /app