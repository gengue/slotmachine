var slots = [
  {
    points: 10,
    pic: 'http://practiquesm6.webcindario.com/tragaperras/fresa.png'
  },
  {
    points: 20,
    pic: 'http://practiquesm6.webcindario.com/tragaperras/limon.png'
  },
  {
    points: 30,
    pic: 'http://practiquesm6.webcindario.com/tragaperras/sandia.png'
  },
  {
    points: 50,
    pic: 'http://practiquesm6.webcindario.com/tragaperras/kiwi.png'
  }
];

var vm = new Vue({
  el: '#app',
  data: {
    options: slots,
    credits: 50,
    bet: 1,
    slot1: Math.floor(Math.random()*slots.length),
    slot2: Math.floor(Math.random()*slots.length),
    slot3: Math.floor(Math.random()*slots.length),
    handle: false,
    win: false
  },
  methods : {
    shuffle: function(event) {
      if(this.bet == 0){
        return;
      }
      //Animation
      this.handle = true;
      var self = this;
      
      setTimeout(function() { self.handle = false; }, 500);

      this.slot1 = Math.floor(Math.random()*slots.length);
      this.slot2 = Math.floor(Math.random()*slots.length);
      this.slot3 = Math.floor(Math.random()*slots.length);
      if(this.slot1 == this.slot2 && this.slot1 == this.slot3){
        this.credits += this.options[this.slot1].points * this.bet ; 
        this.win = true;
        var count = 0;
        var intv = setInterval(function(){
          if (count == 4) clearInterval(intv);
          self.win = !self.win; 
          count++;
        }, 500);
      } else {
        this.win = false;
        this.credits--;
      }
      if(this.credits > 0) {
        this.bet = 1;
      } else {
        this.bet = 0;
      }
    }, 
    betOne: function(event) {
      if(this.credits > 0 && this.bet < 5) {
        this.bet++;
        this.credits--;
      }
    }
  }
})
