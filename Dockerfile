FROM node:12.7-alpine AS build
WORKDIR /app
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
COPY ./client .
RUN npm run build


FROM hayd/alpine-deno:1.5.2
WORKDIR /app
COPY --from=build /app/dist .
USER deno
ADD . .
RUN deno cache --unstable main.ts
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--unstable", "main.ts"]

