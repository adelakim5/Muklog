from django.db import models

# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    thumbnail = models.ImageField(upload_to='images', default='default.jpg')
    body = models.TextField()

    def __str__(self):
        return self.title

    def summary(self):
        return self.body[:100]