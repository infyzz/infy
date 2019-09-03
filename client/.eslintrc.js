module.exports = {
    root: true,
    plugins: ['@typescript-eslint'],
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    extends: ['@nuxtjs'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        // 添加 vue 支持
        'eslint.validate': [
            'javascript',
            'javascriptreact',
            {
                language: 'vue',
                autoFix: true
            }
        ],
        overrides: [
            {
                files: ['*.vue'],
                rules: {
                    indent: 'off'
                }
            }
        ],
        indent: 'off',
        //属性两侧禁止空格
        'vue/html-indent': ['error', 4, { attribute: 1 }],
        'vue/script-indent': ['error', 4, { baseIndent: 1 }],
        //强制不使用分号结尾
        semi: ['error', 'always'],
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/html-quotes': ['error', 'double'],
        'vue/html-end-tags': ['error'],
        /*禁止在v-for中使用 v-if*/
        'vue/no-use-v-if-with-v-for': [
            'error',
            {
                allowUsingIterationVar: false
            }
        ],
        'vue/return-in-computed-property': [
            'error',
            {
                treatUndefinedAsUnspecified: false
            }
        ],
        'vue/attribute-hyphenation': [
            'error',
            'always',
            {
                ignore: []
            }
        ],
        'vue/component-name-in-template-casing': [
            'error',
            'kebab-case',
            {
                ignores: []
            }
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never'
            }
        ],
        'vue/html-closing-bracket-spacing': [
            'error',
            {
                startTag: 'never',
                endTag: 'never',
                selfClosingTag: 'always'
            }
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'never',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 3,
                multiline: {
                    max: 3,
                    allowFirstLine: true
                }
            }
        ],
        'vue/multiline-html-element-content-newline': [
            'error',
            {
                ignoreWhenEmpty: true,
                ignores: ['pre', 'textarea', 'div']
            }
        ],
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        'vue/name-property-casing': ['error', 'kebab-case'],
        'vue/no-template-shadow': ['error'],
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/require-default-prop': ['error'],
        'vue/v-bind-style': ['error', 'shorthand'],
        'vue/v-on-style': ['error', 'shorthand'],
        'vue/attributes-order': [
            'error',
            {
                order: [
                    'DEFINITION', // ex: 'is'
                    'LIST_RENDERING', // ex: 'v-for item in items'
                    'CONDITIONALS', //ex: 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
                    'RENDER_MODIFIERS', //ex: 'v-once', 'v-pre'
                    'GLOBAL', // ex: 'id'
                    'UNIQUE', //ex: 'ref', 'key', 'slot'
                    'TWO_WAY_BINDING', //ex: 'v-model'
                    'OTHER_DIRECTIVES', //ex: 'v-custom-directive'
                    'OTHER_ATTR', //ex: 'custom-prop="foo"', 'v-bind:prop="foo"', ':prop="foo"'
                    'EVENTS', //ex: '@click="functionCall"', 'v-on="event"'
                    'CONTENT' // ex: 'v-text', 'v-html'
                ]
            }
        ],
        'vue/order-in-components': [
            'error',
            {
                order: [
                    'el',
                    'name',
                    'parent',
                    'functional',
                    ['delimiters', 'comments'],
                    ['components', 'directives', 'filters'],
                    'extends',
                    'mixins',
                    'inheritAttrs',
                    'model',
                    ['props', 'propsData'],
                    'data',
                    'computed',
                    'watch',
                    'LIFECYCLE_HOOKS',
                    'methods',
                    ['template', 'render'],
                    'renderError'
                ]
            }
        ],
        'vue/this-in-template': ['error', 'never']
    }
}
