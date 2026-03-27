# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# Declare build args
ARG VITE_API_BASE_URL
ARG VITE_API_TIMEOUT
ARG VITE_APP_NAME
ARG VITE_APP_VERSION
ARG VITE_ENV
ARG VITE_CSRF_TOKEN_KEY
ARG VITE_ENABLE_DEBUG

# Expose them as env vars so Vite can read them during build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TIMEOUT=$VITE_API_TIMEOUT
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_VERSION=$VITE_APP_VERSION
ENV VITE_ENV=$VITE_ENV
ENV VITE_CSRF_TOKEN_KEY=$VITE_CSRF_TOKEN_KEY
ENV VITE_ENABLE_DEBUG=$VITE_ENABLE_DEBUG

RUN pnpm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf