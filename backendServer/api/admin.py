from django.contrib import admin

# Register your models here.

from .models import Profile, Issue, Location, Comments, Authority



admin.site.register(Profile)
admin.site.register(Issue)
admin.site.register(Location)
admin.site.register(Comments)
admin.site.register(Authority)


