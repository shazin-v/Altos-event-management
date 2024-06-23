#python object to json object

from rest_framework import serializers
from .models import  Event, Booking
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}


def create(self, validated_data):
    user = User.objects.create_user(**validated_data)
    return user

class EventSerializer(serializers.ModelSerializer):
    # is_fully_booked = serializers.ReadOnlyField()

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'time', 'capacity', 'user']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date'] = instance.date.strftime('%Y-%m-%d-%I:%M:%p')
        return representation
    
class BookingSerializer(serializers.ModelSerializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())

    class Meta:
        model = Booking
        fields = ['id', 'user', 'event', 'timestamp']
        read_only_fields = ['user', 'timestamp']
