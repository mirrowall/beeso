from django.db import models

class SiteConfig(models.Model):
    title = models.CharField('title', max_length=128)
    logo = models.ImageField('logo', upload_to='home/')
    description = models.CharField('description', max_length=128)
    meta = models.CharField('meta', max_length=255, null=True, blank=True)
    keyword = models.CharField('keyword', max_length=255, null=True, blank=True)
    valid = models.BooleanField('valid', default=False)

    def __str__(self):
        return self.title
