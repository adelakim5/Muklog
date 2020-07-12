from django.urls import path
from . import views as accounts

urlpatterns = [
    path('signup/', accounts.signup, name="signup"),
    path('login/', accounts.login, name="login"),
    path('logout/', accounts.logout, name="logout"),
    
]