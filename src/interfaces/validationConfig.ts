export interface ValidationConfig {
  [key: string]: {
    [key: string]: {
      [key: string]: string | number;
      message: string;
    };
  };
}
