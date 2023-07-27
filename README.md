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
  "picture_url": "image.yourpictureurl.com"
  "manufacturer_id": 1
}
```

Update a vehicle model, can take name and/or picture URL:
- It is not possible to update a vehicle model's manufacturer
```
{
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com"
}
```

Creating and updating a vehicle model return value:
- This also returns manufacturer's information as well
```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "image.yourpictureurl.com",
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
      "picture_url": "image.yourpictureurl.com",
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

The service microservice has 3 models: Technician, Appointment and AutomobileVO. Appointment is the model that interacts with the other two models.

The AutomobileVO is a value object that gets data about the automobiles in the inventory. The service poller automatically polls the inventory microservice for data, so the service microservice is getting updated data every 60 seconds. The integration between the inventory and service microservice is to determine if a customer has VIP status. The VIP status is determined if the appointment vin number matches one of an exisitng automobile.

### Technicians

| Action | Method | URL
| ----------- | ----------- | ----------- |
| Create a technician | POST | http://localhost:8080/api/technicians/
| List technicians | GET | http://localhost:8080/api/technicians/
| Technician detail | GET | http://localhost:8080/api/technicians/<int:id>/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/<int:id>/

CREATE TECHNICIAN - The technician model is composed of "first_name", "last_name" and "employee_id" fields. To create a technician, you would send the following JSON body and submit as a POST request. Example:
```
{
	"first_name": "Jack",
	"last_name": "Smith",
	"employee_id": "123"
}
```

- Note that no two technicians can have the same "employee_id", doing so will raise an error!

LIST TECHNICIANS: Following this endpoint will get a list of all technicians that are currently employed. As this is a GET request, no data needs to be provided. Example of the Return Value:
```
{
	"technicians": [
		{
			"id": 1,
			"first_name": "Jack",
			"last_name": "Smith",
			"employee_id": 123
		}
	]
}
```

TECHNICIAL DETAIL: Following this endpoint will display a specific technican. Again, this is a GET request and therefore, no data needs to be provided. From the list of technicians, you can see that the technicians are automatically assigned a value of "id". This value replaces the "<int:id>". For example, to view the technican "Jack", you would input the following address: http://localhost:8080/api/technicians/1/
The return value would be as followed:
```
{
	"id": 1,
	"first_name": "Jack",
	"last_name": "Smith",
	"employee_id": 123
}
```

DELETE TECHNICIAN: To delete a technican from the system, you would need to follow the same address as technical detail but change the request type to "DELETE". No data needs to be provided. You will need to pull the "id" value like in "TECHNICAL DETAIL" to ensure you have deleted the correct technician. Once you sumbit the DELETE request, the following message will be returned:
```
{
	"message": "delete successful"
}
```

After all of this, you should be able to view all technicians, view the details of each technician, create and delete technicians. Remember that "id" is AUTOMATICALLY generated by the program, you do not have to input that information as long as you follow the steps in CREATE TECHNICIAN.
If an error comes up, make sure the server is running and that the information you are providing is the same data that JSON is expecting.


### Service Appointments

| Action | Method | URL
| ----------- | ----------- | ----------- |
| Create service appointment | POST | http://localhost:8080/api/serviceappointment/
| List service appointments | GET | http://localhost:8080/api/serviceappointment/
| Service appointment detail | GET | http://localhost:8080/api/serviceappointment/<int:id>
| Delete service appointment | DELETE | http://localhost:8080/api/serviceappointment/<int:id>
| Set appointment status to "canceled" | PUT | http://localhost:8080/api/appointments/<int:id>/cancel/
| Set appointment status to "finished" | PUT | http://localhost:8080/api/serviceappointment/<int:id>/finish/

CREATE SERVICE APPOINTMENT - To create a service appointment, follow the format below. The "date_time" field has to follow ISO 8601 format. An example would be:
```
{
	"date_time": "2023-09-20T16:00:00.000Z",
	"reason": "tire rotation",
	"vin": "123ASDF",
	"customer": "John Doe",
	"technician": 1
}
```
The return value of this would be as followed. The "id" value is automatically generated and "status" field reflects the appointment status which defaulted as "created" by the program.

```
{
	"id": 1,
	"date_time": "2023-09-20T16:00:00.000Z",
	"reason": "tire rotation",
	"status": "created",
	"vin": "123ASDF",
	"customer": "John Doe",
	"technician": {
		"id": 1,
		"first_name": "Jack",
		"last_name": "Smith",
		"employee_id": 123
	}
}
```

LIST SERVICE APPOINTMENTS: Following this endpoint will give you a list of all the service appointments. Since this is a GET request, no data needs to be provided.
```
{
	"appointments": [
		{
			"id": 1,
			"date_time": "2023-09-20T16:00:00.000Z",
			"reason": "tire rotation",
			"status": "created",
			"vin": "123ASDF",
			"customer": "John Doe",
			"technician": {
				"id": 1,
				"first_name": "Jack",
				"last_name": "Smith",
				"employee_id": 123
			}
		},
    ]
}
```
SERVICE APPOINTMENT DETAIL: As this is a GET request, no data needs to be provided. Like in TECHNICIAN DETAIL, the "id" value will replace "<int:id>". This will provide the service appointment details.
```
{
    "id": 1,
    "date_time": "2023-09-20T16:00:00.000Z",
    "reason": "tire rotation",
    "status": "created",
    "vin": "123ASDF",
    "customer": "John Doe",
    "technician": {
        "id": 1,
        "first_name": "Jack",
        "last_name": "Smith",
        "employee_id": 123
    }
}
```

DELETE SERVICE APPOINTMENT: To delete an appointment from the system, you would need to follow the same address as SERVICE APPOINTMENT DETAIL but change the request type to "DELETE". You will need to pull the "id" value like in "SERVICE APPOINTMENT" to ensure you have deleted the correct appointment. Once you sumbit the DELETE request, the following message will be returned:
```
{
	"message": "delete successful"
}
```


CANCEL SERVICE APPOINTMENT: Following this endpoint would set appointment status from "created" to "canceled". A JSON body would not be required as we are pulling in the "id" value to replace "<int:id>". This will determine which appointment we are canceling. The status would be updated in the return value. An example of the return value would be:
```
{
    "id": 1,
    "date_time": "2023-09-20T16:00:00.000Z",
    "reason": "tire rotation",
    "status": "canceled",
    "vin": "123ASDF",
    "customer": "John Doe",
    "technician": {
        "id": 1,
        "first_name": "Jack",
        "last_name": "Smith",
        "employee_id": 123
    }
}
```

FINISH SERVICE APPOINTMENT: Following this endpoint would set appointment status from "created" to "finished". A JSON body would not be required as we are pulling in the "id" value to replace "<int:id>".This will determine which appointment we are canceling. The status would be updated in the return value. An example of the return value would be:
```
{
    "id": 1,
    "date_time": "2023-09-20T16:00:00.000Z",
    "reason": "tire rotation",
    "status": "finished",
    "vin": "123ASDF",
    "customer": "John Doe",
    "technician": {
        "id": 1,
        "first_name": "Jack",
        "last_name": "Smith",
        "employee_id": 123
    }
}
```

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
