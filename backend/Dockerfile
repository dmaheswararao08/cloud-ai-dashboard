# Use Node.js as base image
FROM node:18

# Install kubectl
RUN apt-get update && \
    apt-get install -y curl && \
    curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \
    chmod +x kubectl && \
    mv kubectl /usr/local/bin/

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json separately (to optimize Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code (including TypeScript files)
COPY . .

# Build TypeScript project 
RUN npm run build

# Expose the correct port
EXPOSE 5000

# Run the compiled JavaScript server
CMD ["node", "src/server.js"]
