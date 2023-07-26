from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recordofsale',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='automobile', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='recordofsale',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='customer', to='sales_rest.customer'),
        ),
    ]
