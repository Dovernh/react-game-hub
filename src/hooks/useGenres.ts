import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Genre {
    id: number;
    name: string;
}

interface GenreResponse {
    count: number;
    results: Genre[];
}

export const useGenres = () => {
    const [error, setError] = useState("");
    const [genres, setGenres] = useState<Genre[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<GenreResponse>("/genres", { signal: controller.signal })
            .then((res) => {
                setGenres(res.data.results)
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

    return { genres, error, isLoading }
}