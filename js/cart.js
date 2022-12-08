//Shopping korg
class AlbumToBye {
    constructor(id, name, image, price) {
        this.id = id
        this.name = name
        this.image = image
        this.price = price
        this.quantity = 1
        this.totalSum = price
    }
}

let myCart = []             //Mina album i en tom array
let totalSumCart = 0        //Total summa i kundvagnen
let quantityInCart = 0      //Antal album i kundvagnen

//Antalet av album. Om man har en så skall den uppdatera antal
function buttonBye(id, name, image, price) {
    let exist = updateAlbumInCart(id);

//Finn det album? Nej! lägg till i kundvagnen
    if (exist === false) {
        let newAlbum = new AlbumToBye(id, name, image, price)
        myCart.push(newAlbum)
    }
    renderCart()
}

//renderar album via knapp loop till kundvagnen
function renderCart() {
    let renderCartAlbums = [];
    for (const item of myCart) {
        renderCartAlbums.push(showAlbum(item))
    }
    document.getElementById('allAddedAlbums').innerHTML = renderCartAlbums

    calculateTotalSumInCart()
    calculateShipping()
    calculateTotalQuantityInCart()
}

//visar album i varukorg
function showAlbum(album) {
    return `
    <article id="albumToBy${album.id}">
            <img src=${album.image} alt=${album.name} class="imgAlbumCart" id=${album.image}>
            <p>${album.name}</p>
            <p>Pris: ${album.price}:-</p>
            <input id="quantity${album.id}" type="number" onclick="addMore('${album.id}')" value="${album.quantity}" />
            <p id="totalSum${album.id}">Total: ${album.totalSum}:-</p>
    </article> 
 `;
}
// Visar total summan
function showTotalSum(totalSum) {
    return `
    <article id="totalShowOfAddedAlbums">
        <p>Totalpris: ${totalSum}</p>
        </article>
        `;
}
// Total antalet i kundkorgen
function showTotalQuantity(quantity) {
    return `
    <article id="totalQuantityOfAddedAlbums">
        <p>Antal: ${quantity}</p>
        </article>
        `;
}
// Skriver ut frakt texten
function showShippingCost(shippingText) {
    return `
    <article id="totalShippingCostOfAddedAlbums">
        <p>${shippingText}</p>
        </article>
        `;
}
//visar varukorg
function openMenu() {
    document.getElementById('dropdown')
        .classList.toggle('show')
}
//stänger korgen
function closeMenu() {
    document.getElementById('dropdown')
        .classList.toggle('show', false)
}
// Om album finns i varukorgen så lägger den till ett till album av samma sort, uppdaterar antal med 1, och retunerar om album fanns eller ej i varukorgen.
// Finns inte denna funktion så lägger den till två likadana album under varandra istället för att uppdatera 1.
function updateAlbumInCart(id) {
    let existInCart = false
    for (const item of myCart) {
        if (item.id == id) {
            item.quantity += 1
            item.totalSum = item.price * item.quantity;
            existInCart = true
        }
    }
    return existInCart
}
// Samma som ovan, men uppdaterar inte med 1 utan med ett värde man skickar in och retunerar totalsumman för albumet.(Den syns i input)
function updateAlbumInCartWithNewValue(id, newValue) {
    let totalSumOfAlbum = 0
    for (const item of myCart) {
        if (item.id == id) {
            item.quantity = newValue
            item.totalSum = item.price * item.quantity;
            totalSumOfAlbum =  item.totalSum ;
        }
    }
    return totalSumOfAlbum
}
//Räknar ut total summan för alla album i varukorgen.
function calculateTotalSumInCart() {
    totalSumCart = 0

    for (const item of myCart) {
        totalSumCart += parseInt(item.totalSum)
    }
    document.getElementById('totalSumOfAddedAlbums').innerHTML = showTotalSum(totalSumCart)
}
// Skriver ut kostnads texten och räknar ut om det är fri frakt.
function calculateShipping() {
    let costToFreeFreight = 259 - totalSumCart;
    let costTest = ""

    if (costToFreeFreight <= 0) {
        costTest = "fri frakt"
    } else {
        costTest = "handla för " + costToFreeFreight + " kr få fri frakt "
    }
    document.getElementById('totalShippingOfAddedAlbums').innerHTML = showShippingCost(costTest)
}
// Räknar ut antal album i varukorgen.
function calculateTotalQuantityInCart() {
    quantityInCart = 0

    for (const item of myCart) {
        quantityInCart += parseInt(item.quantity)
    }

    document.getElementById('totalQuantityOfAddedAlbums').innerHTML = showTotalQuantity(quantityInCart)
}
// adderar eller subtraherar antal och räknar ut slutsumma
function addMore(id) {
    // Detta får ut värdet på input fältet för det album man har ökat eller minskar på i varukorgen.
    let newValue = document.getElementById("quantity" + id).value;
    //Är antal på album mindre än 0 ta bort album från varukorgslistan. Det är så att den inte kan gå minus
    if (parseInt(newValue) <= 0) {
        for (let i = 0; i < myCart.length; i++) {
            if (myCart[i].id == id) {
                myCart.splice(i, 1);
                document.getElementById("albumToBy" + id).remove()
            }
        }
        // Annars addera eller subtraherar med det antal som fanns i input fältet.
    } else {
        let totalSum = updateAlbumInCartWithNewValue(id, newValue)
        if (!!totalSum) {
            document.getElementById("totalSum" + id).innerText = "Total: " + totalSum + ":-";
        }
    }
    // Görs för att kunna räkna om värderna för varukorgen. Vi har kallat på funktionerna.
    calculateTotalSumInCart()
    calculateShipping()
    calculateTotalQuantityInCart()
}

function pay() {
    alert('Tack för din betalning')
}

function inputButton() {
    alert('Testa ett annat sökord')
}
// Kallas på globalt för att kunna skapa varukorgen när man öppnar sidan första gången.
renderCart()