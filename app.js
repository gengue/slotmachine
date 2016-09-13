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

var insertCoinSound = new Audio('./sounds/insert_coin.mp3');
var cashOutSound = new Audio('./sounds/cashOut.mp3');
var rollSound = new Audio('./sounds/roll.mp3');

var vm = new Vue({
  el: '#app',
  data: {
    options: slots,
    credits: 50,
    bet: 1,
    handle: false,
    isRunning: false,
    win: false
  },
  methods : {
    finish: function(slotElements){
      var self = this;

      if(slotElements[0].active == slotElements[1].active && slotElements[0].active == slotElements[2].active){
        this.credits += this.options[slotElements[0].active].points * this.bet ; 
        this.win = true;
        cashOutSound.play();
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
      this.isRunning = false;
    },
    shuffle: function(event) {
      if(this.bet == 0 || this.isRunning){
        return;
      }
      this.isRunning = true;
      rollSound.play();

      //Animation
      this.handle = true;
      var self = this;
      setTimeout(function() { self.handle = false; }, 300);

      var slotElements = [];
      slotElements.push($("#slot1").slotMachine());
      slotElements.push($("#slot2").slotMachine());
      slotElements.push($("#slot3").slotMachine());

      var count = 0;
      var intv = setInterval(function(){
        if (count == 3){
          clearInterval(intv); 
          count = 0;
          var intv2 = setInterval(function(){
            if (count == 3){
              clearInterval(intv2); 
              self.finish(slotElements);
              return;
            } 
            slotElements[count].stop(); 
            count++;
          }, 600);
          return;
        } 
        slotElements[count].shuffle(); 
        count++;
      }, 300);
      
    }, 
    betOne: function(event) {
      if(this.credits > 0 && this.bet < 5) {
        this.bet++;
        this.credits--;
        insertCoinSound.play();
      }
    }
  }
})
