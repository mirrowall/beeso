from django.contrib import admin

from .models import Category, Item, Image


class CategoryAdmin(admin.ModelAdmin):
  list_display = ['title',]

class ItemAdmin(admin.ModelAdmin):
  liset_display = ['title', ]

class ImageAdmin(admin.ModelAdmin):
  list_display = ['item', 'image']

admin.site.register(Category, CategoryAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Image, ImageAdmin)
