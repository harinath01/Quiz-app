from django.contrib import admin
from django.urls import path,include
from account.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/',include('account.urls')),
    path('quizes/',include('Quizes.urls')),
    path('result/',include('result.urls')),
    path('',index),
    path('login',index),
    path('signup',index)
]
