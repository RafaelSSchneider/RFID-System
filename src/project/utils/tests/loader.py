import os
import time
def loadinfo():
    os.chdir("D:")
    os.chdir("mosquitto")
    while True:
        os.system('mosquitto_pub -h 127.0.0.1 -t "ARD/data/1" -m "Teste ard1"')
        os.system('mosquitto_pub -h 127.0.0.1 -t "ARD/data/2" -m "Teste ard2"')
        time.sleep(1)
if __name__ == "__main__":
    loadinfo()