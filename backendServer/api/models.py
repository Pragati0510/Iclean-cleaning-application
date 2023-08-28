from ast import Delete
from email.policy import default
from enum import unique
from statistics import mode
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.

class Location(models.Model):
    City = models.CharField(max_length = 50)
    State = models.CharField(max_length = 50)
    Area = models.CharField(max_length = 50)
    PinCode = models.IntegerField(primary_key=True)

    
class Profile (models.Model):
    id = models.AutoField(primary_key=True)
    auth0_id = models.CharField(max_length = 150, unique = True, default='')
    First_name = models.CharField(max_length = 30)
    Last_name = models.CharField(max_length = 30)
    email = models.EmailField(unique=True)
    Description = models.CharField(max_length = 250)
    Age = models.IntegerField()
    Lives_in = models.ForeignKey(Location, on_delete = models.DO_NOTHING)
    ProfileImgUrl = models.CharField(max_length = 200, default='')
    isAuthority = models.BooleanField(default=False)
    class Meta:
        indexes = [models.Index(fields=['auth0_id', ]), ]
    
class Issue(models.Model):
    Issue_id = models.AutoField(primary_key=True)
    Issue_posted_by = models.ForeignKey(Profile, on_delete = models.DO_NOTHING)
    Upvotes = models.IntegerField(default=0)
    Issue_Loc = models.ForeignKey(Location, on_delete = models.DO_NOTHING)
    Description = models.CharField(max_length = 250)
    Title = models.CharField(max_length = 100)
    ImgUrl = models.CharField(max_length = 200)
    IssueCreatedTime = models.DateField(auto_now_add = True)
    isResolved = models.BooleanField(default=False)
   
    
class Comments(models.Model):
    id = models.AutoField(primary_key=True)
    Posted_By = models.ForeignKey(Profile, on_delete = models.DO_NOTHING)
    IssueId =  models.ForeignKey(Issue, on_delete = models.CASCADE)
    CreatedTime = models.DateField(auto_now_add = True)
    CommentText = models.CharField(max_length=300, default = '')
    
class Authority(models.Model):
    profile_id = models.ForeignKey(Profile,  on_delete = models.DO_NOTHING)
    designation = models.CharField(max_length = 100)
    department = models.CharField(max_length = 200)
    Manages_Loc = models.ForeignKey(Location, on_delete = models.DO_NOTHING)
  