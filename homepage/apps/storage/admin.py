from django.contrib import admin

from .models import Category, Item, Image


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title', ]

    def save_model(self, request, obj, form, change):
        super(CategoryAdmin, self).save_model(request, obj, form, change)
        if not change and obj.manual:
            obj.image = ("%s://%s%s" %
                         (request.scheme, request.get_host(), obj.manual.url))
            obj.save()


class ItemAdmin(admin.ModelAdmin):
    liset_display = ['title', ]

    def save_model(self, request, obj, form, change):
        super(ItemAdmin, self).save_model(request, obj, form, change)
        if not change and obj.manual:
            obj.image = ("%s://%s%s" %
                         (request.scheme, request.get_host(), obj.manual.url))
            obj.save()


class ImageAdmin(admin.ModelAdmin):
    list_display = ['item', 'image']

    def save_model(self, request, obj, form, change):
        super(ImageAdmin, self).save_model(request, obj, form, change)
        if not change and obj.manual:
            obj.image = ("%s://%s%s" % (request.scheme, request.get_host(), obj.manual.url))
            obj.save()


admin.site.register(Category, CategoryAdmin)
admin.site.register(Item, ItemAdmin)
admin.site.register(Image, ImageAdmin)
