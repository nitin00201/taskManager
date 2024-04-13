# Task Manager

This app is based on microservices architecture. The backend is developed in Spring Boot, and the frontend is developed in React.

## Technology Used

### Backend
- Spring Boot
- Json Web Token for user authentication and authorization
 #### steps
 - For making a maven file browse to the spring initializer (https://start.spring.io/) .
 - Then choose maven and give artifact name and package name.
 - After that go to the dependency section and choose the required dependencies.
 - The dependencies are
      - spring web
      - spring data JPA
      - springboot dev tools
      - MYSQL driver
      - lombok
      - Eureka discovery client
   

### Frontend
- React
- Redux
- Material UI
- Tailwind CSS
  
### Achitecture
- Microservices Architecture

  - the eureka server is ported on port 8070 "http://localhost:8070" on your machine and all the services is being registered to the server.
  - These services are namely 
    - USER-SERVICE
    - TASK-SERVICE
    - SUBMISSION-SERVICE
    - GATEWAY-SERVICE.
   
### Microservices Architecture
![Architecture](https://i.ibb.co/Xk8rH0P/MICROS.png)



