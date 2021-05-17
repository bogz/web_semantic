module.exports = {
    genres: [
        { id: 1, name: "Rock" },
        { id: 2, name: "Pop" },
        { id: 3, name: "Dance" },
    ],
    songs: [
        {id: 1, name: "My Guitar Gently Weeps", artist: "The Beatles", duration: 3, isHit: true, isSingle: true, photo: "/images/my_guitar.jpg", genre_id: 1},
        {id: 2, name: "Nothing Else Matters", artist: "Metallica", duration: 5, isHit: true, isSingle: false, photo: "/images/nothing_else.jpg",genre_id: 1},
        {id: 3, name: "Oops, I did it again", artist: "Britney Spears", duration: 4, isHit: true, isSingle: false, photo: "/images/oops.jpg", genre_id: 2},
        {id: 4, name: "Memories", artist: "Maroon 5", duration: 3, isHit: false, isSingle: true, photo: "/images/maroon5.jpg", genre_id: 2},
        {id: 5, name: "Coco Jambo", artist: "Mr. President", duration: 4, isHit: true, isSingle: true, photo: "/images/coco.jpg", genre_id: 3},
        {id: 6, name: "Boom Boom Boom", artist: "Vengaboys", duration: 5, isHit: false, isSingle: false, photo: "/images/boom.jpg", genre_id: 3},
    ]
}