from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
# Create your views here.

from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "id",
        "vin",
        "sold",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create technician"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, id):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "does not exist"}
            )
            response.status_code = 404
            return response
    else:
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(
                {"message": "delete successful"}
            )
        except Technician.DoesNotExist:
            response = JsonResponse(
                {"message": "does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            appointment = Appointment.objects.create(**content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )

        except:
            response = JsonResponse(
                {"message": "could not create automobile"}
            )
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, id):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "does not exist"}
            )
            response.status_code = 404
            return response
    else:
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse(
                {"message": "delete successful"}
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    if request.method == "PUT":
        try:
            Appointment.objects.filter(id=id).update(status="canceled")
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "does not exist"}
            )
            response.status_code = 404
            return response


@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    if request.method == "PUT":
        try:
            Appointment.objects.filter(id=id).update(status="finished")
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            response = JsonResponse(
                {"message": "does not exist"}
            )
            response.status_code = 404
            return response



@require_http_methods(["GET"])
def api_automobileVOs(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
            safe=False,
        )
