# Stage 1: Build
FROM node:16.18.0@sha256:6d592fdb89fccdeb880d14f30bf139b8a755f33b376f025b70e50ac5547c8ccf AS builder

LABEL maintainer="anhuynh <https://github.com/anhuynh9/>"
LABEL description="Fragments node.js microservice"

ENV NODE_VERSION=latest
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_COLOR=false
ENV PORT=8080

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./tests/.htpasswd ./tests/.htpasswd

# Stage 2: Run
FROM node:16.18.0@sha256:6d592fdb89fccdeb880d14f30bf139b8a755f33b376f025b70e50ac5547c8ccf AS runner

ENV NODE_VERSION=latest
ENV PORT=8080

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8080
CMD ["npm", "start"]
