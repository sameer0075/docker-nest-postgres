# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
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

# RUN npm run migration:run

# Expose port for the development server if needed
EXPOSE 3002

CMD [ "npm", "run", "start:dev" ]


