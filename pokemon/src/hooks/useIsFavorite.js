import { useEffect, useState } from "react";
import { isFavorite } from "../utils/PokemonStorage";

/**
 * @deprecated Use `FavoriteContext` instead.
 */
export default function useIsFavorite(pokemon){
    const [isFavoriteValue, setIsFavoriteValue ] = useState(false);

    const refetchIsFavorite = () =>{
      isFavorite(pokemon.name).then(res => setIsFavoriteValue(res))
    }

    useEffect(()=>{
      refetchIsFavorite();
    },[pokemon?.name])
  
    return [isFavoriteValue, setIsFavoriteValue, refetchIsFavorite];
}
