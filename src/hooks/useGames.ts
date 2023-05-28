import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Game {
    id: number;
    name: string;
}

export interface GameResponse {
    count: number;
    results: Game[];
}

export const useGames = () => {
    const [error, setError] = useState("");
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        const controller = new AbortController();

        apiClient
            .get<GameResponse>("/games", { signal: controller.signal })
            .then((res) => setGames(res.data.results))
            .catch((err) => {
                if (err instanceof CanceledError) {
                    return;
                }

                setError(err.message);
            });

        return () => controller.abort();
    }, []);

    return { games, error }
}