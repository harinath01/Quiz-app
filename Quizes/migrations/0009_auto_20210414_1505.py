# Generated by Django 3.1.7 on 2021-04-14 09:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Quizes', '0008_auto_20210414_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='option',
            field=models.CharField(max_length=2),
        ),
        migrations.AlterField(
            model_name='question',
            name='correct_option',
            field=models.CharField(max_length=1),
        ),
    ]
