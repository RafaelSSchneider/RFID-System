const client = new Paho.MQTT.Client("ws://127.0.0.1:9001/", "Rafael-mqtt" + new Date().getTime());
const myTopic = "ARD001/data";
client.connect({ onSuccess: onConnect })
var counter = 0
function onConnect() {
    console.log("connection successful")
    client.subscribe(myTopic)   //subscribe to our topic
}

const publish = (topic, msg) => {  //takes topic and message string
    let message = new Paho.MQTT.Message(msg);
    message.destinationName = topic;
    client.send(message);
}

client.onMessageArrived = onMessageArrived;
function onMessageArrived(message) {
    let list = document.getElementById("tagDisplay")
    counter += 1;
    let el = document.createElement("li")
    el.innerHTML = message.payloadString
    el.appendChild(document.createTextNode(""))
    list.appendChild(el)
    document.getElementById("counter").innerHTML = counter
    reduceCounter()
}
const delay = ms => new Promise(res => setTimeout(res, ms));

const reduceCounter = async() =>{
  await delay(1000);
  counter -= counter
  document.getElementById("counter").innerHTML = counter
  var element = document.getElementById("tagDisplay");
  element.innerHTML = '';
}

client.onConnectionLost = onConnectionLost;

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
  client.connect({ onSuccess: onConnect });
}