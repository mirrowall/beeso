from django.contrib import admin

from homepage.models import SiteConfig


class SiteAdmin(admin.ModelAdmin):
    list_display = ['title', 'valid']


admin.site.register(SiteConfig, SiteAdmin)