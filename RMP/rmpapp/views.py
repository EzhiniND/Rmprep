from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
import json
from django.http import HttpResponse
from django.urls import reverse


def home(request):
    return render(request, "home.html")

def service(request):
    return render(request, "service.html")

def service_view(request):
    context = {
        'page_title': 'Our Service',
    }
    return render(request, 'service.html', context)

def home_view(request):
    context = {
        'page_title': 'Home',
    }
    return render(request, 'home.html', context)

def cart(request):
    return render(request, 'cart.html')
def contact(request):
    return render(request,'contact.html')

def submit_order(request):
    if request.method == 'POST':
        # Get personal details from the form
        name = request.POST.get('name', '')
        address = request.POST.get('address', '')
        phone_number = request.POST.get('phoneNumber', '')

        # Get cart details from the hidden input field
        cart_details_json = request.POST.get('cartDetails', '')
        
        try:
            cart_details = json.loads(cart_details_json)
            cart_products = cart_details.get('products', [])
            cart_total = cart_details.get('total', 0)
        except json.JSONDecodeError:
            # Handle JSON decoding error
            cart_products = []
            cart_total = 0

        # Build the email message
        subject = 'New Order'
        message = f'New Order\n\nPerson Details:\nName: {name}\nAddress: {address}\nPhone Number: {phone_number}\n\nCart Details:'
        for product in cart_products:
            message += f'\nProduct: {product["name"]} - Quantity: {product["quantity"]} - Total: Rs.{product["totalAmount"]}'
        

        # Send the email and get the result
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ORDER_EMAIL],  # Set this to the owner's email address
            fail_silently=False,
        )

        # Clear the cart after submitting the order
        request.session['cartProducts'] = []
        request.session['cartTotal'] = 0

        return redirect('home')  # Redirect to the home page or any desired URL

    # Handle other HTTP methods if needed
    return redirect('cart')  # Redirect to the home page or any desired URL

def contact_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone_number = request.POST.get('phone_number')
        message = request.POST.get('message')

        # Send email
        subject = 'New Enquiry'
        mail_message = f'Name: {name}\nEmail: {email}\nPhone Number: {phone_number}\nMessage: {message}'
        from_email = 'ezhinind@gmail.com'  # Update with your email address
        to_email = 'plasticsrmp@gmail.com'  # Update with the owner's email address

        send_mail(subject, mail_message, from_email, [to_email])

        return HttpResponse('Form submitted successfully. Thank you!')
        
    
    



    return render(request, 'contact.html')  