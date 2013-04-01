module Toast {
    interface Options {
        width?: string;
        displayDuration?: number;
        fadeOutDuration?: number;
    }
    var defaults: Options;
    function info(message: string, title?: string, options?: Options): void;
    function warning(message: string, title?: string, options?: Options): void;
    function error(message: string, title?: string, options?: Options): void;
    function success(message: string, title?: string, options?: Options): void;
}
