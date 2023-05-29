import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
}

export interface GameResponse {
    count: number;
    results: Game[];
}

export const useGames = () => {
    const [error, setError] = useState("");
    const [games, setGames] = useState<Game[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<GameResponse>("/games", { signal: controller.signal })
            .then((res) => {
                setGames(res.data.results)
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) {
                    return;
                }

                setLoading(false);
                setError(err.message);
            });

        return () => controller.abort();
    }, []);

    return { games, error, isLoading }
}