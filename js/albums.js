// Klass för album som går att köpa
// Skillnad på class och object är att klasser är FASTA och inte object.

class Album {
    constructor(id, name, image, price) {
        this.id = id
        this.name = name
        this.image = image
        this.price = price
    }
}

let data = [
    new Album(
        'one',
        "Revival 2017",
        "img/2021-10-23-152138.png",
        129
    ),
    new Album(
        'two',
        "Relapse 2009",
        "img/2021-10-23-152109.png",
        129
    ),
    new Album(
        'three',
        "Kamikaze 2018",
        "img/2021-10-23-152019.png",
        129
    ),
    new Album(
        'four',
        "Encore 2004",
        "img/2021-10-23-151952.png",
        129
    ),
    new Album(
        'five',
        "Curtain Call 2005",
        "img/2021-10-23-151924.png",
        129
    ),
    new Album(
        'six',
        "The Eminem Show 2002",
        "img/2021-10-23-151843.png",
        129
    ),
    new Album(
        'seven',
        "Recovery 2010",
        "img/2021-10-23-151722.png",
        129
    ),
    new Album(
        'eight',
        "Music To Be Murdered By 2020",
        "img/2021-10-23-152045.png",
        129
    ),
    new Album(
        'nine',
        "The Marshall Mathers LP 2000",
        "img/2021-10-23-151625.png",
        129
    ),
    new Album(
        'ten',
        "The Marshall Mathers LP 2",
        "img/2021-10-23-164100.png",
        129
    )
]
//visar album i html
function showAlbum(album){
    return `
    <article id=albumToBy>
            <img src=${album.image} alt=${album.name} class="imgAlbum" id=${album.image}>
            <p>${album.name}</p>
            <p>Pris: ${album.price}:-</p>
            <button onclick="buttonBye('${album.id}', '${album.name}', '${album.image}', '${album.price}')">Köp</button>
    </article> 
 `;
}
// den loopar alla album och skriver ut i html
let renderAlbums = [];
for (const item of data){
    renderAlbums.push(showAlbum(item))
}
document.getElementById('allAlbums').innerHTML = renderAlbums;