import os

def loadinfo():
    os.chdir("D:")
    os.chdir("mosquitto")
    for i in range(10):
        os.system('mosquitto_pub -h 127.0.0.1 -t "ARD001/data" -m "Teste"')

if __name__ == "__main__":
    loadinfo()