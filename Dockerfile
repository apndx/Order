# Set base image
FROM node:12

# Set working directory for the app in container
WORKDIR /app

# Copy package.json to container's /app directory and install dependencies
COPY package.json /app
RUN npm install
COPY . /app

# Add envs
ENV NODE_ENV=composed
ENV ORDER_POSTGRES_HOST 172.17.0.3
ENV INVENTORY_URL inventory:9000 
ENV POSTGRES_USER orderuser
ENV POSTGRES_PASSWORD password123

# Expose container's port 3001 to the outside
EXPOSE 3001

# Run scripts
ENTRYPOINT ["./entrypoint.sh"]
