from django.conf.urls import url
from twitterSearch import views

urlpatterns = [
    url(r'^api/twitter-search$', views.twitterSearch_list),
    url(r'^api/twitter-search-post$', views.addTwitterSearch),
    url(r'^frequently-used-words$', views.twitterSearch_freq),
    url(r'^login$', views.loginUSER)
]
