# Need to run dockerfile from OrgerFlow folder using -f
# Use a smaller base image with Node.js installed (Alpine-based)
FROM node:21-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy only the products files and install dependencies
COPY micro-frontend/products /app/micro-frontend/products
WORKDIR /app/micro-frontend/products
RUN npm install 

# Copy the necessary files for the build
COPY Pipelines/config.js ../

# Build the React application
RUN npm run build --if-present 

# Remove development dependencies and other unnecessary files
RUN npm prune --production && \
    rm -rf node_modules && \
    rm -rf public

# Use a lightweight base image for the final image
FROM nginx:alpine

# Copy the optimized build artifacts from the previous stage
COPY --from=build /app/micro-frontend/products/dist /var/www/html

# Copy the nginx configuration file
COPY micro-frontend/products/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port for the nginx server
EXPOSE 3001

# Start nginx and keep the container running
CMD ["nginx", "-g", "daemon off;"]

