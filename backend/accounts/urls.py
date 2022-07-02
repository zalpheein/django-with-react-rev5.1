from django.urls import include, path
from . import views


urlpatterns = [
    path('signup/', views.SignupView.as_view(), name='login'),
]