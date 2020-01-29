# coding:utf-8
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt

from homepage.views import homepage,detail,category
from homepage.views import ItemMoreView, ItemDetailView

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', homepage),
    url(r'^item/(?P<mid>([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}))/$', detail),
    url(r'^api/item/more/$', csrf_exempt(ItemMoreView.as_view())),
    url(r'^api/item/detail/(?P<mid>([0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}))/$', csrf_exempt(ItemDetailView.as_view())),
    url(r'(?P<category>(\w+))/$', category),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
