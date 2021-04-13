let getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

let controlHealth = (health, damage) => {
  if (health - damage < 0 ) {
    health = 0;
  } else {
    healt -= damage;
  }
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      messageLogs: []
    }
  },
  computed: {
    monterHealthStyles() {
      return {width: this.monsterHealth + '%'}
    },
    playerHealthStyles() {
      return {width: this.playerHealth + '%'}
    },
    disable() {
      return !(this.currentRound % 3 === 0) || this.currentRound === 0;
    }
  },
  methods: {
    attackMonster() {
      const monsterDamage = getRandomValue(5, 12);
      this.monsterHealth = this.monsterHealth - monsterDamage < 0 ? 0 : this.monsterHealth -= monsterDamage;
      this.attackPlayer();
      this.addLogMessage('player', 'attack', monsterDamage);
      this.currentRound++;
    },
    attackPlayer() {
      const playerDamage =  getRandomValue(8, 15);
      this.playerHealth = this.playerHealth - playerDamage < 0 ? 0 : this.playerHealth -= playerDamage;   
      this.addLogMessage('monster', 'attack', playerDamage);
    },  
    specialAttack() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackValue < 0 ? 0 : this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'special-attack', attackValue);
      this.attackPlayer();
      this.currentRound++;
    },
    healPlayer() {
      const healValue = getRandomValue(10, 17)
      this.playerHealth = this.playerHealth > 100 ? 100 : this.playerHealth += healValue
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage('player', 'heal', healValue);
      this.attackPlayer();
      this.currentRound++;
    },
    surrender() {
      this.winner = 'monster';
    },
    newGame() {
      this.winner = null;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.messageLog = [];
    },
    addLogMessage(who, what, value) {
      this.messageLogs.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0) {
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = 'draw';
      } else if (value <= 0){
        this.winner = 'player';
      }
    }
  }
});

app.mount('#game');