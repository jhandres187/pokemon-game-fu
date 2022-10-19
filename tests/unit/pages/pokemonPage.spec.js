import { shallowMount, mount } from '@vue/test-utils'
import  PokemonPage  from "@/pages/PokemonPage";
import { pokemonsMock } from '../mocks/pokemons.mock';

describe('PokemonPage Component', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(PokemonPage)
    })
    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });
    test('debe de llamar el mixPokemonArray() al montar', () => {
        const mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray')
        shallowMount(PokemonPage)
        expect(mixPokemonArraySpy).toHaveBeenCalled()
    });
    test('debe de hacer match con el snapshot cuando cargan los pokemons', () => {
        const wrapper = shallowMount(PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemonsMock,
                    pokemon: pokemonsMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        expect(wrapper.html()).toMatchSnapshot()
    });
    test('debe de mostrar los componentes e pokemonPicture y pokemonOptions', () => {
        const wrapper = shallowMount(PokemonPage, {
            data(){
                return {
                    pokemonArr: pokemonsMock,
                    pokemon: pokemonsMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })
        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')
        expect(picture.exists()).toBe(true)
        expect(options.exists()).toBe(true)
        expect(picture.attributes('pokemonid')).toBe('1')
        expect(options.attributes('pokemons')).toBeTruthy()
        //pokemonPicture
        //pokemonOptions deben existir
        //pokemonPicture pokemonPicture attributes pokemonid == 1
        //pokemonsOptions attribute pokemons toBe true
    });
    test('pruebas con checkAnswer()', async() => {
        const wrapper = shallowMount(PokemonPage,{
            data(){
                return {
                    pokemonArr: pokemonsMock,
                    pokemon: pokemonsMock[1],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(2)
        // console.log(wrapper.find('h2').text())
        expect(wrapper.find('h2').exists()).toBe(true)
        expect(wrapper.vm.showPokemon).toBe(true)
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemonsMock[1].name}`)
        await wrapper.vm.checkAnswer(3)
        expect(wrapper.vm.message).toBe(`Oops era: ${pokemonsMock[1].name}`)
    });
});