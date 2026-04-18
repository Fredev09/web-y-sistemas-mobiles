// 1. Referencias al DOM
const boton = document.getElementById('btn-cargar');
const contenedor = document.getElementById('pokemon-container');
const buscador = document.getElementById('buscador');

// 2. Variable para guardar la lista completa
let listaPokemon = [];

// 3. Función para obtener datos
const obtenerPokemon = () => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100')
        .then(respuesta => respuesta.json())
        .then(datos => {
            listaPokemon = datos.results; // guardamos todos
            renderizarCards(listaPokemon);
        })
        .catch(error => console.error("Hubo un error:", error));
};

// 4. Función para renderizar
const renderizarCards = (lista) => {
    contenedor.innerHTML = '';

    lista.forEach((pokemon, index) => {
        const id = index + 1;
        const imagenUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

        const html = `
            <div class="col">
                <div class="card h-100 shadow-sm text-center">
                    <img src="${imagenUrl}" class="card-img-top p-3" alt="${pokemon.name}" style="background-color: #f8f9fa;">

                    <div class="card-body">
                        <h5 class="card-title text-capitalize">#${id} ${pokemon.name}</h5>
                        <p class="text-muted small">Haz clic para ver detalles</p>
                    </div>
                </div>
            </div>
        `;

        contenedor.innerHTML += html;
    });
};

// 5. Evento del buscador
buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase().trim();

    const filtrados = listaPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(texto)
    );

    renderizarCards(filtrados);
});

// 6. Evento del botón
boton.addEventListener('click', obtenerPokemon);