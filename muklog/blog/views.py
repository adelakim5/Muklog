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
    user = request.user
    blog = Blog()
    blog.title = request.POST['title']
    blog.body = request.POST['body']
    thumbnail = request.FILES.get('image')
    if thumbnail != '':
        blog.thumbnail = thumbnail
    # blog.latitude = request.POST['latitude']
    # blog.longtitude = request.POST['longitude']
    # blog.address = request.POST['address']
    blog.pub_date = timezone.datetime.now()
    blog.user = user
    blog.save()
    return redirect("blog/%d" % blog.id)


def detail(request, blog_id):
    user = request.user
    blog_detail = get_object_or_404(Blog, pk=blog_id, user=user)
    return render(request, 'detail.html', {'detail': blog_detail})

def edit(request, blog_id):
    user = request.user
    blog = Blog.objects.get(id=blog_id, user=user)
    if request.method == "POST":
        blog.title = request.POST['title']
        thumbnail = request.FILES.get('thumbnail')
        if thumbnail != "":
            blog.thumbnail = thumbnail
        blog.body = request.POST['body']
        # blog.latitude = request.POST['latitude']
        # blog.longtitude = request.POST['longitude']
        # blog.address = request.POST['address']
        blog.user = user
        blog.save()
        return redirect('/blog/blog/'+str(blog_id))
    else:
        return render(request, 'edit.html', {"blog": blog})

