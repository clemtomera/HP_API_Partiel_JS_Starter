const charactersContainer = document.querySelector('.characters');
const gryffindorBtn = document.querySelector('.house.gryffindor');
const hufflepuffBtn = document.querySelector('.house.hufflepuff');
const ravenclawBtn = document.querySelector('.house.ravenclaw');
const slytherinBtn = document.querySelector('.house.slytherin');

gryffindorBtn.addEventListener('click', () => {
    loadCharacters('https://hp-api.onrender.com/api/characters/house/gryffindor');
});
hufflepuffBtn.addEventListener('click', () => {
    loadCharacters('https://hp-api.onrender.com/api/characters/house/hufflepuff');
});
ravenclawBtn.addEventListener('click', () => {
    loadCharacters('https://hp-api.onrender.com/api/characters/house/ravenclaw');
}); 
slytherinBtn.addEventListener('click', () => {
    loadCharacters('https://hp-api.onrender.com/api/characters/house/slytherin');
});

async function loadCharacters(url) {
    charactersContainer.innerHTML = '';
    const response = await fetch(url);
    let characters = await response.json();
    characters = characters.filter(c => c.image);
    characters.slice(0, 12).forEach(character => {
        const characterElement = document.createElement('a');
        characterElement.classList.add('character', character.house.toLowerCase());
        characterElement.href = 'details.html';

        characterElement.innerHTML = `
            <img src="${character.image}" alt="${character.name}" />
            <p>${character.name}</p>`;
        charactersContainer.appendChild(characterElement);
    });
}



loadCharacters('https://hp-api.onrender.com/api/characters');


