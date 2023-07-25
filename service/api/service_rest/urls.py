from django.urls import path
from .views import api_list_technicians, api_show_technician

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_technicians"),
    path("technicians/<int:id>/", api_show_technician, name="api_technician"),
]
