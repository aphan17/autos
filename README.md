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


### Accessing Endpoints to Send and View Data: Access Through Insomnia & Your Browser

### Manufacturers:

![Img](/images/Manufacturer.png){width=50%}


### Inventory API (Optional)
 - Put Inventory API documentation here. This is optional if you have time, otherwise prioritize the other services.

### Service API
 - Put Service API documentation here

### Sales API
 - Put Sales API documentation here

## Value Objects
 - Identification of value objects for each service goes here





## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
