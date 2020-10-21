var request = require("request");

const api = process.env.REACT_APP_SPOONACULAR_API;
const apikey = process.env.REACT_APP_SPOONACULAR_APIKEY;

export const getRecipesSearch = (entity) => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: `${api}/recipes/search`,
            qs:
            {
                query: entity.searchexpression,
                diet: entity.diets,
                apiKey: apikey
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(new Error(error))
            } else {
                let dataj = JSON.parse(body)
                let data = []

                for (let i of dataj.results) {
                    data.push({ id: i.id, title: i.title, image: `https://spoonacular.com/recipeImages/${i.id}-556x370.jpg`, readyInMinutes: i.readyInMinutes, servings: i.servings, sourceUrl: i.sourceUrl })
                }

                resolve(data)
            };
        });

    })

}

export const getRecipesDetails = (id) => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: `${api}/recipes/${id}/information`,
            qs:
            {
                includeNutrition: 'false',
                apiKey: apikey
            }
        };

        var optionssimilar = {
            method: 'GET',
            url: `${api}/recipes/${id}/similar`,
            qs:
            {
                number: '3',
                apiKey: apikey
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(new Error(error))
            } else {

                let data = []
                let informations = JSON.parse(body)

                request(optionssimilar, function (error2, response2, body2) {

                    if (error2) {
                        reject(new Error(error2))
                    } else {
                        let dataj = JSON.parse(body2)
                        let datasimilars = []

                        for (let i of dataj) {
                            datasimilars.push({ id: i.id, title: i.title, image: `https://spoonacular.com/recipeImages/${i.id}-556x370.jpg`, readyInMinutes: i.readyInMinutes, servings: i.servings, sourceUrl: i.sourceUrl })
                        }

                        data.push({ informations: informations, similar: datasimilars })

                        resolve(data)
                    };
                });
            };
        });

    })


}

export const getRecipesRandom = () => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: `${api}/recipes/random`,
            qs:
            {
                number: '6',
                apiKey: apikey
            }
        };

        request(options, function (error, response, body) {
            if (error) {
                reject(new Error(error))
            } else {
                let dataj = JSON.parse(body)
                let data = []

                for (let i of dataj.recipes) {
                    data.push({ id: i.id, title: i.title, image: i.image, readyInMinutes: i.readyInMinutes, servings: i.servings, sourceUrl: i.sourceUrl })
                }

                resolve(data)
            };
        });

    })
}



