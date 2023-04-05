import pika
import json

# Set up RabbitMQ connection
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare queue for order updates
channel.queue_declare(queue='order_updates')

# Define function for publishing order update events
def publish_order_update(order_id, old_status, new_status):
    # Create order update message
    message = {
        'order_id': order_id,
        'old_status': old_status,
        'new_status': new_status
    }

    # Publish message to order_updates queue
    channel.basic_publish(exchange='',
                          routing_key='order_updates',
                          body=json.dumps(message))


def get_order(order_id, old_status): 
    new_status = 2 #get from get_order(order_id)
    if (new_status != old_status):
        publish_order_update(order_id, old_status, new_status)
