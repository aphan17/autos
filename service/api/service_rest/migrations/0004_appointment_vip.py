# Generated by Django 4.0.3 on 2023-07-26 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_appointment_technician'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='vip',
            field=models.CharField(max_length=5, null=True),
        ),
    ]