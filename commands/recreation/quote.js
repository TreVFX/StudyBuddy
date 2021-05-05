module.exports = {
    name: 'quote',
    description: "Receive a random quote!",
    execute(message){
        mess = quotes[Math.floor(Math.random() * quotes.length)]; 
        message.channel.send(mess)
    }
}

quotes =[
  "Believe and you will succeed!",
  "If dreams don't scare you, they are too small.",
  "Good things take time.",
  "Whatever you do, always give 100%. Unless you are donating blood :D",
  "Don't stop until you are proud.",
  "RYou can never cross the ocean untul you have the courage to lose sight of the shore so try something new!",
  "Doubt kills more dreams than failure ever will.",
  "If people are doubting how far you can go (including yourself), go so far that you can't hear them anymore",
  "Tough times don't last. Tough people do.",
  "ONE DAY or DAY ONE - you decide!",
  "Be so good that they can't ignore you",
  "You didn't get this far just to come this far",
  "Impossible?! The word itself says I'm possible!", "Aim for the moon. If you miss, you land in the stars...","Our greatest glory is not in never falling, but in rising every time we fall", "the hard days are what make you stronger", "Great things never came from comfort zones",
  "Success is a state of mind. If you want success, start thinking of yourself as a success.",
  "Don't count the days, make the days count",
  "Don't be pushed by your problems, be led by your dreams.",
  "Falling down is an accident, staying down is a choice",
  "Act as if what you do makes a difference because it does!",
  "Your only limit is your mind",
  "Be stronger than your excuses",
  "Believe you can and you are halfway there"
  ]