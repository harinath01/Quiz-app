from rest_framework import serializers
from .models import *

class SaveResult_serializer(serializers.Serializer):
    quiz_id =serializers.IntegerField()
    username = serializers.CharField()
    score = serializers.IntegerField()
    duration = serializers.IntegerField()