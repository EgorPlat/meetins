import axios from "axios";

const optionsForListMusic = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
    params: {
      key: '484129036',
      locale: 'en-US'
    },
    headers: {
      'X-RapidAPI-Key': 'd7bc9be9acmsh2997873591b7afep1043d1jsna69342812976',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
};

const options = {
    headers: {
      'X-RapidAPI-Key': 'd7bc9be9acmsh2997873591b7afep1043d1jsna69342812976',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
};

export const getListOfMusic = () => {
    try {
        axios.get('https://deezerdevs-deezer.p.rapidapi.com/infos', options).then(response => {
            console.log(response.data);
        })
    } catch (error) {
        console.error(error);
    }
}