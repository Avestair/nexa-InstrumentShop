FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /code
COPY . /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app
CMD ["npm", "run", "dev"]