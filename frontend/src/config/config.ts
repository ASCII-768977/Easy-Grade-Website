let baseUrl: string;

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:8000';
} else {
  baseUrl = 'https://api.easy-grade.com';
}

export default baseUrl;
