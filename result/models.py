from django.db import models
from Quizes.models import Quiz
from account.models import Student

# Create your models here.
class Result(models.Model):
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
    student = models.ForeignKey(Student,on_delete=models.CASCADE)
    score = models.IntegerField()
    duration = models.IntegerField()