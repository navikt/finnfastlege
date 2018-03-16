FROM docker.adeo.no:5000/bekkci/npm-builder:digisyfo-test as npm-build
ADD /src/frontend /source
ADD /src/main /main
RUN build

FROM docker.adeo.no:5000/pus/maven as builder
ADD / /source
COPY --from=npm-build /main/webapp /source/src/main/webapp
WORKDIR /source
RUN mvn package -DskipTests

FROM docker.adeo.no:5000/bekkci/nais-java-app
COPY --from=builder /source/target/fastlegefront /app