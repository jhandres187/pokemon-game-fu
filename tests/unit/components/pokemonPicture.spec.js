import {shallowMount} from '@vue/test-utils'
import PokemonPicture from '@/components/pokemonPicture'
describe('PokemonPicture component', () => {
    test('debe hacer match con el snapshot', () => {
        const wrapper = shallowMount(PokemonPicture, {
            props: {
                pokemonId : 1,
                showPokemon: false
            }
        }) //montar el pokemon picture con las properties que necesita
        expect(wrapper.html).toMatchSnapshot()

    })
    test('debe de mostar la imagen oculta y el pokemon 100', () => {
        const wrapper = shallowMount(PokemonPicture,{
            props:{
                pokemonId: 100,
                showPokemon: false
            }
        })
        const [img1, img2] = wrapper.findAll('img')//buscamos en el componente las dos imagenes y las desestructuramos
        expect(img1.exists()).toBeTruthy()//esperamos que la img1 exista
        expect(img2).toBe(undefined)//y esperamos que la imagen dos no exista que es la de el pokemon
        expect(img1.classes('hidden-pokemon')).toBeTruthy()//evalumos las clase hidden-pokemon

        //evaluar que el pokemon sea el 100 
        expect(img1.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
    })
    test('debe de mostar el pokemon si showcomponent:true', () => {
        const wrapper = shallowMount(PokemonPicture,{
            props:{
                pokemonId: 100,
                showPokemon: true
            }
        })
        const img1 = wrapper.find('img')//buscamos en el componente las dos imagenes y las desestructuramos
        expect(img1.exists()).toBeTruthy()//esperamos que la img1 exista
        expect(img1.classes('hidden-pokemon')).toBe(false)//evalumos las clase hidden-pokemon no deberia de tenerla
        expect(img1.classes('fade-in')).toBe(true)
    })
})
