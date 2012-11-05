module Toast {
    export interface Options {
        width?: string;
        displayDuration?: number;
        fadeOutDuration?: number;
    }
    export var defaults: Options;
    export function info(message: string, title?: string, options?: Options): void;
    export function warning(message: string, title?: string, options?: Options): void;
    export function error(message: string, title?: string, options?: Options): void;
    export function success(message: string, title?: string, options?: Options): void;
}
