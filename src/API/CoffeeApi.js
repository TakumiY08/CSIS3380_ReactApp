import { URL } from "../utilities/url";

export async function fetchCoffees() {
  try {
    const response = await fetch(URL + "/coffee/");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    return [];
  }
}

export async function fetchCoffee(id) {
  try {
    const response = await fetch(URL + `/coffee/${id}`);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching coffee data:", error);
    return null;
  }
}
