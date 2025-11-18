export interface IComponent {
  userId: string;
  name: string;
  preview: string;
  files: IComponentFile[];
}

export interface IComponentFile {
  name: string;
  language: string;
  code: string;
}

export interface IComponentPayload {
  name: string;
  preview: File;
  files?: IComponentFile[];
}

export interface IComponentUpdatePayload {
  name: string;
  preview?: File;
  files?: IComponentFile[];
}

export interface IComponentResponse {
  _id: string;
  userId: string;
  name: string;
  preview: string;
  files: IComponentFile[];
  createdAt: string;
  updatedAt: string;
}
