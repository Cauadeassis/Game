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
const cards = [
  {
    text: "Senhor, o general pede um aumento para seus soldados.",
    rightButtonText: "Permissão concedida",
    leftButtonText: "Não, mantenha como está",
    effects: {
        rightButtonEffects: {commonEffects: {army: +10, economy: -10 }},
        leftButtonEffects: {commonEffects: {army: -10, economy: + 10 }},
    }
  },
  {
    text: "Uma nova universidade faria bem para o país, mas preciso de dinheiro para isso.",
    rightButtonText: "Você tem meu investimento",
    leftButtonText: "Preciso desse dinheiro",
    effects: {
        rightButtonEffects: {commonEffects: {population: +10, economy: -10 }},
        leftButtonEffects: {commonEffects: {population: -10, economy: +10 }},
    }
  },
  {   
    text: "A respeito da ecology, devemos investir em energia renovável?",
    rightButtonText: "Sim, faça isso",
    leftButtonText: "Não precisamos disso",
    effects: {
        rightButtonEffects: {commonEffects: {ecology: +10, population: +5, economy: -10 }},
        leftButtonEffects: {commonEffects: {ecology: -10, population: -10, economy: +10 }},
    }
  },
  {   
    text: "Senhor, muitos quartéis estão inutilizados. Devemos transformá-los em escolas?",
    rightButtonText: "Claro, as crianças ficarão felizes",
    leftButtonText: "Não, deixe como está",
    effects: {
        rightButtonEffects: {commonEffects: {population: +15, army: -5 }},
        leftButtonEffects: {commonEffects: {population: -10, army: +5}},
    }
  },
  {   
    text: "Uma nova ilha foi encontrada. Devemos colonizá-la?",
    rightButtonText: "Claro, conquiste os indígenas",
    leftButtonText: "Não, ignore a ilha",
    effects: {
        rightButtonEffects: {commonEffects: {population: +10, army: -10, economy: +10 }},
        leftButtonEffects: {commonEffects: { population: 0, army: +10, economy: -10}},
    }
  },
  {   
    text: "O exército está fraco demais. Devemos instituir serviço militar obrigatório?",
    rightButtonText: "Claro que sim",
    leftButtonText: "Claro que não",
    effects: {
        rightButtonEffects: {commonEffects: {population: -15, army: +15 }},
        leftButtonEffects: {commonEffects: {population: +10, army: -10}},
    }
  },
  {   
    text: "Um poço de petróleo foi encontrado! Devemos explorá-lo?",
    rightButtonText: "Sim, beneficiará o governo",
    leftButtonText: "Não, prejudicará a natureza",
    effects: {
        rightButtonEffects: {commonEffects: {ecology: -10, army: +10, economy: +15}},
        leftButtonEffects: {commonEffects: {ecology: +20, army: -10, economy: -10}},
    }
  },
  {   
    text: "A nossa produção de aço caiu.",
    rightButtonText: "Foque em produzir ferramentas",
    leftButtonText: "Foque em produzir armas",
    effects: {
        rightButtonEffects: {commonEffects: {population: +15, army: -15}},
        leftButtonEffects: {commonEffects: {population: -15, army: +15}},
    }
  },
  {   
    text: "Senhor, o sul do país está inundado! Devemos ajudá-lo?",
    rightButtonText: "Sim, envie o exército",
    leftButtonText: "Não, o sul consegue se recuperar sozinho",
    effects: {
        rightButtonEffects: {commonEffects: {ecology: +5, population: +5, army: -10, economy: -10 }},
        leftButtonEffects: {commonEffects: {ecology: -10, population: -25, army: +10, economy: +10}},
    }
  },
  {   
    text: "Devemos aumentar os impostos sobre a população, ou manter como está?",
    rightButtonText: "Aumente",
    leftButtonText: "Deixe como está",
    effects: {
        rightButtonEffects: {commonEffects: {population: -15, economy: +15 }},
        leftButtonEffects: {commonEffects: {population: +5}},
    }
  },
  {   
    text: "Ambientalistas pedem o banimento de sacolas plásticas",
    rightButtonText: "Concordo, proíba",
    leftButtonText: "Não, isso atrapalha o comércio",
    effects: {
        rightButtonEffects: {commonEffects: {ecology: +10, economy: -10 }},
        leftButtonEffects: {commonEffects: {ecology: -10, economy: +10}},
    }
  },
  {   
    text: "Um deputado foi acusado de corrupção.",
    rightButtonText: "Abra uma investigação",
    leftButtonText: "Abafe o caso",
    effects: {
        rightButtonEffects: {commonEffects: {population: +10, economy: -5 }},
        leftButtonEffects: {commonEffects: {economy: +5}},
    }
  },
  {   
    text: "Senhor, uma de nossas florestas está pegando fogo!",
    rightButtonText: "Envie o exército",
    leftButtonText: "Deixe apagar sozinho",
    effects: {
        rightButtonEffects: {commonEffects: {ecology: +5, army: -10 }},
        leftButtonEffects: {commonEffects: {ecology: -15}},
    }
  },
  {
  text: "Especialistas sugerem liberar o cultivo de maconha para fins medicinais.",
  rightButtonText: "Apoie a ciência",
  leftButtonText: "Proíba totalmente",
  effects: {
    rightButtonEffects: { commonEffects: { population: +5, ecology: +5, economy: +5 } },
    leftButtonEffects: { commonEffects: { population: -5 } },
  }
  },
  {
  text: "Líderes indígenas querem um pacto de não-interferência nas florestas.",
  rightButtonText: "Assine o pacto",
  leftButtonText: "Não precisamos disso",
  effects: {
    rightButtonEffects: { commonEffects: { ecology: +10, population: +10, army: -5 } },
    leftButtonEffects: { commonEffects: { ecology: -5, population: -5, army: +5 } },
  }
  },
  {
  text: "Um vazamento químico contaminou o maior rio do país.",
  rightButtonText: "Descontamine agora mesmo",
  leftButtonText: "Ignore por enquanto",
  effects: {
    rightButtonEffects: { commonEffects: { ecology: +5, economy: -10 } },
    leftButtonEffects: { commonEffects: { ecology: -15, population: -10, economy: +10 } },
  }
  },
  {   
    text: "A população deve ter armas?",
    rightButtonText: "Sim, arme todos",
    leftButtonText: "Deixe como está",
    effects: {
        rightButtonEffects: {commonEffects: {population: +5, army: -5, economy: +10}},
        leftButtonEffects: {commonEffects: {population: -5, army: +5}},
    }
  },
]
const defeatCards = [
  {
    id: "economicDefeat",
    stat: "economy",
    text: "Sob sua liderança, o governo foi à falência. O povo passa fome, você passa fome, todos morrem.",
    rightButtonText: "...",
    leftButtonText: "...",
  },
  {
    id: "armyDefeat",
    stat: "army",
    text: "Senhor, estamos sendo invadidos! O exército não consegue conter a massa de soldados!",
    rightButtonText: "O que?",
    leftButtonText: "Mas como...",
  },
  {
    id: "populationDefeat",
    stat: "population",
    text: "Uma multidão de pessoas se junta na porta da sede do governo, com tochas e armas.",
    rightButtonText: "...",
    leftButtonText: "...",
  },
  {
    id: "ecologyDefeat",
    stat: "ecology",
    text: "As árvores estão morrendo, as plantas não crescem mais, receio que não há mais nada a fazer.",
    rightButtonText: "...",
    leftButtonText: "...",
  },
  {
    id: "religionDefeat",
    text: "A igreja toma conta de tudo. Eventualmente, ela fica mais poderosa que o próprio governo, e toma o controle do país.",
    rightButtonText: "...",
    leftButtonText: "...",
  }
]
const evolutionCards = [
  {
    id: "escravismEvolution",
    stat: "economy",
    text: "O governo precisa de dinheiro e mão-de-obra acima de tudo. Gostaria de implementar escravismo no país?",
    rightButtonText: "Sim, escravize as pessoas",
    leftButtonText: "Não precisamos disso",
    effects: {
        rightButtonEffects: {
          commonEffects: {economy: +5, population: -5},
          persistent: {economy: +5, population: -5},
        },
        leftButtonEffects: {
          commonEffects: {population: +10},
        }
    },
  },
  {
    id: "militaryOligarchyEvolution",
    stat: "army",
    text: "Senhor, o exército está forte demais!",
    rightButtonText: "Mas o que...",
    leftButtonText: "Mas como..."
  },
  {
    id: "democracyEvolution",
    stat: "population",
    text: "Nossos cidadãos estão fortes e bem educados. Gostaria de implementar uma democracia no país?",
    rightButtonText: "Sim",
    leftButtonText: "Não precisamos disso",
    effects: {
        rightButtonEffects: {commonEffects: {population: +10}},
        leftButtonEffects: {commonEffects: {population: -10}},
    }
  },
  {
    id: "ecologyEvolution",
    stat: "ecology",
    text: "Nossas plantas e reservas naturais estão mais desenvolvidas do que nunca! O que você quer fazer?",
    rightButtonText: "Use para pesquisa e desenvolvimento",
    leftButtonText: "Armas biológicas!",
    effects: {
        rightButtonEffects: {persistent: {ecology:+5, population: +5}},
        leftButtonEffects: {persistent: {ecology: +5, army: +5}},
    }
  },
  {
    id: "teocracyEvolution",
    stat: "religiao",
    text: "Senhor, a igreja está forte demais!",
    rightButtonText: "Mas o que...",
    leftButtonText: "Mas como...",
  }
]
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
  currentCard = cards[cardIndex]
}
let cardsAlreadyDrawn = []
function drawCards(){
  if (cardsAlreadyDrawn.length === cards.length) {
    return;
  }
  do {
    cardIndex = Math.floor(Math.random() * cards.length);
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
  currentCard = cards[cardIndex]
  nextCard()
}
startGame()