from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.models import User
from django.contrib import auth, messages
# from django.contrib.auth import authenticate
# Create your views here.


def signup(request):
    if request.method == "POST":
        next = request.POST['next']
        if request.POST["password1"] == request.POST["password2"]:
            user = User.objects.create_user(
                username=request.POST["username"], password=request.POST["password1"]
            )
            auth.login(request, user)
            return redirect(next)
        return render(request, 'signup.html', {'error':'confirm your password again'})
    else:
        next = request.GET['next']
        return render(request, 'signup.html', {'next':next})


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

def mypage(request, user_id):
    return render(request, 'mypage.html')

def updateInfo(request, user_id):
    if request.method == "POST":
        if request.POST['newPassword'] == request.POST['newPassword2']:
            user = User.objects.get(username=request.user)
            user.password = request.POST['newPassword']
            user.save()
            return redirect('/accounts/' + str(user_id))
        else:
            messages.error(request, 'password is incorrect')
            return redirect('/accounts/' + str(user_id))
            # return render(request, 'mypage.html', {'error': 'password is incorrect'})
    else:
        return render(request, 'mypage.html')

def deleteInfo(request):
    userInfo = User.objects.get(username=request.user)
    userInfo.delete()
    return redirect('/blog/')
