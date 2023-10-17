from paho.mqtt import client as mqtt_client

broker = '127.0.0.1'
port = 1883
topic = "ARD001/data"
# generate client ID with pub prefix randomly
client_id = 'Rafael-mqtt'
externalClient = ""

def connect_mqtt():
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", rc)

    client = mqtt_client.Client(client_id)
    #client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client, data):
    result = client.publish(topic, data)
    # result: [0, 1]
    status = result[0]
    if status == 0:
        print(f"Send `{data}` to topic `{topic}`")
    else:
        print(f"Failed to send message to topic {topic}")
        
