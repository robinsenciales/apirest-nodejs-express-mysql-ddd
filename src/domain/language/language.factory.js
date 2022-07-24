import sanitizeHtml from 'sanitize-html'

export default function LanguageFactory() {
    return Object.freeze({
        createFrom: ({name, programmers} = {}) => {
            if (!name) {
                throw new Error('Language must have an name.')
            }
            if (!programmers) {
                throw new Error('Language must have an programmers.')
            }

            let sanitizedName = sanitize(name).trim();
            if (sanitizedName.length < 1) {
                throw new Error('Language contains no usable name.')
            }

            return Object.freeze({
                getName: () => sanitizedName,
                getProgrammers: () => programmers
            });
        }
    })

    function sanitize(text) {
        // TODO: allow more coding embeds
        return sanitizeHtml(text, {
            allowedIframeHostnames: []
        })
    }
}
