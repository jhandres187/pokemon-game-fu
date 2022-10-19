import pokemonApi from "@/api/pokemonApi"
export const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) ) //crea un array de un array de 650 elementos vacios
    return pokemonsArr.map( (_, index) => index + 1) //a cada espacio del array le agrega el valor del index + 1
}

const getPokemonOptions = async() => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 ) //genera valores positivos y negativos de esta manera se puede mezclar el array
    const pokemons = await getPokemonNames( mixedPokemons.splice(0,4)) //corta el array desde la posicion x hasta la posicion y
    return pokemons
}

export const getPokemonNames = async([a,b,c,d] = [] ) => {
    // const resp = pokemonApi.get('/1')
    // console.log((await resp.data.name))
    const promiseArr = [
        pokemonApi.get(`${a}`),
        pokemonApi.get(`${b}`),
        pokemonApi.get(`${c}`),
        pokemonApi.get(`${d}`)
    ]
    const [p1, p2, p3, p4] = await Promise.all(promiseArr)
    return [
        {name: p1.data.name, id: p1.data.id},
        {name: p2.data.name, id: p2.data.id},
        {name: p3.data.name, id: p3.data.id},
        {name: p4.data.name, id: p4.data.id}
    ]
}

export default getPokemonOptions;