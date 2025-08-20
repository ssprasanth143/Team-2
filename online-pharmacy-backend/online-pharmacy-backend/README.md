# Online Pharmacy Backend (Spring Boot)

Ready-to-run Spring Boot backend compatible with the provided React frontend.

## Quick Run (H2 - no setup)
```bash
./mvnw spring-boot:run
# or
mvn spring-boot:run
```
- H2 console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:pharmacy`)
- Default admin user: **admin / admin123**

## Switch to MySQL
1. Create DB: `CREATE DATABASE online_pharmacy;`
2. Edit `src/main/resources/application-mysql.properties` with your credentials.
3. Run with profile:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

## API Summary
- `POST /auth/register` — register MEMBER (PENDING)
- `POST /auth/login` — returns `{ token, username, role }` for APPROVED users
- `GET /drugs`, `GET /drugs/{id}`, `GET /drugs/search/{name}` — public
- `POST/PUT/DELETE /drugs/**` — ADMIN
- `POST /orders` — MEMBER/ADMIN
- `GET /orders/my` — MEMBER/ADMIN
- `GET /orders` — ADMIN
- `PUT /orders/{id}/status` — ADMIN

## CORS
Enabled for `http://localhost:5173` (Vite dev server).
