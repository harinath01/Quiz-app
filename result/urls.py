from django.urls import path
from .views import *

urlpatterns = [
   path('save-result',SaveResult.as_view())
   ]