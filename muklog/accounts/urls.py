from django.urls import path, include
from . import views as accounts
# from django.contrib.auth import views as auth_views

urlpatterns = [
    path('signup/', accounts.signup, name="signup"),
    path('login/', accounts.login, name="login"),
    path('logout/', accounts.logout, name="logout"),
    # path('', auth_views.auth_login.as_view(template_name="login.html")),
]