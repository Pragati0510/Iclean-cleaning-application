from rest_framework.serializers import ModelSerializer , PrimaryKeyRelatedField

from .models import Location, Profile, Issue, Comments


#profile


class NewProfileSerialiser(ModelSerializer):
    class Meta:
        model = Profile
        # fields = ['auth0_id','First_name','Last_name','email','Description','Age','Lives_in','ProfileImgUrl']
        fields = '__all__'
class ProfileMainSerialiser(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['auth0_id','First_name','Last_name','ProfileImgUrl']
        # fields = '__all__'
class ProfileIdSerialiser(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['auth0_id']
        # fields = '__all__'


# location 

class LocationSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'
        #fields = ['id','first_name','IssueId']


##Issues


class IssuesSerializer(ModelSerializer):

    class Meta:
        model = Issue
        # fields =['Title','Description','Issue_Loc','Issue_posted_by','Issue_id','ImgUrl']
        fields = '__all__'
        #fields = ['id','first_name']

class GetIssuesSerializer(ModelSerializer):
    Issue_posted_by = NewProfileSerialiser()
    Issue_Loc = LocationSerializer()
    class Meta:
        model = Issue
        fields =['Title','Description','Issue_Loc','Issue_posted_by','Issue_id','ImgUrl','Upvotes']
        fields = '__all__'
        
class IssuesUpdateSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = ['Title','Description','Issue_Loc']

class IssueUpvoteSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = ['Upvotes']
class IssueResolveSerializer(ModelSerializer):
    class Meta:
        model = Issue
        fields = ['isResolved']
      

class IssuePostSerializer(ModelSerializer):
    # Issue_posted_by = ProfileIdSerialiser()
    class Meta:
        model = Issue
        fields = ['Title','Description','Issue_Loc','Issue_posted_by','Issue_id','ImgUrl']

# Comments

class CommentSerializer(ModelSerializer):
    Posted_By = ProfileMainSerialiser()
    class Meta:
        model = Comments
        fields = '__all__'
        #fields = ['id','first_name','IssueId']


class CommentPostSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id','CommentText','IssueId','Posted_By']


class CommentUpdateSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = ['id','CommentText']

