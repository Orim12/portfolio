// Types voor de projects API
export interface Technologie {
    id: string;
    technologie: string;
}

export interface Afbeelding {
    id: string;
    alt: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    url: string;
    thumbnailURL: string | null;
    createdAt: string;
    updatedAt: string;
    cloudinaryUrl: string;
}

export interface Project {
    id: string;
    naam: string;
    createdAt: string;
    updatedAt: string;
    // Voeg hier eventueel meer velden toe die je project heeft
    beschrijving?: string;
    technologieen?: Technologie[];
    url?: string;
    afbeelding?: Afbeelding;
}

export interface PaginatedProjectsResponse {
    docs: Project[];
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface ApiError {
    message: string;
    status?: number;
}