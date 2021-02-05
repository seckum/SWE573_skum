from django.db import models

# Create your models here.


class Stocks(models.Model):
    username = models.CharField(max_length=70, blank=True, default='')
    tweet = models.CharField(max_length=400, blank=True, default='')
    retweet_count = models.CharField(max_length=200, blank=True, default='')
    place = models.CharField(max_length=200, blank=True, default='')
    location = models.CharField(max_length=200, blank=True, default='')
    created_at = models.CharField(max_length=40, blank=True, default='')

