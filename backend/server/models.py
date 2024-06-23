from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.utils.timezone import localtime


class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()  # Separate field for date
    time = models.TimeField()  # Separate field for time
    capacity = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='events')

    def __str__(self):
        return f"{self.title}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, related_name='bookings', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'event')
        verbose_name = _('Booking')
        verbose_name_plural = _('Bookings')

    def __str__(self):
        return f'{self.user.username} booked {self.event.title}'
