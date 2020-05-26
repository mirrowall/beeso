from django.db import models
from taggit.managers import TaggableManager

import uuid


class Category(models.Model):
    title = models.CharField(max_length=32, null=True)
    slug = models.SlugField(max_length=32, null=True)
    description = models.CharField(max_length=255, null=True)
    seq = models.IntegerField(default=0, null=True)
    image = models.URLField(max_length=255, null=True, blank=True)
    manual = models.ImageField(upload_to='images/', null=True, blank=True)

    def __str__(self):
        return self.title


class Item(models.Model):
    uuid_id = models.UUIDField(default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=128, null=True, blank=True)
    actor = models.CharField(max_length=32, null=True, blank=True)
    avatar = models.URLField(max_length=255, null=True, blank=True)
    category = models.ForeignKey("Category", null=True, blank=True, on_delete=models.CASCADE)
    count = models.IntegerField(default=0, null=True, blank=True)
    pubdate = models.DateTimeField(null=True, blank=True)
    publisher = models.CharField(max_length=32, blank=True, null=True)
    brief = models.CharField(max_length=255, null=True, blank=True)
    tags = TaggableManager()
    source = models.URLField(null=True, blank=True)
    view = models.IntegerField(default=0, null=True, blank=True)
    liked = models.IntegerField(default=0, null=True, blank=True)
    image = models.URLField(max_length=255, null=True, blank=True)
    manual = models.ImageField(upload_to="images/", null=True, blank=True)
    weight = models.IntegerField(default=0, null=True)
    extend = models.CharField(max_length=255, null=True, blank=True)
    recommend = models.ManyToManyField("Item", null=True, blank=True)

    def __str__(self):
        return self.title


class Image(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='images')
    image = models.URLField(max_length=255, null=True, blank=True)
    manual = models.ImageField(upload_to='images/', null=True, blank=True)
    seq = models.IntegerField(default=0, null=True)
    high = models.URLField(max_length=255, null=True, blank=True)
    medium = models.URLField(max_length=255, null=True, blank=True)
    thumbnail = models.URLField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.image

