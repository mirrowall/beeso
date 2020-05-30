from django.db import models

from storage.models import Item

class SiteConfig(models.Model):
    title = models.CharField('title', max_length=128)
    logo = models.ImageField('logo', upload_to='home/')
    description = models.CharField('description', max_length=128)
    meta = models.CharField('meta', max_length=255, null=True, blank=True)
    keyword = models.CharField('keyword', max_length=255, null=True, blank=True)
    valid = models.BooleanField('valid', default=False)

    def __str__(self):
        return self.title


class Banner(models.Model):
    site = models.ForeignKey(SiteConfig, on_delete=models.CASCADE)
    url = models.URLField("图片地址", null=True, blank=True)
    manual = models.ImageField("手动上传", upload_to="home/", null=True, blank=True)
    valid = models.BooleanField("是否有效", default=True)
    desc = models.CharField("备注", max_length=128, null=True, blank=True)
    redirect = models.CharField("跳转至", max_length=255, null=True, blank=True)

    def __str__(self):
        return self.url

class Recommand(models.Model):
    title = models.CharField("标题", max_length=128)
    description = models.CharField("描述", max_length=128, null=True)
    seq = models.IntegerField("位置", default=0)
    valid= models.BooleanField("生效", default=True)

    def __str__(self):
        return self.title


class Hot(models.Model):
    recommand = models.ForeignKey(Recommand, on_delete=models.CASCADE)
    image = models.URLField("图片地址", null=True, blank=True)
    manual = models.ImageField("手动上传", upload_to="home/", null=True, blank=True)
    title = models.CharField("标题", max_length=128)
    description = models.CharField("描述", max_length=128, null=True)
    redirect = models.URLField("跳转至", null=True, blank=True)

    def __str__(self):
        return self.title


class Collection(models.Model):
    ip = models.CharField(max_length=32, null=True)
    uuid = models.CharField(max_length=64, null=True)
    item = models.CharField(max_length=64, null=True)
    type = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
