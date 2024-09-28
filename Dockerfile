# Etapa de build
FROM node:latest AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build

ENV MONGO_URL=${MONGO_URL}

RUN find . -type f -name '*.json' -exec mkdir -p dist/"$(dirname {})" \; -exec cp {} dist/"{}" \;

# Etapa de produção
FROM node:alpine

WORKDIR /usr/src/app

ENV MONGO_URL=${MONGO_URL}
COPY --from=build /usr/src/app/package.json ./
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --only=production

RUN echo "starting the app"

EXPOSE 3000

CMD ["node", "dist/app.js"]
