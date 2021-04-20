from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import *
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))

class CreateSchool(APIView):
    serializer_class = CreateSchool_serializer

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            name = serializer.data.get('name')
            district = serializer.data.get('district')
            password = serializer.data.get('password')

            queryset = School.objects.filter(name=name)
            if queryset.exists():
                return Response({'msg':'School name already exists'},status=status.HTTP_226_IM_USED)
            school = School(name=name,district=district,password=password)
            school.save()
            self.request.session['is_student']=False
            self.request.session['schoolname']=school.name
            return Response({'msg':'created successfully'},status=status.HTTP_201_CREATED)

        else:
            return Response({'msg':'Invalid request'},status=status.HTTP_400_BAD_REQUEST) 
    


class CreateStudent(APIView):
    serializer_class = CreateStudent_serializer

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
            
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            schoolName = serializer.data.get('schoolname')
            password = serializer.data.get('password')
            
            queryset = Student.objects.filter(username=username)
            if queryset.exists():
                return Response({'msg':'Username already taken'},status=status.HTTP_226_IM_USED)

            school =School.objects.filter(name=schoolName)   
            if school.exists():
                school = school[0]
                student = Student(username=username,school=school,password=password)
                student.save()
                self.request.session['is_student']=True
                self.request.session['username']=username
                self.request.session['student_schoolName']=queryset[0].school.name
                return Response({'msg':'created successfully'},status=status.HTTP_201_CREATED)

            else:
                return Response({'msg':'Invalid school Name'},status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'msg':'Invalid request'},status=status.HTTP_400_BAD_REQUEST) 



class LoginSchool(APIView):
    serializer_class = LoginSchool_serializer

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            schoolname = serializer.data.get('name')
            password = serializer.data.get('password')
            queryset = School.objects.filter(name=schoolname)
            if queryset.exists():

                password_check = queryset[0].password == password
                if password_check:
                    self.request.session['is_student']=False
                    self.request.session['schoolname']=schoolname
                    if not self.request.session.get('username')==None:
                        self.request.session.pop('username')
                        
                    return Response({'msg':"logged in successfully"},status=status.HTTP_200_OK)
                else:
                    return Response({"msg":"Enter the correct password"},status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'msg':"School doesn't exists"},status=status.HTTP_404_NOT_FOUND) 
        else:
            return Response({'msg':'Invalid request'},status=status.HTTP_400_BAD_REQUEST) 

class LoginStudent(APIView):
    serializer_class = LoginStudent_serializer

    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            queryset= Student.objects.filter(username=username)
            if queryset.exists():

                password_check = queryset[0].password == password
                if password_check:
                    self.request.session['is_student']=True
                    self.request.session['username']=username
                    self.request.session['student_schoolName']=queryset[0].school.name
                    if not self.request.session.get('schoolname')==None:
                        self.request.session.pop('schoolname')

                    return Response({'msg':"logged in successfully"},status=status.HTTP_200_OK)
                else:
                    return Response({"msg":"Enter the correct password"},status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response({'msg':"Username doesn't exists"},status=status.HTTP_404_NOT_FOUND) 
        else:
            return Response({'msg':serializer.errors},status=status.HTTP_400_BAD_REQUEST) 

class GetUser(APIView):
       def get(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        is_student = self.request.session.get('is_student')
        if is_student:
            username = self.request.session.get('username')
            student_schoolName = self.request.session.get('student_schoolName')
            data ={
                'is_student':is_student,
                'username':username,
                'student_schoolName':student_schoolName
                }
        else:
            schoolName = self.request.session.get('schoolname')
            data ={
                'is_student':is_student,
                'schoolname':schoolName,
                }
    
        return Response(data,status=status.HTTP_200_OK)


class Logout(APIView):
    def get(self,request,format=None):
        if self.request.session.get('is_student'):
            self.request.session.pop('username')
        else:
            self.request.session.pop('schoolname')
        
        self.request.session.pop('is_student')

        return Response({'msg':'loged out successfully'})