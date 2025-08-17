export interface IComponent {
    userId: string;
    name: string;
    preview: string;
    url: string;
}

export interface IComponentPayload {
    name: string;
    preview: File;
    url: string;
}

export interface IComponentUpdatePayload {
    name: string;
    preview?: File;
    url: string;
}

export interface IComponentResponse {
    _id: string;
    userId: string;
    name: string;
    preview: string;
    url: string;
    createdAt: string;
    updatedAt: string;
}

