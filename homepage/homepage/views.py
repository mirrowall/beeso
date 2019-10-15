from django.shortcuts import render

from storage.models import Category, Item

def homepage(request):
  return render(
    request,
    'index.html',
    {
      'categories':Category.objects.all(),
      'items': Item.objects.all(),
    }
  )


def detail(request):
  return render(
    request,
    'detail.html',
    {}
  )
