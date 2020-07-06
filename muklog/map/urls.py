from django.urls import path
from . import views as map

urlpatterns = [
    path('', map.home, name="home")
]
