# Generated by Django 3.1.7 on 2021-04-14 09:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Quizes', '0011_auto_20210414_1515'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='is_multi_answer_question',
        ),
    ]
