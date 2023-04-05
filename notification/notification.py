import pika
from sqlalchemy import event

#get data
#event listener


# Set up RabbitMQ connection
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare queue for notifications
channel.queue_declare(queue='notifications')

# Define function for sending notifications
def send_notification(message):
    channel.basic_publish(exchange='',
                          routing_key='notifications',
                          body=message)

# Send a notification
if order.order_status.status_id =="2":
    send_notification('Order is out for delivery')
elif order.order_status.status_id == "3":
    send_notification('Order has been delivered.')
# Close RabbitMQ connection
connection.close()
