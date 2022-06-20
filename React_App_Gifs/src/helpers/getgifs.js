
const getGifs = async( categoria ) => {

    const url = `https://api.giphy.com/v1/gifs/search?q=${ encodeURI( categoria ) }&limit=10&api_key=MQa7zXrKEZ15mvl3a6fsjB1VUvvXH0PU`
    const res = await fetch(url)
    const {data} = await res.json();
    const gifs = data.map( img => {

        return {

            id: img.id,
            title: img.title,
            url: img.images?.downsized_medium.url

        }

    })

    return gifs;

}

export default getGifs;