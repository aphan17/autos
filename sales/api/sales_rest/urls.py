from django.urls import path

from .views import (
    api_list_automobile_vo,
    api_salesperson,
    api_customer,
    api_customers,
    api_record_of_sale,
    api_salespeople,
    api_record_of_sales,
)
urlpatterns = [
    path("automobiles/", api_list_automobile_vo, name="api_list_automobile_vo"),
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("customers/", api_customers, name="api_customers"),
    path("sales/", api_record_of_sales, name="api_record_of_sales"),
    path("sales/<int:id>/", api_record_of_sale, name="api_record_of_sale"),



]
