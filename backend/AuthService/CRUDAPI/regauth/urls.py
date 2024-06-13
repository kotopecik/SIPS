from django.urls import path
from .views import (UserCreate)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (UserDetail)


urlpatterns = [
    path("token", TokenObtainPairView.as_view(), name="token_obtain_view"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh_view"),
    path('users', UserCreate.as_view(), name='user-create'),
    path('users/<str:username>', UserDetail.as_view(), name='user-detail'),
]