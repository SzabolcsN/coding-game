# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --silent
RUN npm install

COPY . . 

RUN npm run build

# Run stage
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app .
EXPOSE 3000

CMD ["npm", "run", "dev"]
