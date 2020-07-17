from django.shortcuts import render, get_object_or_404, redirect
from .models import Blog
from django.utils import timezone
from django.conf import settings

# Create your views here.


def write(request):
    return render(request, 'write.html', {"naver_client_id": settings.NAVER_CLIENT_ID})


def tempHome(request):
    blogs = Blog.objects.all()
    return render(request, 'tempHome.html', {'blogs': blogs})


def create(request):
    blog = Blog()
    blog.title = request.POST['title']
    blog.body = request.POST['body']
    blog.thumbnail = request.FILES['image']
    blog.pub_date = timezone.datetime.now()
    blog.save()
    return redirect("blog/%d" % blog.id)


def detail(request, blog_id):
    blog_detail = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'detail.html', {'detail': blog_detail})
