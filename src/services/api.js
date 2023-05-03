function throwErrorAlert() {
  const errorMessage = 'Falha na requisição da API. Recarregue a página.';
  alert(errorMessage);
  throw new Error(errorMessage);
}

export async function getCategories() {
  try {
    const API_URL = 'https://api.mercadolibre.com/sites/MLB/categories';
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    throwErrorAlert();
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query = '') {
  try {
    const API_URL = 'https://api.mercadolibre.com/sites/MLB/search?category=';
    const response = await fetch(`${API_URL}${categoryId}&q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throwErrorAlert();
  }
}

export async function getProductById(productId) {
  try {
    const API_URL = 'https://api.mercadolibre.com/items/';
    const response = await fetch(`${API_URL}${productId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throwErrorAlert();
  }
}
