import lockImage from "../images/lock.png"

export default function Login(){
    return(
        <div>
            <header>
        {/* <!-- Header rubrik --> */}
        <h1 class="outfit-font">Projekt.se</h1>
    </header>

    <div class="image-container">
        <img src={lockImage} alt="lock" style={{width: '100px', height: 'auto'}} />
    </div>
    {/* <!--- Bestämmer plats på rutan--> */}
    <div class="container"> 
    {/* <!--- Forma rutan--> */}
        <div class="login-box"> 
            <h2>Logga in med <span class="notion-logo">Notion</span></h2>
            <button id="notion-login-button">Ta mig till Notion</button>
        </div>
    </div>

    <footer>
        {/* <!-- Footer --> */}
        <p>&copy; 2024 Projekt.se. Alla rättigheter förbehållna.</p>
    </footer>
        </div>
    );
}