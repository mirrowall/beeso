from django.contrib import admin

from homepage.models import SiteConfig, Banner, Recommand, Hot


class SiteAdmin(admin.ModelAdmin):
    list_display = ['title', 'valid']

class BannerAdmin(admin.ModelAdmin):
    list_display = ['url', 'valid']

    def save_model(self, request, obj, form, change):
        super(BannerAdmin, self).save_model(request, obj, form, change)
        if not change:
            obj.url = ("%s://%s%s"%(request.scheme, request.get_host(), obj.manual.url))
            obj.save()


class RecommandAdmin(admin.ModelAdmin):
    list_display = ['title', 'seq', 'title']

class HotAdmin(admin.ModelAdmin):
    list_display = ["image", "redirect"]

    def save_model(self, request, obj, form, change):
        super(HotAdmin, self).save_model(request, obj, form, change)
        if not change:
            obj.image = ("%s://%s%s"%(request.scheme, request.get_host(), obj.manual.url))
            obj.save()

admin.site.register(SiteConfig, SiteAdmin)
admin.site.register(Banner, BannerAdmin)
admin.site.register(Recommand, RecommandAdmin)
admin.site.register(Hot, HotAdmin)
