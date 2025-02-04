# Step 1: Use the official Node.js image
FROM node:16-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the Vite app to the container
COPY . .

# Step 6: Expose the port that Vite will run on
EXPOSE 5173

# Step 7: Run the Vite app in development mode
CMD ["npm", "run", "dev"]
