from django.urls import path
from .views import UserCreate, TodosRetrievUpdateDestroyView, TodosListCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", TodosListCreateView.as_view(), name="list_create_view"),
    path("todo/<int:pk>", TodosRetrievUpdateDestroyView.as_view(), name="update_delete_view"),
    path("registration/", UserCreate.as_view(), name="registration"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_view"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="token_refresh_view"),
]