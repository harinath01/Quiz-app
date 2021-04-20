from django.db import models

# Create your models here.
class School(models.Model):
    name = models.CharField(max_length=30,unique=True)
    district = models.CharField(max_length=30)
    password = models.CharField(max_length=8)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def get_quizes(self):
        return self.quiz_set.all()

class Student(models.Model):
    username = models.CharField(max_length=16,unique=True)
    school = models.ForeignKey(School,on_delete=models.CASCADE)
    password= models.CharField(max_length=8)
    created_at = models.DateField(auto_now_add=True)
    

    def __str__(self):
        return self.username
    