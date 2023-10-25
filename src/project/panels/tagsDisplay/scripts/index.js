
const client = new Paho.Client("127.0.0.1", 9001 ,"Rafael-mqtt")
var connected = false;
//"ws://127.0.0.1:9001/", "Rafael-mqtt"
const myTopic = "ARD/data/1";

client.connect({ onSuccess: onConnect, mqttVersion: 4})

var counter = 0
function onConnect() {
  connected = true
  console.log("connection successful")
  client.subscribe(myTopic)   //subscribe to our topic
  let brokerStatus = document.getElementById('brokerStatus')
  brokerStatus.style.backgroundColor = '#05FF00';
}

//receive the message and send to HTML
client.onMessageArrived = onMessageArrived;
function onMessageArrived(message) {
    let tagList = document.getElementById("tagDisplay")
    let newTagElement = document.createElement("li")
    newTagElement.innerHTML = message.payloadString
    newTagElement.appendChild(document.createTextNode(""))
    tagList.appendChild(newTagElement)
    
    counter += 1;
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

//reconnect function, the library native reconnect is sketchy
const reconnect = async() =>{
    while (connected != true) {
        await delay(5000)
        console.log("Trying to connect")
        if(!connected){
          try{
            client.connect({ onSuccess: onConnect, mqttVersion: 4}) 
          }catch(error){
            //get the throw error from the library of the client has been already connected 
          }
        }
    }
}
client.onConnectionLost = onConnectionLost;

function onConnectionLost(responseObject){
  if (responseObject.errorCode !== 0){
    console.log("onConnectionLost:" + responseObject.errorMessage);
    let brokerStatus = document.getElementById('brokerStatus')
    brokerStatus.style.backgroundColor = '#FF0000';
    connected = false;
    reconnect()
  }
  reconnect()
}

// default reconnect function, if the first connection fail, this will keep trying to reconnect
if(!connected){
  reconnect()
}