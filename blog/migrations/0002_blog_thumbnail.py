# Generated by Django 3.0.8 on 2020-07-08 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='thumbnail',
            field=models.ImageField(default='default.jpg', upload_to='images'),
        ),
    ]
