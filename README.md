# CarCar

CarCar is an application that manages parts of an automobile dealership. It controls the inventory, automobile sales, and automobile services.

Team:

* Ashley - Service
* Ivan - Sales

## Getting Started

**Make sure you have Docker, Git, and Node.js 18.2 or above**

1. Fork this repository

2. Clone the forked repository onto your computer:
git clone hhttps://gitlab.com/ashphan/project-beta.git

3. Build and run the project with docker using these commands:
```
docker volume create beta-data
docker-compose build
docker-compose up
```

- Make sure all of the docker containers are running
- View the project in the browsers: http://localhost:3000/

-put screenshot of mainpage once completed


## Design

CarCar is composed of 3 microservices that interact with one other.

- **Inventory**
- **Services**
- **Sales**

## Diagram
 - Put diagram here

## Integration

Our Inventory and Sales domains collaborates with our Service domain to make everything here at CarCar possible.

The foundation of this starts at our inventory domain, which keeps track of all the vehicles available for purchase. The sales and service microservice obtain information from the inventory domain, using a **poller**, to communicate with the inventory domain to keep track of the available vehicles and ensure up-to-date inventory information.


## Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/

JSON body to send data:

Create and update a manufacturer (Send this JSON body):
-You cannot make two manufacturers with the same name
```
{
  "name": "Chrysler"
}
```

Creating, getting and updating a single manufacturer return value:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Chrysler"
}
```

Getting a list of manfacturers return value:
```
{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}
```

### Vehicle Models:

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List vehicle models | GET | http://localhost:8100/api/models/
| Create a vehicle model | POST | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

Create a vehicle model (Send this JSON body):
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
  "manufacturer_id": 1
}
```

Update a vehicle model, can take name and/or picture URL:
- It is not possible to update a vehicle model's manufacturer
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```

Creating and updating a vehicle model return value:
- This also returns manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}
```

Getting a list of vehicle models return value:
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}
```

### Automobiles:





## Service microservice

Explain your models and integration with the inventory
microservice, here.

### Technicians

| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:pk>/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:pk>/



## Sales microservice

Explain your models and integration with the inventory
microservice, here.
