from django.urls import path

from .views import (
    api_list_automobile_vo,
)
urlpatterns = [
    path("automobiles/", api_list_automobile_vo, name="api_list_automobile_vo")
]
