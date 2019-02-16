const Discord = require ("discord.js");
const client = new Discord.Client ();
var prefix = ("!");

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log("Connexion Effectuée.")
    client.user.setActivity ("» Anoria.fr");
});

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('#ff6e6e')
        .setDescription('[+] **' + member.user.username + '** a rejoint ' + member.guild.name)
        .setFooter('👥Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('528558421742452746').send(embed)

});

client.on('guildMemberRemove', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('#ff6e6e')
        .setDescription('[-] **' + member.user.username + '** a quitter ' + member.guild.name)
        .setFooter('👥Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('528558421742452746').send(embed)

});

client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === '!kick'){
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur.")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur.")
       member.kick()
       message.channel.send("**"+member.user.username + '** à bien était kick du discord.')
    }
});

client.on('message',message =>{
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban'){
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur.")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur.")
       message.guild.ban(member, {days: 7})
       message.channel.send("**"+member.user.username + '** à bien était banni permanent.')
    }
});

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === "!clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer.")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide.")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre entre 1 et 100.")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
 
    if (args[0].toLowerCase() === "!mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre non trouvable.")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Mute')
        if (muterole) {
            member.addRole(muterole)
            message.channel.send(member + ' à bien était mute permanent.')
        }
        else {
            message.guild.createRole({name: 'Mute', permissions: 0}).then((role) => {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' à bien était mute permanent.')
            })
        }
    }
})

client.on('message', message => {

    if(message.content === "!maintenance"){
        var maintenance_embed = new Discord.RichEmbed()
        .setColor("#ff6e6e")
        .addField(":shield:Maintenance:", "Le bot discord et actuellement en Maintenance.")
        .setFooter("Développer par Rayze | Anoria.fr.")
        message.channel.sendMessage(maintenance_embed);
    }

    if(message.content === "!aide"){
        var aide_embed = new Discord.RichEmbed()
        .setColor("#ff6e6e")
        .setTitle("**[Anoria]**- Tous renseignement ce trouve ici.")
        .addField(":shopping_cart:Boutique:", "Lien de la Boutique: (lien)")
        .addField(":speech_balloon:Forum:", "Lien du Forum: (lien)")
        .addField(":arrow_right:IP:", "Adresse IP du serveur: (bientôt)")
        .setFooter("Développer par Rayze | Anoria.fr.")
        .setTimestamp()
        message.channel.sendMessage(aide_embed);
    }

    if(message.content === "!youtube"){
        var youtube_embed = new Discord.RichEmbed()
        .setColor("#ff6e6e")
        .addField(":projector:Youtubeur:", "Le grade YouTubeur et disponible à partir de 250 abonnée.")
        .setFooter("Développer par Rayze | Anoria.fr.")
        message.channel.sendMessage(youtube_embed);
    }

    if(message.content === "!staff"){
        var staff_embed = new Discord.RichEmbed()
        .setColor("#ff6e6e")
        .setTitle("**Commande des administrateurs:**")
        .setDescription("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
        .addField(":rotating_light:-Bannissement:", "!ban <pseudo>")
        .addField(":rotating_light:-Ejecter:", "!kick <pseudo>")
        .addField(":rotating_light:-Muet:", "!mute <pseudo>")
        .addField(":rotating_light:-Nettoyer:", "!clear <pseudo>")
        .addField("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬")
        .setFooter("Développer par Rayze | Anoria.fr")
        message.channel.sendMessage(staff_embed);
    }

    prefix = "!";
    if(message.content.startsWith("!sondage")){
        const sondageSlice = message.content.slice(prefix.length + "sondage".length).trim();

        if(message.guild.channels.find('name', 'sondage')){
            message.delete()
        }
        var embed = new Discord.RichEmbed()
        .setColor("#ff6e6e")
        .setTitle("Anoria'Sondage:")
        .setDescription(sondageSlice)
        .setFooter("Répondez avec 👍 ou bien 👎.")
        .setTimestamp()
        message.channel.send(embed)
        .then(function (message){
            message.react("👍")
            message.react("👎")
        }).catch(function(){
            
        });
    }

    prefix = "!";
    if(message.content.startsWith("!annonce")){
        const sondageSlice = message.content.slice(prefix.length + "annonce".length).trim();

        if(message.guild.channels.find('name', 'annonce')){
            message.delete()
        }
        var embed = new Discord.RichEmbed()
        .setColor("#ff6e6e")
        .setTitle("Anoria'Annonce:")
        .setDescription(sondageSlice)
        .setFooter("Développer par Rayze | Anoria.fr")
        .setTimestamp()
        message.channel.send(embed)
    }
});
