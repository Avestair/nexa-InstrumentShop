FROM node:22-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory in the container
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package.json pnpm-lock.yaml* ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application files
COPY . .

# Make port 3000 available
EXPOSE 3000

# Define the command to run your app
CMD ["pnpm", "run", "dev"]