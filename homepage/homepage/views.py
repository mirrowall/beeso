from django.shortcuts import render

from storage.models import Category, Item
from homepage.models import SiteConfig

def homepage(request):
  categories = Category.objects.all()
  items = Item.objects.all()
  site = SiteConfig.objects.filter(valid=True).first()

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

  return render(
    request, 
    'category.html',
    locals()
  )


def detail(request):
  return render(
    request,
    'image_viewer.html',
    {}
  )
