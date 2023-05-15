declare const __DEV__: boolean;

interface ImportMetaEnv {
  VITE_PUBLIC_PATH: string;
  VITE_JSON_SERVER_PATH: string;
  VITE_APP_NAME: string;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    MODE: 'development' | 'production' | 'staging' | 'test';
  }
}
