from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='import_href',
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False),
        ),
    ]
