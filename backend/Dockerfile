FROM node:22-alpine

# Install netcat for connection testing
RUN apk add --no-cache netcat-openbsd

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD nc -z localhost 3000 || exit 1

# Start the application in development mode with hot reload
CMD ["npm", "run", "start:dev"]