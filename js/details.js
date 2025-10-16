const characterName = document.getElementById("character");
const image = document.getElementById("character-image");
const actorName = document.getElementById("actor-name");
const gender = document.getElementById("gender");
const eye = document.getElementById("eye");
const hair = document.getElementById("hair");
const birth = document.getElementById("birth");
const patronus = document.getElementById("patronus");
const house = document.getElementById("house-image");

async function loadCharacter(id){
    const response = await fetch(`https://hp-api.onrender.com/api/character/${id}`);
    let data = await response.json();
    let character = data[0]; // l'API retourne un tableau avec un seul élément (pas bien)
    if (character) {
        characterName.innerHTML = character.name;
        image.src = character.image || './images/characters/troll.jpg';
        actorName.innerHTML = character.actor;
        gender.innerHTML = character.gender;
        eye.innerHTML = character.eyeColour;
        hair.innerHTML = character.hairColour;
        birth.innerHTML = character.dateOfBirth;
        patronus.innerHTML = character.patronus;
        switch (character.house) {
            case 'Gryffindor':
                house.src = './images/logo/Gryffindor.png';
                house.alt = 'Gryffindor';
                break;
            case 'Hufflepuff':
                house.src = './images/logo/Hufflepuff.png';
                house.alt = 'Hufflepuff';
                break;
            case 'Ravenclaw':
                house.src = './images/logo/Ravenclaw.png';
                house.alt = 'Ravenclaw';
                break;
            case 'Slytherin':
                house.src = './images/logo/Slytherin.png';
                house.alt = 'Slytherin';
                break;
            default:
                house.src = './images/characters/troll.jpg';
                house.alt = 'Unknown';
        }
    }
}

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
loadCharacter(id);






