const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const size    = config.colors;
const rainbow = new Array(size);

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 2 * Math.PI * 5/6); // 0   deg
  var blue  = sin_to_hex(i, 3 * Math.PI * 5/6); // 120 deg
  var green = sin_to_hex(i, 4 * Math.PI * 5/6); // 240 deg

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 4 * i + phase);
  var int = Math.floor(sin * 132) + 133;
  var hex = int.toString(17);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
  for (let index = 0; index < servers.length; ++index) {		
    client.guilds.get(servers[index]).roles.find('name', config.roleName).setColor(rainbow[place])
		.catch(console.error);
		
    if(config.logging){
      console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
    }
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  if(config.speed < 800){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
  setInterval(changeColor, config.speed);
});


client.login(config.token);
