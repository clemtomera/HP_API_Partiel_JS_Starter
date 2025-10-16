const charactersContainer = document.querySelector('.characters');
const gryffindorBtn = document.querySelector('.house.gryffindor');
const hufflepuffBtn = document.querySelector('.house.hufflepuff');
const ravenclawBtn = document.querySelector('.house.ravenclaw');
const slytherinBtn = document.querySelector('.house.slytherin');
const sortSelect = document.getElementById('sort');

var lastClicked = undefined;

gryffindorBtn.addEventListener('click', () => {
    lastClicked = 'gryffindor';
    loadCharactersfromUrl();
});
hufflepuffBtn.addEventListener('click', () => {
    lastClicked = 'hufflepuff';
    loadCharactersfromUrl();
});
ravenclawBtn.addEventListener('click', () => {
    lastClicked = 'ravenclaw';
    loadCharactersfromUrl();
}); 
slytherinBtn.addEventListener('click', () => {
    lastClicked = 'slytherin';
    loadCharactersfromUrl();
});

sortSelect.addEventListener('change', () => {
    loadCharactersfromUrl();
});

async function loadCharactersfromUrl() {
    charactersContainer.innerHTML = '';
    let url;

    switch (lastClicked) {
        case 'gryffindor':
            url = 'https://hp-api.onrender.com/api/characters/house/gryffindor';
            break;
        case 'hufflepuff':
            url = 'https://hp-api.onrender.com/api/characters/house/hufflepuff';
            break;
        case 'ravenclaw':
            url = 'https://hp-api.onrender.com/api/characters/house/ravenclaw';
            break;
        case 'slytherin':
            url = 'https://hp-api.onrender.com/api/characters/house/slytherin';
            break;
        default:
            url = 'https://hp-api.onrender.com/api/characters';
    }
    
    const response = await fetch(url);
    let characters = await response.json();

    const sortBy = sortSelect.value;
    if (sortBy === 'name (asc)') {
        characters.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name (desc)') {
        characters.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'age (asc)') {
        characters.sort((a, b) => b.yearOfBirth - a.yearOfBirth);
    } else if (sortBy === 'age (desc)') {
        characters.sort((a, b) => a.yearOfBirth - b.yearOfBirth);
    }

    loadCharacters(characters);
}

function loadCharacters(characters) {
    charactersContainer.innerHTML = '';
    characters.slice(0, 12).forEach(character => {
        const characterElement = document.createElement('a');
        characterElement.classList.add('character');
        if (character.house && character.house.trim() !== '') {
            characterElement.classList.add(character.house.toLowerCase());
        }
        characterElement.href = `details.html?id=${character.id}`;

        characterElement.innerHTML = `
            <img src="${character.image || './images/characters/troll.jpg'}" alt="${character.name}" />
            <p>${character.name}</p>`;
        charactersContainer.appendChild(characterElement);
    });
}

loadCharactersfromUrl('https://hp-api.onrender.com/api/characters');


