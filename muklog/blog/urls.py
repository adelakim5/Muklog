from django.urls import path
from . import views as blog
urlpatterns = [
    path('', blog.main, name="main")
]
