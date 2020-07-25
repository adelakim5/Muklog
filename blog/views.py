from django.shortcuts import render, get_object_or_404, redirect
# from django.core.exceptions import ObjectDoesNotExist
from django.contrib import messages
from .models import Blog
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User 
# Create your views here.


def write(request):
    return render(request, 'write.html', {"STATIC_URL": settings.STATIC_URL, "naver_client_id": settings.NAVER_CLIENT_ID})


def tempHome(request):
    user = request.user
    if user.is_authenticated:
        blogs = Blog.objects.all().filter(user=user)
        context = {'blogs':blogs}
        try:
            return render(request, 'tempHome.html', context)
        except Blog.DoesNotExist:
            return render(request, 'tempHome.html', {'error':'Blog does not exist'})
    return render(request, 'tempHome.html')


def create(request):
    blog = Blog()
    blog.title = request.POST['title']
    blog.body = request.POST['body']
    thumbnail = request.FILES.get('image')
    blog.latitude = float(request.POST['lat'])
    blog.longtitude = float(request.POST['lng'])
    blog.address = request.POST['address']
    if thumbnail != None:
        blog.thumbnail = thumbnail
    blog.pub_date = timezone.datetime.now()
    print("--------user:", request.user)
    blog.user = request.user
    blog.save()
    return redirect("blog/%d" % blog.id)


def detail(request, blog_id):
    user = request.user
    blog_detail = get_object_or_404(Blog, pk=blog_id, user=user)
    return render(request, 'detail.html', {'detail': blog_detail, "STATIC_URL": settings.STATIC_URL, "naver_client_id": settings.NAVER_CLIENT_ID})


def edit(request, blog_id):
    blog = Blog.objects.get(id=blog_id)
    if request.method == "POST":
        blog.title = request.POST['title']
        thumbnail = request.FILES.get('image')
        if thumbnail != None:
            blog.thumbnail = thumbnail
        blog.body = request.POST['body']
        blog.latitude = float(request.POST['lat'])
        blog.longtitude = float(request.POST['lng'])
        blog.address = request.POST['address']
        blog.user = request.user
        blog.save()
        return redirect('/blog/blog/'+str(blog_id))
    else:
        return render(request, 'edit.html', {"blog": blog, "STATIC_URL": settings.STATIC_URL, "naver_client_id": settings.NAVER_CLIENT_ID})


def delete(request, blog_id):
    blog_detail = Blog.objects.get(id=blog_id)
    blog_detail.delete()
    return redirect('/blog/')
