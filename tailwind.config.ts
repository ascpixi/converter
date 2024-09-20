import type { Config } from "tailwindcss";
import primeui from "tailwindcss-primeui";

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,vue}",
    ],
    theme: {
        extend: {},
        fontFamily: {
            "mono": ["JetBrains Mono", "Cascadia Mono", "Cascadia Code", "Consolas", "monospace"]
        }
    },
    plugins: [primeui],
} satisfies Config;