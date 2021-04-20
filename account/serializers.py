from rest_framework import serializers
from .models import *

class CreateSchool_serializer(serializers.ModelSerializer):
    name = serializers.CharField(validators=[])
    class Meta:
        model = School
        fields = ('name','district','password')


class CreateStudent_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=16)
    schoolname= serializers.CharField(max_length=30)
    password= serializers.CharField(max_length=8)


class LoginStudent_serializer(serializers.Serializer):
    username = serializers.CharField(max_length=16)
    password= serializers.CharField(max_length=8)


class LoginSchool_serializer(serializers.ModelSerializer):
    name=serializers.CharField(validators=[])
    class Meta:
        model = School
        fields = ('name','password')