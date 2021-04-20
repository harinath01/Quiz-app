from django.urls import path
from .views import *
urlpatterns = [
     path('create-school', CreateSchool.as_view()),
    path('create-student', CreateStudent.as_view()),
    path('school-login', LoginSchool.as_view()),
    path('student-login', LoginStudent.as_view()),
    path('logout',Logout.as_view()),
    path('get-user',GetUser.as_view())
]