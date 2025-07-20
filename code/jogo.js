import {commonCards, defeatCards, evolutionCards} from "./cards.js";

const stats = {
  ecology: {value: 50, maxValue: 100},
  population: {value: 50, maxValue: 100},
  army: {value: 50, maxValue: 100},
  economy: {value: 50, maxValue: 100},
}
let cardIndex = 0;
let currentCard;
const statKeys = ['ecology', 'population', 'army', 'economy'];
const rightButton = document.getElementById('rightButton');
const leftButton = document.getElementById('leftButton');
let persistentEffects = {}
function checkButtonEffects(buttonEffects){
  if (buttonEffects.persistent) {
    updatePersistentEffects(buttonEffects);
    addPersistentEffect();
  }
}
function updatePersistentEffects(buttonEffects){
  persistentEffects = {};
  Object.assign(persistentEffects, buttonEffects.persistent);
}
function addPersistentEffect(){
  for (const singleStat in persistentEffects) {
      const affectedStat = document.getElementById(singleStat)
      if (persistentEffects[singleStat] > 0) {affectedStat.parentElement.classList.add("persistentPositiveEffect")};
      if (persistentEffects[singleStat] < 0) {affectedStat.parentElement.classList.add("persistentNegativeEffect")};
  }
}
rightButton.addEventListener('click', () => {
  const buttonEffects = currentCard.effects.rightButtonEffects;
  checkButtonEffects(buttonEffects)
  nextCard(buttonEffects)
});
leftButton.addEventListener('click', () => {
  const buttonEffects = currentCard.effects.leftButtonEffects;
  checkButtonEffects(buttonEffects)
  nextCard(buttonEffects)
});
rightButton.addEventListener('mouseover', () => showEffects(currentCard.effects.rightButtonEffects.commonEffects));
leftButton.addEventListener('mouseover', () => showEffects(currentCard.effects.leftButtonEffects.commonEffects));
[rightButton, leftButton].forEach(button => {
  button.addEventListener('mouseout', () => cleanEffects());
});
const allButtons = document.querySelectorAll("button")
function disableButtons() {
    allButtons.forEach(button => {
        button.classList.add("disabled")
    })
}
function enableButtons() {
    allButtons.forEach(button => {
        button.classList.remove("disabled")
    })
}
function showButtons(){
  rightButton.textContent = currentCard.rightButtonText;
  leftButton.textContent = currentCard.leftButtonText;
}
function showEffects(effects) {
  for (const singleStat in effects) {
    if (effects[singleStat] !== 0) {
      const singleStatColored = document.getElementById(singleStat)
      if (effects[singleStat] > 0) {
        singleStatColored.classList.add("greenStat")
      };
      if (effects[singleStat] < 0) {
        singleStatColored.classList.add("redStat")
      };
    }
  }
}
function cleanEffects() {
  statKeys.forEach(singleStat => {
    document.getElementById(singleStat).classList.remove("greenStat", "redStat")
  });
}
const visualCardText = document.getElementById('cardText');
function showText(){
  const cardText = currentCard.text;
  let i = 0;
  visualCardText.textContent = ''
  const typingInterval = setInterval(() => {
    visualCardText.textContent += cardText[i];
    i = i + 1;
    if (i === cardText.length){
      clearInterval(typingInterval);
      enableButtons();
      return;
    }
  }, 20)
}
function showCard() {
  showButtons();
  showText();
}
function applyEffects(buttonEffects) {
  const finalStat = {};
  if (Object.keys(persistentEffects).length > 0){
   applyPersistentEffects(finalStat)
  }
  applyCommonEffects(finalStat, buttonEffects.commonEffects)
  checkStats(finalStat);
  applyingEffectsAnimation(finalStat);
}
function applyCommonEffects(finalStat, buttonEffects){
  for (const singleStat in buttonEffects) {
    finalStat[singleStat] = (finalStat[singleStat] || stats[singleStat].value) + buttonEffects[singleStat];
  }
}
function applyPersistentEffects(finalStat){
  for (const singleStat in persistentEffects){
    finalStat[singleStat] = (finalStat[singleStat] || stats[singleStat].value) + persistentEffects[singleStat];
  }
}
function applyingEffectsAnimation(finalStat){
  for (const singleStat in finalStat) {
    const step = finalStat[singleStat] > stats[singleStat].value ? 1 : -1;
    const countingInterval = setInterval(() => {
      if (stats[singleStat].value === finalStat[singleStat]) {
        clearInterval(countingInterval);
      } else {
        stats[singleStat].value += step;
      }
      document.getElementById(singleStat).textContent = stats[singleStat].value;
    }, 60);
  }
}
function checkStats(finalStat){
  for (const singleStat in stats){
    if (finalStat[singleStat] <= 0) {
      currentCard = defeatCards.find(card => card.stat === singleStat)
      return;
    }
    if (finalStat[singleStat] >= stats[singleStat].maxValue) {
      currentCard = evolutionCards.find(card => card.stat === singleStat)
      stats[singleStat].maxValue = 150;
      return;
    }
  }
  currentCard = commonCards[cardIndex]
}
let cardsAlreadyDrawn = []
function drawCards(){
  if (cardsAlreadyDrawn.length === commonCards.length) {
    return;
  }
  do {
    cardIndex = Math.floor(Math.random() * commonCards.length);
  } while (cardsAlreadyDrawn.includes(cardIndex));
  cardsAlreadyDrawn.push(cardIndex);
}
function nextCard(buttonEffects = { commonEffects: {} }) {
  applyEffects(buttonEffects);
  showCard();
  cleanEffects();
  disableButtons();
  drawCards();
}
function updateStats() {
  statKeys.forEach(singleStat => {
    document.getElementById(singleStat).textContent = stats[singleStat].value;
  });
}
function startGame(){
  updateStats()
  drawCards()
  currentCard = commonCards[cardIndex]
  nextCard()
}
startGame()