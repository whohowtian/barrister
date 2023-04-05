import json
import pika

# Set up RabbitMQ connection
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare queue for order updates
channel.queue_declare(queue='order_updates')

# Define function for sending notifications
def send_notification(message):
    print("message sent")
    channel.basic_publish(exchange='',
                          routing_key='notifications',
                          body=message)

# Define callback function for order update events
def order_update_callback(ch, method, properties, body):
    # Parse the order update event message
    order_update = json.loads(body)

    # Check if the new order status meets the conditions for notification
    if order_update['new_status'] == 1:
        send_notification('Order is in progress')
    elif order_update['new_status'] == 2:
        send_notification('Order is out for delivery')
    elif order_update['new_status'] == 3:
        send_notification('Order has been delivered')

# Start consuming order update events
channel.basic_consume(queue='order_updates', on_message_callback=order_update_callback, auto_ack=True)
channel.start_consuming()
