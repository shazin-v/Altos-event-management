# create all endpoints here

from django.http import JsonResponse
from .models import User, Event, Booking
from .serializers import UserSerializer, EventSerializer, BookingSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User 
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404



from rest_framework import generics, permissions
# from .models import Event, Booking
# from .serializers import EventSerializer, BookingSerializer
# from rest_framework.response import Response
# from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings


# @api_view(['GET','POST'])
# def user_list(request):

#     if request.method == 'GET':
#         users = User.objects.all()
#         # many=True to return multiple objects
#         serializer = UserSerializer(users, many=True)
#         return Response({"Users":serializer.data})

#     if request.method == 'POST':
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def signup(request):
    serializers = UserSerializer(data=request.data)
    if serializers.is_valid():
        user = serializers.save()
        user = User.objects.get(first_name=request.data['first_name'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token":token.key, "user":serializers.data}, status=status.HTTP_201_CREATED)
    return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username = request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"details": "not found"}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token":token.key, "user":serializer.data})
    # return Response({})



# @api_view(['GET'])
# def test_token(request):
#     return Response({})



class EventListCreate(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class BookingCreate(generics.CreateAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        event = serializer.validated_data['event']
        if event.is_fully_booked:
            return Response({"error": "Event is fully booked"}, status=status.HTTP_400_BAD_REQUEST)
        booking = serializer.save(user=self.request.user)
        
        # Send confirmation email
        send_mail(
            'Event Registration Confirmation',
            f'Thank you for registering for {event.title}.',
            settings.DEFAULT_FROM_EMAIL,
            [self.request.user.email],
            fail_silently=False,
        )
        # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return booking


class UserEventsList(generics.ListAPIView):
    serializer_class = BookingSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)