from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib import auth
# from django.contrib.auth import authenticate
# Create your views here.


def signup(request):
    if request.method == "POST":
        if request.POST["password1"] == request.POST["password2"]:
            user = User.objects.create_user(
                username=request.POST["username"], password=request.POST["password1"]
            )
            auth.login(request, user)
            next = request.POST['next']
            return redirect(next)
        return render(request, 'signup.html')
    return render(request, 'signup.html')


def login(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        next = request.POST["next"]
        user = auth.authenticate(request, username=username, password=password)
        if user is not None:
            auth.login(request, user)
            return redirect(next)
            # return HttpResponseRedirect('/blog/')
        else:
            return render(request, 'login.html', {'error': 'username or password is incorrect'})
    else:
        next = request.GET['next']
        return render(request, 'login.html', {"next": next})


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/blog')
