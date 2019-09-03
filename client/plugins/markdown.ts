import marked from 'marked'
import Prism from 'prismjs'

class MarkUtils {
    constructor() {
        this.render()
    }
    render() {
        const rendererMD = new marked.Renderer()
        rendererMD.heading = (text, level, raw) => {
            let title = ''
            let atrrText = text
                .replace(' ', '-')
                .replace(/[。？！，、；：“”【】.（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/g, '')
            title = `<h${level} class="toc-title" id=${atrrText}>${text}</h${level}>`
            return title
        }
        rendererMD.table = function(header, body) {
            return '<table class="table" border="0" cellspacing="0" cellpadding="0">' + header + body + '</table>'
        }
        rendererMD.code = function(code, lang) {
            const html = Prism.highlight(code, Prism.languages[lang], lang)
            return `<pre class='language-${lang} line-numbers'><code class='language-${lang}'>${html}</code></pre>`
        }
        marked.setOptions({
            renderer: rendererMD,
            headerIds: false,
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        })
    }
    async marked(data) {
        return data == null ? null : marked(data)
    }
}

export default new MarkUtils()
