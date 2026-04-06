FROM node:22-alpine AS build

LABEL maintainer="retorres"

WORKDIR /app

# Copy project files
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build
