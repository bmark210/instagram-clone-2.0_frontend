export interface Image {
  downloadURL: string;
  type: string;
  name: string;
}

export interface Avatar {
  data: Image | null;
  status: string;
  error?: string;
}
