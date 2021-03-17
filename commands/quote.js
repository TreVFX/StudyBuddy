module.exports = {
    name: 'quote',
    description: "this is a  quote command!",
    execute(message, args){
        mess = quotes[Math.floor(Math.random() * quotes.length)]; 
        message.channel.send(mess)
    }
}

quotes =[
  "To be called a refugee is the opposite of an insult; it is a badge of strength, courage, and victory.",
  "No one puts their children in a boat unless the water is safer than the land.",
  "A refugee is someone who survived and who can create the future.",
  "The world will not be destroyed by those who do evil, but by those who watch them without doing anything.",
  "Injustice anywhere is a threat to justice everywhere",
  "Refugees didn’t just escape a place. They had to escape a thousand memories until they’d put enough time and distance between them and their misery to wake to a better day.",
  "Refugees are mothers, fathers, sisters, brothers, children, with the same hopes and ambitions as us—except that a twist of fate has bound their lives to a global refugee crisis on an unprecedented scale.",
  "We have a legal and moral obligation to protect people fleeing bombs, bullets and tyrants, and throughout history those people have enriched our society.",
  "It is the obligation of every person born in a safer room to open the door when someone in danger knocks."
  ]