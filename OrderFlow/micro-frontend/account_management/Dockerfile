# Need to run dockerfile from OrgerFlow folder using -f
# Use a smaller base image with Node.js installed (Alpine-based)
FROM node:21-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy only the account_management files and install dependencies
COPY micro-frontend/account_management /app/micro-frontend/account_management
WORKDIR /app/micro-frontend/account_management
RUN npm install 

# Copy the necessary files for the build
COPY Pipelines/config.js ../

# Build the React application
RUN npm run build --if-present
RUN ls -la
COPY micro-frontend/account_management/public/assets /app/micro-frontend/account_management/dist/assets 
COPY micro-frontend/account_management/public/image /app/micro-frontend/account_management/dist/image
RUN ls -la /app/micro-frontend/account_management/dist/

# Remove development dependencies and other unnecessary files
RUN npm prune --production && \
    rm -rf node_modules && \
    rm -rf public

# Use a lightweight base image for the final image
FROM nginx:alpine

# Copy the optimized build artifacts from the previous stage
COPY --from=build /app/micro-frontend/account_management/dist /var/www/html

# Copy the nginx configuration file
COPY micro-frontend/account_management/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port for the nginx server
EXPOSE 3000

# Start nginx and keep the container running
CMD ["nginx", "-g", "daemon off;"]

