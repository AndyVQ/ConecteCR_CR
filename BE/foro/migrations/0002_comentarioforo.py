# Generated by Django 5.2.1 on 2025-06-26 16:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('foro', '0001_initial'),
        ('usuarios', '0003_alter_perfil_image_usuario'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComentarioForo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('texto', models.TextField()),
                ('fecha', models.DateField()),
                ('likes', models.IntegerField(blank=True, default=0, null=True)),
                ('foro', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comentarios', to='foro.foro')),
                ('usuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='usuarios.perfil')),
            ],
        ),
    ]
