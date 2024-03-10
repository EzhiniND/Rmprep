from django.urls import path
from . import views

urlpatterns= [
    path('',views.home,name="home"),
    path('service',views.service,name="service"),
    path('service/', views.service_view, name='service_view'),
    path('home/', views.home_view, name='home_view'),
    path('cart',views.cart,name="cart"),
    path('cart/',views.submit_order,name='submit_order'),
    path('contact',views.contact,name="contact"),
     path('contact/', views.contact_view, name='contact_view'),
   
    
]