// src/global.d.ts
declare module '*.scss';
declare module '*.css';
declare module '*.svg';
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}
