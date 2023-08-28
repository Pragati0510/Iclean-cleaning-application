from http.client import HTTPResponse
from json import JSONDecodeError

from urllib import response
from django.shortcuts import render
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .serializers import CommentUpdateSerializer, IssuesSerializer, CommentSerializer, IssuesUpdateSerializer, IssuePostSerializer, CommentPostSerializer, NewProfileSerialiser, IssueUpvoteSerializer
from .models import Profile, Issue, Comments
from django.http import HttpResponseNotFound
from .serializers import GetIssuesSerializer, IssueResolveSerializer
import sendgrid
import os
from sendgrid.helpers.mail import Mail, Email, To, Content

sg = sendgrid.SendGridAPIClient('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')
from_email = Email("iclean@nhajela.me")  # Change to your verified sender
to_email = To("nhajela13@gmail.com")  # Change to your recipient
subject = "Issue Raised"



def sendmail(title,description):
    print('hello')
    content = Content("text/plain", "Issue Title:" +title+"\n" +"Issue Description:" +description+"\n")
    mail = Mail(from_email, to_email, subject, content)
    # Get a JSON-ready representation of the Mail object
    mail_json = mail.get()

    response = sg.client.mail.send.post(request_body=mail_json)
    print(response.status_code)
    print(response.headers)


@api_view(['GET'])
@csrf_exempt
def getRoutes(request):
    routes = [ {

        }]
    return Response(routes)


## Profile

@api_view(['POST'])
@csrf_exempt
def newProfile(request):
    data = JSONParser().parse(request)
    serializer = NewProfileSerialiser(data=data)
    if(serializer.is_valid()):
        profile = serializer.save()
    return Response('done')


@api_view(['PUT'])
@csrf_exempt
def updateProfile(request,pk):
    data = request.data
    profile = Profile.objects.get(id=pk)
    serializer = IssuesUpdateSerializer(instance=profile, data=data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(pk)

@api_view(['GET'])
def getProfiles(request):
    profiles = Profile.objects.all()
    # sendmail('Issue1','Desc')
    serializer = NewProfileSerialiser(profiles, many= True)
    return Response(serializer.data)



@api_view(['POST'])
def checkProfile(request):
    data = JSONParser().parse(request)
    auth0_id = data['auth0_id']
    try:
        profiles = Profile.objects.get(auth0_id=auth0_id)
        serializer = NewProfileSerialiser(profiles, many= False)
        return Response(serializer.data)
    except:
        return HttpResponseNotFound("not found")         
    # return Response('ello')
    
## Issues

@api_view(['GET'])
def getIssues(request):
    issues = Issue.objects.all()
    serializer = GetIssuesSerializer(issues, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def getActiveIssues(request):
    issues = Issue.objects.filter(isResolved = False)
    serializer = GetIssuesSerializer(issues, many= True)
    return Response(serializer.data)

@api_view(['GET'])
def getResolvedIssues(request):
    issues = Issue.objects.filter(isResolved = True)
    serializer = GetIssuesSerializer(issues, many= True)
    return Response(serializer.data)
@api_view(['GET'])
def getSortedIssues(request):
    issues = Issue.objects.order_by('-Upvotes').filter(isResolved = False)
    serializer = GetIssuesSerializer(issues, many= True)
    return Response(serializer.data)
@api_view(['GET'])
def getIssueByProfile(request,pk):
    issues = Issue.objects.filter(Issue_posted_by=pk)
    serializer = GetIssuesSerializer(issues, many= True)
    return Response(serializer.data)




@api_view(['GET'])
def getIssue(request,pk):
    issues = Issue.objects.get(Issue_id=pk)
    serializer = GetIssuesSerializer(issues, many= False)
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteIssue(request,pk):
    issue = Issue.objects.get(Issue_id=pk)
    issue.delete()
    return Response('done')
    

@api_view(['GET'])
def plusUpvote(request,pk):
    issue = Issue.objects.get(Issue_id=pk)
    issue.Upvotes +=1
    serializer = IssueUpvoteSerializer(instance=issue, data = {'Upvotes':issue.Upvotes})
    if serializer.is_valid():
        serializer.save()
    if issue.Upvotes == 30:
        sendmail(issue.Title,issue.Description)
    return Response(issue.Upvotes)

@api_view(['GET'])
def resolveIssue(request,pk):
    issue = Issue.objects.get(Issue_id=pk)
    serializer = IssueResolveSerializer(instance=issue, data = {'isResolved':True})
    if serializer.is_valid():
        serializer.save()
    return Response(issue.isResolved)



@api_view(['PUT'])
@csrf_exempt
def updateIssue(request,pk):
    data = request.data
    issue = Issue.objects.get(Issue_id=pk)
    serializer = IssuesUpdateSerializer(instance=issue, data=data)
    if serializer.is_valid():
        serializer.save()
    
    return Response(pk)

@api_view(['POST'])
@csrf_exempt
def addIssue(request):
    data = JSONParser().parse(request)
    
    serializer = IssuePostSerializer(data=data)

    if serializer.is_valid():
       newIssue= serializer.save()
    # return Response('hi')
    return Response(newIssue.Issue_id)



## comments

@api_view(['GET'])
def getComments(request,pk):
    comments = Comments.objects.filter(IssueId=pk)
    serializer = CommentSerializer(comments, many= True)
    return Response(serializer.data)



@api_view(['DELETE'])
def deleteComment(request,pk):
    comment = Comments.objects.get(id=pk)
    comment.delete()
    return Response('done')
    

@api_view(['POST'])
@csrf_exempt
def postComment(request,pk):
    data = JSONParser().parse(request)
    serializer = CommentPostSerializer(data=data)
    if serializer.is_valid():
       newComment= serializer.save()
    return Response(newComment.id)

@api_view(['PUT'])
@csrf_exempt
def updateComment(request,pk):
    data = request.data
    oldComment = Comments.objects.get(id=pk)
    serializer = CommentUpdateSerializer(instance=oldComment, data=data)
    if serializer.is_valid():
        updatedComment = serializer.save()
    
    return Response('done')

