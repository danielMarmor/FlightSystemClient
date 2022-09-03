import React from 'react'
import { endpoints, images } from '../constants/configuration'
import axios from 'axios'

export const GenerateProfilePhoto = async (search) => {
    try {
        const portraitsCollectionUrl = `${endpoints.profileImages.baseUrl}&client_id=${endpoints.profileImages.apiKey}&query=${search}`;
        const response = await axios.get(portraitsCollectionUrl);
        const data = await response.data;
        // const results = data.results;
        // if (results.length === 0) {
        //     console.log('No results for profile image');
        //     return images.personImageDeafultURL;
        // }
        //const result = results[0];
        const imageUrl = data.urls.full;
        return imageUrl;
    }
    catch (err) {
        console.log(err);
        return images.personImageDeafultURL;
    }
}


