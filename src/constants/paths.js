export const TDL_API_URL = import.meta.env.VITE_TDL_API_URL 
export const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE
export const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN
export const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID
// export const IS_PROD = import.meta.env.PROD
export const IS_PROD = import.meta.env.VITE_ENVIRONMENT === 'production' ? true : false
// export const IS_DEV = import.meta.env.DEV
export const IS_DEV = import.meta.env.VITE_ENVIRONMENT === 'development' ? true : false
export const IS_LOCAL = import.meta.env.VITE_ENVIRONMENT === 'local' ? true : false
export const ENVIRONMENT = import.meta.env.MODE
