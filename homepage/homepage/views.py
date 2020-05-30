from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator

from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

from storage.models import Category, Item, Image
from homepage.models import SiteConfig, Banner, Recommand, Hot, Collection


def homepage(request):
    categories = Category.objects.filter(showed=True)
    items = Item.objects.all()

    site = SiteConfig.objects.filter(valid=True).first()

    banners = Banner.objects.filter(valid=True, site=site)

    recommand_list = [(x, Hot.objects.filter(recommand=x))
                      for x in Recommand.objects.filter(valid=True).order_by("seq")]

    return render(
        request,
        'index.html',
        locals()
    )


def category(request, *args, **kwargs):
    category = kwargs['category']

    categories = Category.objects.filter(showed=True)
    site = SiteConfig.objects.filter(valid=True).first()
    current = Category.objects.get(slug=category)
    items = Item.objects.filter(category=current).order_by("-weight")[:20]

    api = ''
    if Item.objects.filter(category=current).count() > 20:
        api = '/api/item/more/?page=2'

    return render(
        request,
        'category.html',
        locals()
    )


def detail(request, *args, **kwargs):
    item = Item.objects.get(uuid_id=kwargs['mid'])
    images = Image.objects.filter(item=item).order_by("seq")

    return render(
        request,
        'image_viewer.html',
        locals()
    )


def image_detail(request, *args, **kwargs):
    item = Item.objects.get(uuid_id=kwargs['mid'])
    return render(
        request,
        'image_detail.html',
        locals()
    )


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'


class ItemMoreView(ListAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def post(self, request, *args, **kwargs):
        category = request.POST['cate']

        queryset = self.get_queryset().filter(category__slug=category)
        page = self.paginate_queryset(queryset)

        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class ItemDetailView(APIView):
    def get(self, request, *args, **kwargs):
        item = Item.objects.get(uuid_id=kwargs['mid'])
        images = Image.objects.filter(item=item).order_by("seq")
        return Response([image.image for image in images])


class ItemFollowView(APIView):
    def get_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def post(self, request, *args, **kwargs):
        Collection(
            ip = self.get_ip(request),
            uuid = request.POST['uuid'],
            item = request.POST['item'],
            type = 1,
        ).save()
        return Response({'status':1})

class ItemLikeView(APIView):
    def get_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def post(self, request, *args, **kwargs):
        Collection(
            ip = self.get_ip(request),
            uuid = request.POST['uuid'],
            item = request.POST['item'],
            type = 2,
        ).save()
        return Response({'status':1})

