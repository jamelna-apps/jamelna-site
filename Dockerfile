FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source (overridden by volume in dev)
COPY . .

EXPOSE 3000

# Dev mode with hot reload
CMD ["npm", "run", "dev"]
