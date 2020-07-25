from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    thumbnail = models.ImageField(upload_to='images', null=True, blank=True)
    body = models.TextField()
    latitude = models.FloatField(blank=True, default=0)
    longtitude = models.FloatField(blank=True, default=0)
    address = models.CharField(max_length=100, default='대전')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1) 
    # To do
    # change pub_date to createdAt / updatedAt


    def __str__(self):
        return self.title

    def summary(self):
        return self.body[:100]