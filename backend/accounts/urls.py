from django.urls import include, path
from rest_framework_jwt.views import obtain_jwt_token
from . import views


urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='login'),
    path('token/', obtain_jwt_token),
]