from django.db import models
from taggit.managers import TaggableManager

class Category(models.Model):
  title = models.CharField(max_length=32, null=True)
  slug = models.SlugField(max_length=32, null=True)
  description = models.CharField(max_length=255, null=True)
  seq = models.IntegerField(default=0, null=True)
  image = models.ImageField(upload_to='category/', null=True)

  def __str__(self):
    return self.title


class Item(models.Model):
  title = models.CharField(max_length=128, null=True, blank=True)
  actor = models.CharField(max_length=32, null=True, blank=True)
  category = models.ForeignKey("Category", null=True, blank=True)
  count = models.IntegerField(default=0, null=True, blank=True)
  pubdate = models.DateTimeField(null=True, blank=True)
  publisher = models.CharField(max_length=32, blank=True)
  brief = models.CharField(max_length=255, null=True, blank=True)
  tags = TaggableManager()
  source = models.URLField(null=True, blank=True)
  view = models.IntegerField(default=0, null=True, blank=True)
  liked = models.IntegerField(default=0, null=True, blank=True)
  thumbnail = models.ImageField(upload_to="images/", null=True, blank=True)

  def __str__(self):
    return self.title


class Image(models.Model):
  item = models.ForeignKey(Item)
  image = models.ImageField(upload_to='images/', null=True)
  source = models.URLField(null=True)
  seq = models.IntegerField(default=0, null=True)

  def __str__(self):
    return self.image.url

