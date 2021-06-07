declare module 'ya-zip' {
  import { ZlibOptions } from 'zlib';
  /** See [node-archive ZipOptions](https://archiverjs.com/docs/global.html#ZipOptions) */
  interface Options {
    /** Sets the zip archive comment. */
    comment?: string;
    /** Forces the archive to contain local file times instead of UTC. */
    forceLocalTime?: boolean;
    /** Forces the archive to contain ZIP64 headers. */
    forceZip64?: boolean;
    /** Sets the compression method to STORE. */
    store?: boolean;
    /** Passed to [zlib](https://nodejs.org/api/zlib.html#zlib_class_options) to control compression. */
    zlib?: ZlibOptions;
  }
  /**
   * Zip a file or a directory.
   */
  export function zip(
    source: string,
    destination: string,
    callback: () => void
  ): void;
  export function zip(
    source: string,
    destination: string,
    options: Options,
    callback: () => void
  ): void;
  /**
   * Promisified `zip`.
   */
  export function zipAsync(
    source: string,
    destination: string,
    options?: Options
  ): Promise<void>;
  /**
   * Synchronous `zip`.
   */
  export function zipSync(
    source: string,
    destination: string,
    options?: Options
  ): void;
}
