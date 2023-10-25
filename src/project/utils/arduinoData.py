import serial, sys
from publisher import *

def readings(client):
    serial_port = 'COM3'
    baud_rate = 9600
    ser = serial.Serial(serial_port, baud_rate, timeout=1)
    try:
        while True:
            # Read data from the serial port
            data = ser.readline().decode('utf-8').strip()
            if data:
                publish(client, data)

    except KeyboardInterrupt:
        print("Closing the serial port.")
        ser.close()

def start_readings():
    client = connect_mqtt()
    client.loop_start()
    readings(client=client)
