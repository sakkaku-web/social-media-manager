export interface ReferenceImage {
  link: string;
  image: string;
}

export enum Status {
  LOADING,
  LOADED,
  FINISHED,
  ERROR,
}
