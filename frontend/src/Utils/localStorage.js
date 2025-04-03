// add product to a local storage

export const addToFavoriteToLocalStorage = (product) =>{
    const favorites = getFavoritesFromLocalStorage();
    if(!favorites.some((p) => p._id === product._id)){
        favorites.push(product);
        localStorage.setItem('favorites',JSON.stringify(favorites));
    }
};
// remove the product from the local storage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter((product) => product._id !==productId);
    localStorage.setItem('favorites',JSON.stringify(updateFavorites))
};
// retrive the favorite from local storage

export const getFavoritesFromLocalStorage = () =>{
    const favoriteJSON = localStorage.getItem('favorites');
    return favoriteJSON ? JSON.parse(favoriteJSON) : [];
};