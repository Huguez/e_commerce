# Development
Steps to launch application in development


1. Create data bases
```
   docker compose up -d
```

2. Create ```.env``` and add enviroment variables
```
   DB_USER=************
   DB_NAME=************
   DB_PASSWORD=************
```

4. Excecute command ``` npm install ```

5. Run prisma migrations ``` npx prisma migrate dev ```

6. Excecute seed ``` npm run seed ```

## Launch development mode

7. Excecute command ``` npm run dev ```
