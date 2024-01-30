import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    // localhost:3000/pokemon?weapon=Water will come at this point
    @Get()
    getPokemons(@Query('weapon') weapon: 'Electric' | 'Fire') {
        return this.pokemonService.getPokemons(weapon);
    }

    // localhost:3000/pokemon/1 will come at this point
    @Get(':id')
    getOnePokemon(@Param('id') id: string) {
        //Param will take "id" from get request url
        try {
            return this.pokemonService.getPokemon(+id); // + is typcasting it
        } catch (error) {
            throw new NotFoundException();
        }
    }

    // localhost:3000/pokemon "POST"
    @Post()
    createPokemon(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.createPokemon(createPokemonDto);
    }

    @Put(':id')
    updatePokemon(
        @Param('id') id: string,
        @Body() updatePokemonDto: UpdatePokemonDto,
    ) {
        return this.pokemonService.updatePokemon(+id, updatePokemonDto);
    }

    @Delete(':id')
    removePokemon(@Param('id') id: string) {
        return this.pokemonService.removePokemon(+id);
    }
}
