function nav(){
    return `
        <ul id="navbar">
            <li>Våra album</li>
            <li>Nyheter</li>
            <li>Topplistor</li>
            <li>Play</li>
            <li>Julklappar</li>
            <li>Erbjudande</li>
        </ul>
        `
}
document.getElementById('nav').innerHTML = nav()