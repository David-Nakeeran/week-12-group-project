const apiKey = process.env.API_KEY;
const baseUrl = process.env.API_BASE_URL;

export default async function fetchFromAPI(query = "") {
  const url = `${baseUrl}/games?key=${apiKey}${query ? `&${query}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.error(message);
  }
}

export async function fetchGenresFromAPI() {
  const url = `${baseUrl}/genres?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.error(message);
  }
}

export async function fetchPlatformsFromAPI() {
  const url = `${baseUrl}/platforms/lists/parents?key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.error(message);
  }
}
