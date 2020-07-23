from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from blog.models import Blog


# Create your views here.


def home(request):
    muk_logs = []
    if request.user.is_authenticated:
        muk_logs = Blog.objects.all().filter(user=request.user)
    context = {"muk_logs": muk_logs, "STATIC_URL": settings.STATIC_URL,
               "naver_client_id": settings.NAVER_CLIENT_ID}
    return HttpResponse(render(request, "home.html", context))
