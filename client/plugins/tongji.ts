if (process.env.NODE_ENV === 'production') {
    var _hmt = _hmt || []
    ;(function() {
        var hm = document.createElement('script')
        hm.src = 'https://hm.baidu.com/hm.js?ce2ef151bc2d4b45d85097a385ea2f1e'
        hm.id = 'baidu_tj'
        var s = document.getElementsByTagName('script')[0]
        // @ts-ignore
        s.parentNode.insertBefore(hm, s)
    })()
}

export default ({ app: { router } }) => {
    if (process.env.NODE_ENV === 'production') {
        router.afterEach((to, from) => {
            var _hmt = _hmt || [];
            (function() {
                const baiduTjObj = document.getElementById('baidu_tj')
                baiduTjObj !== null && baiduTjObj.remove()
                var hm = document.createElement('script')
                hm.src = 'https://hm.baidu.com/hm.js?ce2ef151bc2d4b45d85097a385ea2f1e'
                hm.id = 'baidu_tj'
                const s = document.getElementsByTagName('script')[0]
                //@ts-ignore
                s.parentNode.insertBefore(hm, s)
            })()
        })
    }
}
