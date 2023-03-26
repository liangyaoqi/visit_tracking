import axios from 'axios'
// let baseURL = ''
// if (process.env.NODE_ENV === 'development') {
//     baseURL = 'http://localhost:8081';
// } else if (process.env.NODE_ENV === 'debug') {
//     baseURL = 'https://www.ceshi.com';
// } else if (process.env.NODE_ENV === 'production') {
//     baseURL = 'https://www.production.com';
// }

const service = axios.create({
    // baseURL: baseURL,
    timeout: 30000 // 设置请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在请求发送之前做一些处理
        if (!(config.headers['Content-Type'])) {
            //  更改加载状态，设置加载画面
            if (config.method === 'post') {
                config.headers['Content-Type'] =
                    'application/json;charset=UTF-8'
                for (const key in config.data) {
                    if (config.data[key] === '') {
                        delete config.data[key]
                    }
                }
                config.data = JSON.stringify(config.data)
            } else {
                config.headers['Content-Type'] =
                    'application/x-www-form-urlencoded;charset=UTF-8'
                // console.log(config.params)
            }
        }
        // 获取本地的token
        const token = localStorage.getItem("token");
        // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        if (token) {
            config.headers['Authorization'] = token;
        } else {
            window.location.hash="/login"
        }
        return config;
    },
    (error) => {
        // 发送失败
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {

        // dataAxios 是 axios 返回数据中的 data
        // loadingInstance.close();
        const dataAxios = response.data
        // 这个状态码是和后端约定的

        return dataAxios
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service
