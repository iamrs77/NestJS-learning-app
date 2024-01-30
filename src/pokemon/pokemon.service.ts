import { Injectable } from '@nestjs/common';

@Injectable() // using this we can inject it in controller and we dont have to instantiate, nest will do it automatically
export class PokemonService {
    private pokemons = [
        { id: 1, name: "Pikachu", weapon: "Electric" },
        { id: 2, name: "Charizard", weapon: "Fire" },
        { id: 3, name: "Bulbasaur", weapon: "Water" },
    ];

    getPokemons(weapon?: 'Electric' | 'Fire') {
        if(weapon) {
            return this.pokemons.filter((pokemon) => pokemon.weapon ===  weapon);
        }

        return this.pokemons;
    }
}
