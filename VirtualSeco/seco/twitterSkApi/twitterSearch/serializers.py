from rest_framework import serializers
from twitterSearch.models import Stocks


class TwitterSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stocks
        fields = ('username', 'created_at', 'tweet', 'retweet_count','place', 'location')
