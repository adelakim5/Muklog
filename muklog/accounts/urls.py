from django.urls import path, include
from . import views as accounts
# from django.contrib.auth import views as auth_views

urlpatterns = [
    path('signup/', accounts.signup, name="signup"),
    path('login/', accounts.login, name="login"),
    path('logout/', accounts.logout, name="logout"),
    # path('', auth_views.auth_login.as_view(template_name="login.html")),
    path('<user_id>/', accounts.mypage, name="mypage"),
    path('updateInfo/<user_id>', accounts.updateInfo, name="updateInfo"),
    path('deleteInfo/', accounts.deleteInfo, name="deleteInfo"),
]