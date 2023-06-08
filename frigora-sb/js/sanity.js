const SANITY_QUERY = encodeURIComponent(
`*[_type == "pages" && id == "main"][0]{
    ...,
    packages[]->,
    testimonials[]->,  
    arrangements[]->{..., "songs": songs[]{title,artist,"url":audioFile.asset->url, "videoUrl":link, isAudioOnly}},
    vocalists[]->{..., "image":image.asset->, "songs": songs[]{title,artist,"url":audioFile.asset->url}},
}`)
const SANITY_API_ENDPOINT = `https://y5r9a40r.api.sanity.io/v2021-10-21/data/query/production?query=${SANITY_QUERY}`