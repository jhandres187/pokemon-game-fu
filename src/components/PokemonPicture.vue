<template>
<div class="pokemon-container">
    <img v-if="!showPokemon"
        :src="imgSrc" 
        class="hidden-pokemon"
        alt="Pokemon"
    />
    <img v-else 
        :src="imgSrc" 
        class="fade-in"
        alt="Pokemon" 
    />
</div>
</template>
<script>
export default {
    props: {
        pokemonId: {
            type: Number,
            required: true
        },
        showPokemon:{
            type: Boolean,
            required: true,
            default: false
        }
    },
    computed: {
        imgSrc(){
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
        }
    }

}
</script>
<style scoped>
    /* Pokemon Picture */
    .pokemon-container {
        height: 300px;
    }
    img {
        height: 200px;
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translate(-50%, 50%);
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;
    }
    .hidden-pokemon {
        filter: brightness(0);
    }
</style>