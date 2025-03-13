/**
 * Juxtapose Embedder - Embed your juxtapose slider anywhere
 * 
 * Usage:
 * 1. Host this file and your juxtapose files on a server
 * 2. Add this script to your page: <script src="path/to/embedder.js"></script>
 * 3. Add a div with class "juxtapose-embed" and data attributes:
 *    <div class="juxtapose-embed" 
 *         data-before="path/to/before.jpg" 
 *         data-after="path/to/after.jpg"
 *         data-before-label="Before" 
 *         data-after-label="After"></div>
 */

(function () {
    // Base URL where your files are hosted (change this to your server URL)
    const BASE_URL = document.currentScript.src.replace('embedder.js', '');

    // Load CSS
    function loadCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = BASE_URL + 'juxtapose_modified.css';
        document.head.appendChild(link);
    }

    // Create iframes for each juxtapose-embed div
    function createEmbeds() {
        const embeds = document.querySelectorAll('.juxtapose-embed');

        embeds.forEach((embed, index) => {
            const beforeImg = embed.getAttribute('data-before') || 'before.jpg';
            const afterImg = embed.getAttribute('data-after') || 'after.jpg';
            const beforeLabel = embed.getAttribute('data-before-label') || 'Before';
            const afterLabel = embed.getAttribute('data-after-label') || 'After';
            const width = embed.getAttribute('data-width') || '100%';
            const height = embed.getAttribute('data-height') || '360px';

            // Create iframe HTML
            const iframe = document.createElement('iframe');
            iframe.frameBorder = '0';
            iframe.className = 'juxtapose';
            iframe.style.width = width;
            iframe.style.height = height;
            iframe.style.border = '0';

            // Set unique ID for this embed
            const embedId = 'juxtapose-embed-' + index;
            embed.id = embedId;

            // Create dynamic embed HTML
            const embedHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Juxtapose Embed</title>
                <link rel="stylesheet" href="${BASE_URL}juxtapose_modified.css">
                <style>
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    .juxtapose {
                        width: 100%;
                        height: 100%;
                    }
                    .juxtapose img {
                        max-width: 100%;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <div class="juxtapose">
                    <img src="${beforeImg}" data-label="${beforeLabel}" alt="${beforeLabel}">
                    <img src="${afterImg}" data-label="${afterLabel}" alt="${afterLabel}">
                </div>
                <script src="${BASE_URL}juxtapose_modified.js"></script>
            </body>
            </html>`;

            // Set iframe content
            embed.innerHTML = '';
            embed.appendChild(iframe);

            setTimeout(() => {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                doc.open();
                doc.write(embedHTML);
                doc.close();
            }, 100);
        });
    }

    // Initialize
    function init() {
        loadCSS();

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createEmbeds);
        } else {
            createEmbeds();
        }
    }

    init();
})(); 