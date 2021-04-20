from django.db import models
import random
from account.models import School
import random

def unique_code_generator():
    while True:
        code = random.randint(a=100000,b=999999)
        if Quiz.objects.filter(quiz_id=code).count() == 0:
            break
    return code

diff_choices = (
    ('easy','easy'),
    ('medium','medium'),
    ('hard','hard')
)

class Quiz(models.Model):
    quiz_id = models.IntegerField(default=unique_code_generator)
    school = models.ForeignKey(School,on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=40)
    difficulty = models.CharField(max_length=6,choices=diff_choices,default='easy')
    pass_percentage = models.IntegerField(default=35)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def get_questions(self):
        return self.question_set.all()
    
    def get_results(self):
        return self.result_set.all()


class Question(models.Model):
    quiz = models.ForeignKey(Quiz,on_delete=models.CASCADE)
    text = models.CharField(max_length=320)
    correct_option = models.CharField(max_length=1) 

    def __str__(self):
        return self.text

    def get_answers(self):
        return self.answer_set.all().order_by('option')


class Answer(models.Model):
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    option=models.CharField(max_length=2)
    text = models.CharField(max_length=62)
