from django.urls import path
from . import views as blog


urlpatterns = [
    path('write', blog.write, name="write"),
    path('blog/<int:blog_id>', blog.detail, name="detail"),
    path('create', blog.create, name="create"),
    path('', blog.tempHome, name="tempHome"),
    path('<int:blog_id>', blog.edit, name="edit"),
]
