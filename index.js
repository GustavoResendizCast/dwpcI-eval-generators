const superHeroTeams = [
  {
    name: 'Dream Team',
    heroes: [
      {
        id: '1',
        name: 'Superman',
        superPowers: ['speed', 'x-ray vision', 'flying'],
      },
      {
        id: '2',
        name: 'Spieder-Man',
        superPowers: ['spieder sense'],
      },
      {
        id: '3',
        name: 'Batman',
        superPowers: ['money', 'immortality'],
      },
      {
        id: '4',
        name: 'Ivan',
        superPowers: ['Javascript'],
      },
    ],
  },
  {
    name: 'Dream Agent Team',
    heroes: [
      {
        id: '1',
        name: 'James Bond',
        superPowers: ['sexy', 'xharming', 'agility'],
      },
      {
        id: '2',
        name: 'Json Bourne',
        superPowers: ['losing memory'],
      },
      {
        id: '3',
        name: 'Jack Bauer',
        superPowers: ['punctuality'],
      },
    ],
  },
];

// Función que itera sobre los poderes
function* iteratePowers(superPowers) { 
  for (let i = 0; i < superPowers.length; i++) { 
    const superPower = superPowers[i]; 
    yield superPower; 
  }
}

// Función que itera sobre heroes
function* iterateSuperHeores(superHeores) {
  // Iterar sobre el arreglo de superhéroes
  for (let i = 0; i < superHeores.length; i++) {
    // Obtener el objeto que representa al superhéroe actual
    const superHeore = superHeores[i];
    // Crear un objeto que contendrá el nombre del superhéroe y un generador para sus superpoderes
    // El generador se obtiene llamando a la función iteratePowers con el arreglo de superpoderes del superhéroe
    yield { name: superHeore.name, powers: iteratePowers(superHeore.superPowers) };
  }
}


// Función que itera sobre los Equipos
function* iterateTeams(superHeoresTeams) {
  for (let i = 0; i < superHeoresTeams.length; i++) {
    const superHeoresTeam = superHeoresTeams[i];
    yield* iterateSuperHeores(superHeoresTeam.heroes);
  }
}

const generatorObject = iterateTeams(superHeroTeams);

// Obteniendo el primer resultado
let result = generatorObject.next();

// Datos de busqueda
const superPowerWanted = "immortality"
let counter = 0;

// Ciclo para buscar el superpoder "immortality" en todos los superhéroes
while (!result.done) {
  // Obtener el objeto que representa al superhéroe actual
  const superPower = result.value;
  // Incrementar el contador de comparaciones
  counter++;
  // Iterar sobre los superpoderes del superhéroe actual
  for(let power of superPower.powers){
    // Si se encuentra el superpoder buscado, imprimir un mensaje y salir del ciclo
    if(power === superPowerWanted){
      console.log(`El super poder de ${superPowerWanted} le pertenece a ${superPower.name}`)
      break;
    }
  }
  // Obtener el siguiente objeto de superhéroe y superpoderes
  result = generatorObject.next();
}

// Imprimir la cantidad de comparaciones que se hicieron
console.log(`El sistema realizo ${counter} comparaciones en el conjunto de datos`);
