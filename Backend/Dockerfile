FROM maven:3.9.8-eclipse-temurin-21 as BUILD
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install -DskipTests

FROM openjdk:21
WORKDIR /app
COPY --from=BUILD /app/target/travel_advisor-0.0.1-SNAPSHOT.jar ./travel_advisor_backend.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "travel_advisor_backend.jar"]
