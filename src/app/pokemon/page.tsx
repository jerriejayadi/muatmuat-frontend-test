"use client";
import apiClient from "@/lib/apiClient";
import { useEffect, useState } from "react";

export interface PokemonApiProps {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export default function PokemonPage() {
  const [url, setURL] = useState<string>("https://pokeapi.com/api/v2/pokemon");
  const [pokemonList, setPokemonList] = useState<Pokemon[]>();
  const [nextURL, setNextURL] = useState<string | null>(null);
  const [prevURL, setPrevURL] = useState<string | null>(null);

  useEffect(() => {
    apiClient()
      .get(url)
      .then((res: PokemonApiProps) => {
        setPokemonList(res.results);
        setNextURL(res.next);
        setPrevURL(res.previous);
      });
  }, [url]);
  return (
    <div className="p-4 pb-28 md:p-8 md:pb-8">
      <div>
        <h1 className="text-2xl font-semibold">Pokemon</h1>
        <p className="text-base mt-1">List of Pokemon</p>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Pokemon Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {pokemonList?.map((rows, index) => (
              <tr key={`pokemon-${index}`}>
                <td>{rows.name}</td>
                <td>{rows.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 gap-4">
          <button
            disabled={prevURL === null}
            onClick={() => setURL(prevURL!)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Prev
          </button>
          <button
            disabled={nextURL === null}
            onClick={() => setURL(nextURL!)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
