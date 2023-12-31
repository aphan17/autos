from django.db import models

# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=20, unique=True)
    import_href = models.CharField(max_length=250, unique=True)

    def __str__(self):
        return self.vin
class SalesPerson(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def get_api_url(self):
        return f"{self.first_name} {self.last_name}"

class Customer(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    address = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=20, unique=True)

    def get_api_url(self):
        return f"{self.first_name} {self.last_name}"
class RecordOfSale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(AutomobileVO, related_name="automobile", on_delete=models.PROTECT)
    sales_person = models.ForeignKey(SalesPerson, related_name="sales_person", on_delete=models.PROTECT)
    customer = models.ForeignKey(Customer, related_name="customer", on_delete=models.CASCADE)
