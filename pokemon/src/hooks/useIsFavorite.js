import { useEffect, useState } from "react";
import { isFavorite } from "../utils/PokemonStorage";


export default function useIsFavorite(pokemon){
    const [isFavoriteValue, setIsFavoriteValue ] = useState(false);

    useEffect(()=>{
      isFavorite(pokemon.name).then(res => setIsFavoriteValue(res))
    },[pokemon?.name])
  
    return [isFavoriteValue, setIsFavoriteValue ];
}
