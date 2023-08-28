
from inspect import getcomments
from django.urls import path
from . import views

urlpatterns = [
    path('',views.getRoutes, name='Routes'),
    path('issues', views.getIssues),
    path('getissues/active', views.getActiveIssues),
    path('getissues/resolved', views.getResolvedIssues),
    path('getissues/sorted', views.getSortedIssues),
    path('issues/<str:pk>/', views.getIssue),
    path('issues/<str:pk>/delete', views.deleteIssue),
    path('issues/<str:pk>/update', views.updateIssue),
    path('issues/<str:pk>/comments', views.getComments),
    path('issues/new', views.addIssue),
    path('issues/<str:pk>/addComment', views.postComment),
    path('comments/<str:pk>/update', views.updateComment),
    path('comments/<str:pk>/delete', views.deleteComment),
    path('profile/new', views.newProfile),
    path('profiles', views.getProfiles),
    path('profile/check', views.checkProfile),
    path('issues/<str:pk>/upvote', views.plusUpvote),
    path('profile/<str:pk>/issues', views.getIssueByProfile),
     path('profile/<str:pk>/update', views.updateProfile),
    path('issues/<str:pk>/resolve', views.resolveIssue)
    
    
    
]