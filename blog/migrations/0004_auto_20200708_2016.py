# Generated by Django 3.0.8 on 2020-07-08 11:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20200708_2008'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blog',
            name='thumbnail',
            field=models.ImageField(default='default.jpg', upload_to='images'),
        ),
    ]