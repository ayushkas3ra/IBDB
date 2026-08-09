from django.db import models


# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=500)
    author = models.TextField()
    genre = models.TextField()
    rating = models.FloatField(default=0)
    rating_count = models.IntegerField(default=0)
    image = models.URLField(max_length=500)
    description = models.TextField()
    isbn13 = models.CharField(max_length=20, blank=True, null=True, unique=True)

    def __str__(self):
        return self.title
