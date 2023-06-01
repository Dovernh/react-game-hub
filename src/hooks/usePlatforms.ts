import platforms from "../data/platform";

export interface Platform {
    id: number;
    name: string;
    slug: string;
}

export const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });