# coding:utf-8
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from homepage.views import homepage,detail,category

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', homepage),
    url(r'^item/(?P<mid>([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}))/$', detail),
    url(r'(?P<category>(\w+))/$', category),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
