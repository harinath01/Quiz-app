from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from Quizes.models import Quiz
from account.models import Student
from .serializers import *
# Create your views here.

class SaveResult(APIView):
    serializers_class = SaveResult_serializer

    def post(self,request,format=None):
        serialized = self.serializers_class(data=request.data)
        if serialized.is_valid():
            quiz_id = serialized.data.get('quiz_id')
            username = serialized.data.get('username')
            score = serialized.data.get('score')
            duration = serialized.data.get('duration')

            quiz = Quiz.objects.filter(quiz_id=quiz_id)[0]
            student = Student.objects.filter(username=username)[0]
            result = Result(quiz=quiz,student=student,score=score,duration=duration)
            result.save()
            return Response({'msg':'Result stored sucessfully'},status=status.HTTP_200_OK)

        return Response({'msg':'Something went wrong'},status=status.HTTP_400_BAD_REQUEST)


