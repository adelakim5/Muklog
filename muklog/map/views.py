from django.shortcuts import render
from django.conf import settings

# Create your views here.


def home(request):
    naver_client_id = settings.NAVER_CLIENT_ID
    return render(request, 'home.html', {"STATIC_URL": settings.STATIC_URL})
