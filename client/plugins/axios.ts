export default ({ $axios, redirect, store }) => {
    $axios.defaults.baseURL = process.env.NUXT_ENV_BASE_URL;
    $axios.onRequest(config => {
        let { method, data } = config;
        if (method === "post" && store.state.token) {
            if (typeof data === "undefined") {
                config.data = {};
            }
            config.header.token = store.state.token;
        }
    });
    $axios.onResponse(response => {
        return response;
    });
    $axios.defaults.timeout = 15000;
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 500) {
            redirect("/404");
        }
    });
};
