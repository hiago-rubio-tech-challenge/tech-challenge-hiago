# Etapa de build
FROM node:latest AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}

# Etapa de produção
FROM node:alpine

WORKDIR /usr/src/app

ARG MONGO_URL
ENV MONGO_URL=${MONGO_URL}
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --omit=dev

RUN echo "starting the app"

EXPOSE 3000

CMD ["node", "dist/app.js"]
