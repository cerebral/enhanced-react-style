type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

declare module 'react' {
  interface CSSProperties {
    '&'?: {
      [selector: string]: Omit<CSSProperties, '&'>;
    };
  }
}
