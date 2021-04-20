from django.urls import path
from .views import *

urlpatterns = [
   path('save-quiz',SaveQuiz.as_view()),
   path('get-quizes',GetQuizes.as_view()),
   path('take-quiz',TakeQuiz.as_view()),
   path('delete-quiz',DeleteQuiz.as_view()),
   path('get-result',GetResult.as_view())
]