from django.forms.models import model_to_dict
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from account.models import *
from .serializers import *

# Create your views here.
class GetQuizes(APIView):
    def get(self,request,format=None):
        response =[]

        is_student = self.request.session.get('is_student')
        if is_student:
             username = self.request.session.get('username')
             student = Student.objects.filter(username=username)[0]
             quizes = student.school.get_quizes()
        else:
            school_name = self.request.session.get('schoolname')
            school = School.objects.filter(name=school_name)[0]
            quizes = school.get_quizes()
                
        for quiz in quizes:
            dict = model_to_dict(quiz,fields=['name','quiz_id','category','difficulty','pass_percentage'])
            dict['submissions'] = quiz.get_results().count()
            response.append(dict)
        
        return Response(response,status.HTTP_200_OK)    
        

       
class SaveQuiz(APIView):
    serializer_class = SaveQuiz_serializer
    options = ['a','b','c','d']

    def post(self,request,format=None):
        serialized = self.serializer_class(data=request.data)
        schoolName = self.request.session.get('schoolname')
        school =School.objects.filter(name=schoolName)[0]
        quiz = None
        if serialized.is_valid():
            name = serialized.data.get('name')
            category = serialized.data.get('category')
            difficulty = serialized.data.get('difficulty')
            pass_percentage = serialized.data.get('pass_percentage')

            if Quiz.objects.filter(name=name).exists():
                return Response({'msg':'This is quiz already taken'},status=status.HTTP_226_IM_USED)

            quiz = Quiz(school=school,name=name,category=category,difficulty=difficulty,pass_percentage=pass_percentage)
            quiz.save()
            try:
                for question in serialized.data.get('questions'):
                    question_ins = Question(quiz=quiz,text=question.get('question'),correct_option=question.get('correct_option'))
                    question_ins.save()
                    for option,text in enumerate(question.get('options')):
                        ans = Answer(question=question_ins,option=self.options[option],text=text)
                        ans.save()
                return Response({'msg':'Quiz was created'},status=status.HTTP_200_OK)
            except:
                quiz.delete()
        print(serialized.errors)       
        return Response({'msg':'Invalid request'},status=status.HTTP_400_BAD_REQUEST)



class TakeQuiz(APIView):

    serializer_class = quiz_id_serializer

    def post(self,request,format=None):
        serialized = self.serializer_class(data=request.data)

        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            response = model_to_dict(quiz,fields=['name','quiz_id','category','difficulty','pass_percentage'])
            response['questions']=[]
            questions_instance = quiz.get_questions()
            
            for question in questions_instance:
                question_dict = model_to_dict(question,fields=['text','correct_option'])
                answers_instance=question.get_answers()
                options=[]

                for answer in answers_instance:
                    option = model_to_dict(answer,fields=['text']).get('text')
                    options.append(option)
                dict = {
                    'question':question_dict.get('text'),
                    'options':options,
                    'correct_option':question_dict.get('correct_option')
                }
                response['questions'].append(dict)

            return Response(response,status=status.HTTP_200_OK)
        
        return Response({'msg':'Invalid request'},status=status.HTTP_400_BAD_REQUEST)

class DeleteQuiz(APIView):
    serializer_class = quiz_id_serializer

    def post(self,request,format=None):
        serialized=self.serializer_class(data=request.data)

        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            quiz.delete()
            return Response({'msg':'quiz was deleted successfully'},status=status.HTTP_200_OK)
        print(serialized.errors)
        return Response({'msg':"something went wrong"},status=status.HTTP_204_NO_CONTENT)


class GetResult(APIView):

    serializer_class = quiz_id_serializer

    def post(self,request,format=None):
        serialized = self.serializer_class(data=request.data)

        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            results = quiz.get_results()
            response=[]
            for result in results:
                dict = model_to_dict(result,fields=['score','duration'])
                dict['username'] = result.student.username
                response.append(dict)
            
            return Response(response,status=status.HTTP_200_OK)
                
        return Response({'msg':'Invalid request'},status=status.HTTP_204_NO_CONTENT)