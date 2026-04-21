from django.contrib import admin
from .models import Order, OrderItem, Cart, CartItem

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at']
    inlines = [CartItemInline]

admin.site.register(Order)
admin.site.register(OrderItem)