"use strict";

const config = require('../config');

class CategoryHandler {

    generateCategoryURLs = () => {
        let categories = config.categories;
        let categoryURLs = [];

        for(let i = 0; i < categories.length; i++) {
            categoryURLs.push("https://www.lehrerbuero.de/grundschule/unterrichtsmaterialien/" + categories[i] + ".html");
        }

        return categoryURLs;
    }

    getItemsFromPage = async (page) => {

    }

    isLastPage = async (page) => {
        return false;
    }

    gotoNextPage = async (page) => {

    }

}

module.exports = CategoryHandler;