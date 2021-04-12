let getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      log: []
    }
  },
  computed: {
    monterHealthStyles() {
      return {width: this.monsterHealth + '%'}
    },
    playerHealthStyles() {
      return {width: this.playerHealth + '%'}
    },
    disableSpecial() {
      return !(this.currentRound % 3 === 0) || this.currentRound === 0;
    }
  },
  methods: {
    attackMonster() {
      const monsterDemage = getRandomValue(5, 12);
      this.monsterHealth -= monsterDemage;
      this.log.push(monsterDemage);
      this.attackPlayer();
      this.currentRound++;
    },
    attackPlayer() {
      const playerDemage =  getRandomValue(8, 15);
      this.playerHealth -= playerDemage;
      this.log.push(playerDemage);
    },  
    specialAttack() {
      const attackValue = getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
    },
    heal() {
      const playerHeal = getRandomValue()
    },
    surrender() {

    }
  }
});

app.mount('#game');