let BASE_URL = ""

if (import.meta.env.DEV) {
  BASE_URL = "http://codercba.com:5000"
} else {
  BASE_URL = "http://127.0.0.1:8000/api/"
}

export const TIME_OUT = 5000
export { BASE_URL }
