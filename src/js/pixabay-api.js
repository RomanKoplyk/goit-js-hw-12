import axios from "axios";

const API_KEY = "55677845-05ff8047ada01a07b33efb575";
const BASE_URL = "https://pixabay.com/api/";

export async function getImagesByQuery(query, page = 1) {
    const searchParams = {
        key: API_KEY,
        q: query,
        image_type: `photo`,
        orientation: `horizontal`,
        safesearch: `true`,
        page: page,
        per_page: 15,
    };

    const response = await axios.get(BASE_URL, { params: searchParams });
    return response.data;
}

//     return axios.get(`${BASE_URL}?${searchParams}`)
//         .then(response => {
//             return response.data;
//         })
//         .catch(error => {
//             console.error("Sorry, there are no images matching your search query. Please, try again!", error);
//             throw error;
//         });
// }
