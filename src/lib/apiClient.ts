export default function apiClient() {
  return {
    get: async (url: string) => {
      const response = await fetch(url);
      return response.json();
    },
  };
}
