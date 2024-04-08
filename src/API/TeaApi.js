import { URL } from "../utilities/url";

export async function fetchTeas() {
    try {
      const response = await fetch(URL + "/tea/");
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching tea data:", error);
      return [];
    }
  }
  
  export async function fetchTea(id) {
    try {
      const response = await fetch(URL + `/tea/${id}`);
      console.log("Response", response)
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error("Error fetching tea data:", error);
      return null;
    }
  }
  