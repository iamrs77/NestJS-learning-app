import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable() // using this we can inject it in controller and we dont have to instantiate, nest will do it automatically
export class PokemonService {
    private pokemons = [
        { id: 1, name: 'Pikachu', weapon: 'Electric' },
        { id: 2, name: 'Charizard', weapon: 'Fire' },
        { id: 3, name: 'Bulbasaur', weapon: 'Water' },
    ];

    getPokemons(weapon?: 'Electric' | 'Fire') {
        if (weapon) {
            return this.pokemons.filter((pokemon) => pokemon.weapon === weapon);
        }

        return this.pokemons;
    }

    getPokemon(id: number) {
        const pokemon = this.pokemons.find((pokemon) => pokemon.id === id);
        if (!pokemon) {
            throw new Error('Pokemon not found');
        }
        return pokemon;
    }

    createPokemon(createPokemonDto: CreatePokemonDto) {
        const newPokemon = {
            ...createPokemonDto,
            id: Date.now(),
        };
        this.pokemons.push(newPokemon);

        return newPokemon;
    }

    updatePokemon(id: number, updatePokemonDto: UpdatePokemonDto) {
        this.pokemons = this.pokemons.map((pokemon) => {
            if (pokemon.id === id) {
                return { ...pokemon, ...updatePokemonDto };
            }

            return pokemon;
        });
        return this.getPokemon(id);
    }

    removePokemon(id: number) {
        const toBeRemoved = this.getPokemon(id);
        this.pokemons = this.pokemons.filter((pokemon) => pokemon.id != id);
        return toBeRemoved;
    }
}
