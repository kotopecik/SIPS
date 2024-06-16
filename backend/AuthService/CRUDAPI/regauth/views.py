from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework import generics
from .serializer import UserSerializer
from .models import UserModel
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.permissions import IsAuthenticated


class UserCreate(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )


class UserDetail(generics.RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, *args, **kwargs):
        user_id = self.kwargs["id"]
        return get_object_or_404(UserModel, id=user_id)
