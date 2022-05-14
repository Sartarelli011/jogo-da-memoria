let game = {
  allTechs: [
    "bootstrap",
    "css3",
    "html5",
    "firebase",
    "mongodb",
    "javascript",
    "react",
    "nodejs",
  ],

  cards: null,

  lockMode: false,
  firstCard: null,
  secondCard: null,

  setCard: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0];

    if (card.flipped || this.lockMode) {
      return false;
    }
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.secondCard.flipped = true;
      this.lockMode = true;
      return true;
    }
  },

  checkMath: function () {
    if (!this.firstCard || !this.secondCard) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  unflipCards() {
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },

  checkGameOver() {
    return this.cards.filter((card) => !card.flipped).length == 0;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },

  createCardsFromallTechs: function () {
    this.cards = [];

    this.allTechs.forEach((tech) => {
      this.cards.push(this.createPairFromTechs(tech));
    });
    this.cards = this.cards.flatMap((pair) => pair);
    this.shuffleCards();
    return this.cards;
  },

  createPairFromTechs: function (tech) {
    return [
      { id: this.createIdWhithTech(tech), icon: tech, flipped: false },
      { id: this.createIdWhithTech(tech), icon: tech, flipped: false },
    ];
  },

  createIdWhithTech: function (tech) {
    return tech + parseInt(Math.random() * 1000);
  },
  //cards dentro da função
  shuffleCards: function (cards) {
    let indexAtual = this.cards.length;
    let randomIndex = 0;

    while (indexAtual !== 0) {
      randomIndex = Math.floor(Math.random() * indexAtual);
      indexAtual--;
      [this.cards[indexAtual], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[indexAtual],
      ];
    }
  },
};
