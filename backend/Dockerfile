# Use the official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose port 5000 (same as in docker-compose.yml)
EXPOSE 5001

# Run the server
CMD ["node", "server.js"]
