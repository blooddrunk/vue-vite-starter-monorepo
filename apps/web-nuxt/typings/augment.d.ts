declare const __DEV__: boolean;

declare namespace NodeJS {
  export interface ProcessEnv {
    NUXT_PUBLIC_PATH: string;
    NUXT_JSON_SERVER_PATH: string;
    NUXT_APP_NAME: string;
  }
}

declare module '#app' {
  interface PageMeta {
    layout?:
      | 'default'
      | 'error'
      | 'empty'
      | 'sidebar'
      | 'navbar'
      | 'tabbar'
      | 'tabbar-navbar';
    requiresAuth?: boolean;
    title?: string;
    canNavBack?: boolean;
    keepAlive?: boolean;
    openInTab?: boolean;
  }
}
