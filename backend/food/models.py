from django.db import models

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    # Добавляем default=0 или разрешаем пустые значения (null=True, blank=True)
    rating = models.FloatField(default=0.0, null=True, blank=True) 

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='foods')
    name = models.CharField(max_length=100)
    price = models.FloatField()

    def __str__(self):
        return self.name