import os

def start_broker():
    os.chdir("D:")
    os.chdir("mosquitto")
    os.system('mosquitto -c "D:\mosquitto\mosquitto.conf" -v')

if __name__ == "__main__":
    start_broker()
