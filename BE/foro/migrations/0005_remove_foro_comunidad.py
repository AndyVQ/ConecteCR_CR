# Generated by Django 5.2.1 on 2025-06-26 16:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('foro', '0004_comentarioforo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='foro',
            name='comunidad',
        ),
    ]
