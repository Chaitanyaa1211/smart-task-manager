# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY app/package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY app/ .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
