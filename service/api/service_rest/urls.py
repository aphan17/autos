from django.urls import path
from .views import api_list_technicians, api_show_technician, api_list_appointments, api_show_appointment, api_cancel_appointment, api_finish_appointment, api_automobileVOs

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_show_technician, name="api_technician"),
    path("appointments/", api_list_appointments, name="api_appointments"),
    path("appointments/<int:id>/", api_show_appointment, name="api_appointment"),
    path("appointments/<int:id>/cancel/", api_cancel_appointment, name="api_cancel_appointment"),
    path("appointments/<int:id>/finish/", api_finish_appointment, name="api_finish_appointment"),
    path("automobiles/", api_automobileVOs, name="api_automobilesVO")
]
