const filterInput = document.getElementById('filterInput');
const characterList = document.getElementById('characterList');

if (!filterInput || !characterList) {
    throw new Error('Required tags not found');
}
let cachedCharacters = [];
const cachedImages = {};
async function fetchCharacters() {
    try {
        const response = await fetch('http://localhost:3000/characters');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const characters = await response.json();
        cachedCharacters = characters;
        await renderCharacters(characters);

        if (filterInput) {
            filterInput.addEventListener('input', () => filterCharacters(characters));
        }
    } catch (error) {
        console.error('Error fetching characters:', error);
    }
}


async function renderCharacters(characters) {
    characterList.innerHTML = '';
    for (const character of characters) {
        const card = document.createElement('div');
        card.className = 'character-card';
        const cachedImage = await fetchCharacterImage(character);

        card.innerHTML = `
            <img src="${cachedImage}" alt="${character.name} portrait">
            <h3>${character.name}</h3>
            <p>Health: ${character._health}</p>
            <p>Defense: ${character.defense}</p>
            <p>Resist: ${character.resist}</p>
            <p>Level: ${character.level}</p>
            <p>Rarity: ${character.rarity}</p>
        `;
        characterList.appendChild(card);
    }
}

function filterCharacters() {
    const filterValue = filterInput.value.toLowerCase();
    const filteredCharacters = cachedCharacters.filter(character =>
        character.name.toLowerCase().includes(filterValue)
    );
    renderCharacters(filteredCharacters);
}

async function fetchCharacterImage(character) {
    if (!cachedImages[character.name]) {
        try {
            const response = await fetch(`https://genshin.jmp.blue/characters/${character.name}/card`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const imageBlob = await response.blob();
            cachedImages[character.name] = URL.createObjectURL(imageBlob);
        } catch (error) {
            console.error(`Error fetching image for ${character.name}:`, error);
            cachedImages[character.name] = './toy_nail.jpg';
        }
    }
    return cachedImages[character.name];
}

await fetchCharacters();
