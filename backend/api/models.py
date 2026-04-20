from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image_url = models.URLField(blank=True)
    address = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class FoodItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, related_name='foods', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True) 
    image_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='food_images/', null=True, blank=True) 
    def __str__(self):
        return f"{self.name} ({self.restaurant.name})"