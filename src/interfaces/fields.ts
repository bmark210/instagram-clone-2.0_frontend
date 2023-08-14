export interface Fields {
  image: {
    name: string;
    downloadURL: string;
    type: string;
  } | null;
  text: string;
  place: string;
}
