# Order

This is a micro service for Helsinki University Distributed Systems course

## Using Order service as a part of a distributed Online Store system

The application setup is done using docker-compose.

First build a docker image of the Order service from the project root:

```
docker build -t order:latest .

```

Next build the images of the other services of the system, and run the system from the docker-compose project. The links and the instructions are in the [docker-compose repository readme](https://github.com/sokkanen/ds_docker-compose).

## API endpoints

**Make an order:**

```
POST /api/orders
```
This endpoint will expect ordered products to be specified in request body as a list:

```
{ products: [{ id: number, name: string, amount: number, price: number }] }
```

**List all orders:**

```
GET /api/orders
```

## Using application locally with a PostreSQL database with Docker
### Configuration

In the project root folder, create an .env file with the following content:

```
DEV_PORT = <MY_DEV_PORT>
TEST_PORT = <MY_TEST_PORT>
POSTGRES_USER = <MY_USER>
POSTGRES_PASSWORD = <MY_PASSWORD>
INVENTORY_URL = <MY_INVENTORY_URL>
```

### Adding a PostgreSQL database with Docker 

Get the image:

```
docker pull postgres
```

Start the database container:
```
docker run \
  -d \
  --name order_postgres \
  -p 5432:5432 \
  -e POSTGRES_PASSWORD=<MY_PASSWORD> \
  -v /home/local/<WHERE_I_WANT_MY_DATA>:/var/lib/postgresql/data \
  postgres
```

Check the container id:
```
docker ps 
```

Enter the container:
```
docker exec -it <MY_CONTAINER_ID> bash
```
Authenticate to start using as postgres user, when prompted, enter the password that was used when starting the container 
```
psql -h localhost -p 5432 -U postgres -W
```
Create new role 'me':

```
CREATE ROLE me WITH LOGIN PASSWORD <MY_PASSWORD>;
ALTER ROLE me CREATEDB;
```
Exit the default session
```
\qt
```
Login with the new user:
```
psql -d postgres -U me
```
Create database and connect with the user:
```
CREATE DATABASE order_db;
 \c order_db
```
Exit
```
\qt
exit
```

Before starting the application, initialize the database tables (run in the project root):
```
./node_modules/.bin/sequelize db:migrate

```
### Starting the application

```
npm run start:dev
```
