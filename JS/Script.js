const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

//variável para armazenar os id dos pokemons
let searchPokemon = 1;






// função para buscar o pokemon na API
const fetchPokemon = async (pokemon) => {

    //função para receber a resposta da API
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    // verificação caso procure um pokemon inexistente 
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;  
    }

}










// função para redenrizar os dados obtidos na tela

//primeiro resgatamos as informações da primeira função no 'const data'
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    const data = await fetchPokemon(pokemon);

    //Agora ligamos as informações da API no código 
    if (data) {
        pokemonImg.style.display = 'block'

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-v']    ['black-white']['animated']['front_shiny'];
        input.value ='';
        searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'not found';
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none'
    }
}






// evento de submit para o input, quando for enviado
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
})

// evento de click para os botões, quando for clicado
buttonPrev.addEventListener('click', () =>{
    if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

buttonNext.addEventListener('click', () =>{
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    
})
renderPokemon(searchPokemon);