export const BACKEND_HOST = 'localhost'
export const BACKEND_PORT = 4000
export const BACKEND_URL = `https://${BACKEND_HOST}:${BACKEND_PORT}`

export const API_GET_REQUEST_TOKEN = `${BACKEND_URL}/auth/token`
export const API_GET_PROTECTED_RESOURCE = `${BACKEND_URL}/api/protected-resource`
export const API_GET_ANOTHER_PROTECTED_RESOURCE = `${BACKEND_URL}/api/another-protected-resource`
