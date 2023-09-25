# Production Stage
FROM node:16 AS production

WORKDIR /app

# Copy package.json and package-lock.json to /app/
COPY package*.json .

# Install npm packages for production (skip devDependencies)
RUN npm install

# Copy the rest of the application code to /app/
COPY . .

# Expose port for the production server if needed
EXPOSE 3002

CMD [ "npm", "run", "start:prod" ]

# Development Stage
FROM node:16 AS development

WORKDIR /app

# Copy package.json and package-lock.json to /app/
COPY package*.json .

# Install npm packages for development
RUN npm install

# Install ts-node globally
RUN npm install -g ts-node

COPY tsconfig.json .

# Copy the rest of the application code to /app/
COPY . .

# Expose port for the development server if needed
EXPOSE 3002

CMD [ "npm", "run", "start:dev" ]

