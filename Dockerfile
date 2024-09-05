# Use Node.js 18.17 LTS full image (based on Debian)
FROM node:18.17

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 to make the application accessible
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]