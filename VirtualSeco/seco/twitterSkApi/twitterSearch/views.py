from twitterSearch import serializers
from rest_framework.decorators import api_view
from twitterSearch.models import Stocks
from django.http import JsonResponse, HttpResponse
from django.core import serializers
import tweepy
import json
from textblob import TextBlob
import itertools
import collections
import nltk
from nltk.corpus import stopwords
import re
from django.contrib.auth import authenticate, login
# Keys
consumer_key = "y3fsRzMCmLCvePp6r7yLUBLRZ"
consumer_secret ="zz3ETK75dYMNOzQVgjmcNr0up8aw1fVNUMVil2H60lSZlVUU7C"
access_token ="704780328-vT2WphKjSZLWaOrzUvS1JmbueQbMARP2t6aRlaN3"
access_token_secret ="abmWgjMjS8pTb3t0EqYSW8YTHrJhJGSCC5b5S7v7vFhzF"
password ='Seckin1990!!'

def remove_url(txt):
    """Replace URLs found in a text string with nothing
    """
    print(txt['fields']['tweet'])
    return " ".join(re.sub("([^0-9A-Za-z \t])|(\w+:\/\/\S+)", "", txt['fields']['tweet']).split())

class TwitterData:
    def __init__(self,username,created_at,tweet,retweet_count,place,location):
        self.username=username
        self.created_at=created_at
        self.tweet=tweet
        self.retweet_count=retweet_count
        self.place=place
        self.location=location

@api_view(['GET', 'POST'])
def twitterSearch_list(request):
    # GET list of all tweets
    if request.method == 'GET':
        result = serializers.serialize('json',Stocks.objects.all(),).replace("\"", '"')
        resJson = json.loads(result)
        # Do some text preprocessing
        print(resJson)
        tweets_no_urls = [remove_url(data) for data in resJson]
        sentiment_objects = [TextBlob(tweet) for tweet in tweets_no_urls]
        sentiment_values = [[tweet.sentiment.polarity, str(tweet)] for tweet in sentiment_objects]

        return JsonResponse(sentiment_values,safe=False,content_type="application/json")

    else:
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        tsl = Stocks(**body)
        tsl.save()
        return JsonResponse(body)
@api_view(['GET', 'POST'])
def twitterSearch_freq(request):
    # GET list of tweets
    result = serializers.serialize('json',Stocks.objects.all(),).replace("\"", '"')
    resJson = json.loads(result)
    # Do some text preprocessing
    print(resJson)
    tweets_no_urls = [remove_url(data) for data in resJson]
    words_in_tweet = [tweet.lower().split() for tweet in tweets_no_urls]
    nltk.download('stopwords')
    stop_words = set(stopwords.words('english'))
    tweets_nsw = [[word for word in tweet_words if not word in stop_words]
                  for tweet_words in words_in_tweet]
    collection_words = [request.GET.get("sw",None)]
    tweets_nsw_nc = [[w for w in word if not w in collection_words]
                     for word in tweets_nsw]
    all_words_nsw_nc=list(itertools.chain(*tweets_nsw_nc))
    counts_nsw_nc=collections.Counter(all_words_nsw_nc)
    data=counts_nsw_nc.most_common(15)

    return JsonResponse(data,safe=False,content_type="application/json")
@api_view(['GET', 'POST'])
def addTwitterSearch(request):
    #Fetching data from twitter, auth process
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth, wait_on_rate_limit=True)
    #Comes from the front end fetching
    search_words = request.GET.get("sw",None)
    new_search = search_words + " -filter:retweets"
    # tweepy cursor object creation
    tweets = tweepy.Cursor(api.search, q=new_search, lang='en').items(1000)
    for tweet in tweets:
        print(tweet.user.screen_name)
        # insert data to DB
        #data = {"username": tweet.user.screen_name, "created_at": tweet.created_at, 'tweet': tweet.text, "retweet_count": tweet.retweet_count,
        #        'place':"", 'location': tweet.user.location}
        text=tweet.text.encode('utf-8')
        tsl = Stocks(username= tweet.user.screen_name.encode('utf-8'), created_at= tweet.created_at, tweet= text, retweet_count= tweet.retweet_count,
                place="a".encode('utf-8'), location= tweet.user.location.encode('utf-8'))
        tsl.save()
    print(tweets)
    print(request.body)
    return JsonResponse({}, safe=False)

@api_view(['POST'])
#Handles login process
def loginUSER(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    print(body)
    username = body['email']
    password = body['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return JsonResponse({}, safe=False)
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({},status=403)



