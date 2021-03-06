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
        return render(request, 'signup.html', {'error':'비밀번호를 다시 확인해주세요.'})
    else:
        next = request.GET['next']
        return render(request, 'signup.html', {'next':next})


def login(request):
    next = request.GET.get('next')
    if next == None or next == '':
        next = 'home'
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
            return render(request, 'login.html', {'error': '아이디 또는 비밀번호가 맞지 않습니다.'})
    else:
        return render(request, 'login.html', {"next": next})


def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/map')

def mypage(request, user_id):
    return render(request, 'mypage.html')

def updateInfo(request, user_id):
    if request.method == "POST":
        if request.POST['newPassword'] == request.POST['newPassword2']:
            user = User.objects.get(username=request.user)
            password = request.POST['newPassword']
            user.set_password(password)
            user.save()
            auth.login(request,user)
            return redirect(reverse("mypage",args=[user_id]))
        else:
            messages.error(request, 'password is incorrect')
            return redirect('/accounts/' + str(user_id))
            # return render(request, 'mypage.html', {'error': 'password is incorrect'})
    else:
        return render(request, 'mypage.html')

def deleteInfo(request):
    try:
        deleted_user = User.objects.all().filter(username=request.user)
        deleted_user.delete()
        auth.logout(request, request.user)
        return redirect('/')
    except Exception:
        return render(request, 'mypage.html', {'error': '탈퇴 실패'})
    return render(request, 'tempHome.html')

    