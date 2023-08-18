import process from "@/modules/process";
import window from "@/modules/window";
import type { App } from "vue";

const $process = {
    install: (app: App) => {
        app.provide('$process', process);
    }
};

const $window = {
    install: (app: App) => {
        app.provide('$window', window);
    }
};

export { $process, $window };