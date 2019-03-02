import axios from "axios";
import { server } from '../../../server';

export const allPokemon = () => {
    return {
      type: 'ALL_POKEMONS',
      payload: axios({
                  method: 'GET',
                  url: `${server.url}/api/v1/pokemons`
               })
    }
}

export const createPokemon = (body) => {
    return {
      type: 'CREATE_POKEMON',
      payload: axios({
        method: 'POST',
        url: `${server.url}/api/v1/pokemons`,
        data: body
      })
    }
}

export const updatePokemon = (value) => {
    return {
      type: 'UPDATE_POKEMON',
      payload: axios({
        method: 'PATCH',
        url: `${server.url}/api/v1/pokemon/${value.id}`,
        data: value
      })
    }
}

export const deletePokemon = (value) => {
    return {
      type: 'DELETE_NOTE',
      payload: axios({
        method: 'DELETE',
        url: `${server.url}/api/v1/pokemon/${value.id}`
      }),
    }
  }
  