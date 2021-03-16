const Discord = require("discord.js");
const client = new Discord.Client();
const log = require(`./logs.js`);
const { token } = require('./config/config.json');
const ms = require('ms');
var setTitle = require('console-title');
const readline = require("readline")
var center = require('center-align');
var colors = require("colors")
const fs = require("fs");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


client.on("error", (e) => {
	log.error(e);
	return;
});

client.on("warn", (e) => {
	log.warn(e);
	return;
});

(async function () {
	setTitle("Discord servidor Clone | By Raggzinn");
	console.log(" ");
	console.log(" ");
	console.log(center(` Discord servidor Clone`.red, 112));
	console.log(center(` By Raggzinn`.red, 112));


console.log(" ");
console.log(" ");
console.log(" ");
console.log(" ");
let copy = await question(('| Insira o ID do servido que sera copiado:'.red));
let paste = await question(('| Insira o ID do servidor que sera colado:'.red));

client.on("ready", async() => {
	try {
		setTimeout(async function() {
			log.info(`Conectando...`)
		}, ms('3s'));
		log.info(`Conectado!`)
	} catch (e) {
		log.error(e.stack)
	}


	setTitle("Discord server Clone | By Raggzinn");
	let guild1 = client.guilds.get(`${copy}`)
	let guild2 = client.guilds.get(`${paste}`);

	let channels = guild1.channels.filter(c => c.type === "text").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c);
	let categories = guild1.channels.filter(c => c.type === "category").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c);
	let roles = guild1.roles.sort((a, b) => b.calculatedPosition - a.calculatedPosition).map(r => r);
	let voice = guild1.channels.filter(c => c.type === "voice").sort((a, b) => a.calculatedPosition - b.calculatedPosition).map(c => c);


  let allowedRegions = ['brazil', 'us-west', 'singapore', 'eu-central', 'hongkong',
                    'us-south', 'amsterdam', 'us-central', 'london', 'us-east', 'sydney', 'japan',
                    'eu-west', 'frankfurt', 'russia'];

  let region = allowedRegions.includes(guild2.region) ? guild2.region : 'eu-central';

	let guildname = guild1.name + " | https://github.com/Raggzinn/Dc-Clone";
	let guildico = guild1.iconURL;

	await guild2.channels.deleteAll();

	await guild2.setIcon(guildico).then(icon => {
		log.info('Setando foto do servidor: ' + guildico)
	})
	await guild2.setName(guildname).then(name => {
		log.info('Setando nome do servidor: ' + name)
	})
  await guild2.setRegion(region).then(m => {
		log.info('Setando região do servidor: ' + region)
	})
  await guild2.setVerificationLevel(guild1.verificationLevel).then(m => {
		log.info('Setando verificação do servidor: ' + guild1.verificationLevel)
	})

	for (var i = 0; i < roles.length; i++) {
		let do2 = await guild2.roles.find(c => c.name === roles[i].name)
		if (do2) continue;
		guild2.createRole({
			type: roles[i].type,
			name: roles[i].name,
			color: roles[i].hexColor,
			hoist: roles[i].hoist,
			permissions: roles[i].permissions,
			managed: roles[i].managed,
			mentionable: roles[i].mentionable
		}).then(createdRole => {
			log.info('Criando cargo: ' + createdRole.name)
		})
	}


	guild1.emojis.forEach(emoji => {
		let do2 = guild2.emojis.find(c => c.name === emoji.name)
		if (do2) return;
		guild2.createEmoji(emoji.url, emoji.name).then(createdEmoji => {
			log.info('Criando emoji: ' + createdEmoji)
		})
	})

	categories.forEach(async(category) => {
	let do2 = await guild2.channels.find(c => c.name === category.name)
	if (do2) return;


    await guild2.createChannel(category.name, 'category').then(createdCategory => {
			log.info('Criando categoria: ' + createdCategory.name)
		})
	})

		for (var i = 0; i < channels.length; i++) {
			let do1 = channels[i]
			let do2 = await guild2.channels.find(c => c.name === do1.name)
			if (do2) continue;

			if (!do1.parent) {
				var channel2 = await guild2.createChannel(do1.name, 'text')
				if (channels[i].topic) {
					channel2.setTopic(channels[i].topic)
				}
			}
			if (do1.parent) {
				var channel = await guild2.createChannel(do1.name, 'text')
				if (channels[i].topic) {
					channel.setTopic(channels[i].topic)
				}
				var ll = await guild2.channels.find(c => c.name === do1.parent.name)
				if (ll) {
					channel.setParent(guild2.channels.find(c => c.name === do1.parent.name).id)
				} else {
					var ll1 = await guild2.createChannel(do1.parent.name, 'category')
					channel.setParent(ll1)
				}
			}
			log.info('Criando canal de texto: ')

		for (var i = 0; i < voice.length; i++) {
			let do1 = voice[i]
			let do2 = await guild2.channels.find(c => c.name === do1.name)
			if (do2) continue;
			if (!do1.parent) {
				await guild2.createChannel(do1.name, 'voice')
			}
			if (do1.parent) {
				var channel = await guild2.createChannel(do1.name, 'voice')
				var ll = await guild2.channels.find(c => c.name === do1.parent.name)
				if (ll) {
					channel.setParent(guild2.channels.find(c => c.name === do1.parent.name).id)
				} else {
					var ll1 = await guild2.createChannel(do1.parent.name, 'category')
					channel.setParent(ll1)
				}
			}
			log.info('Criando canal de voz: ' + channel.name)
		}

	}
	log.info('Servidor clonado com successo usando https://github.com/Raggzinn/Dc-Clone')
	log.info('Você já pode fechar está janela')
})


client.login(token);
})();

function question(string) {
    return new Promise((res) => {
        rl.question(string, (answer) => res(answer))
    })
}