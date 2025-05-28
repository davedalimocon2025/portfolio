// src/custom-typings.d.ts or src/images.d.ts

declare module '*.svg' {
    const content: string;
    export default content;
  }
  
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.gif' {
    const content: string;
    export default content;
  }
  
  declare module '*.bmp' {
    const content: string;
    export default content;
  }
  
  declare module '*.tiff' {
    const content: string;
    export default content;
  }
  
  // Add any other file types you might want to import directly
  // declare module '*.mp3' {
  //   const content: string;
  //   export default content;
  // }
  // declare module '*.pdf' {
  //   const content: string;
  //   export default content;
  // }