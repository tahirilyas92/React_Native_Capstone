const API_URL =
  "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export const fetchData = async () => {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json.menu.map((menu) => ({
      name: menu.name,
      price: menu.price,
      description: menu.description,
      image: menu.image,
      category: menu.category,
    }));
  } catch (error) {
    return [];
  }
};
