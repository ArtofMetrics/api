/**
 * Useful in configuring environments on the client-side
 */
declare var app: {
  environment: string
};

/**
 * Prevents typescript from throwing errors when webpack
 * goes through `require` dependency graphs to import html and css
 */
declare function require(id: string): any;