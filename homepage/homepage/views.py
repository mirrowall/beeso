from django.shortcuts import render

from storage.models import Category, Item, Image
from homepage.models import SiteConfig, Banner, Recommand, Hot


def homepage(request):
    categories = Category.objects.all()
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

    categories = Category.objects.all()
    site = SiteConfig.objects.filter(valid=True).first()
    current = Category.objects.get(slug=category)
    items = Item.objects.filter(category=current).order_by("-weight")[:20]

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
