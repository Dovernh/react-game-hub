import { CanceledError } from "axios";
import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

interface FetchResponse<T> {
    count: number;
    results: T[];
}

export const useData = <T>(endpoint: string) => {
    const [error, setError] = useState("");
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
            .then((res) => {
                setData(res.data.results)
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

    return { data, error, isLoading }
}