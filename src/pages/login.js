import lockImage from "../images/lock.png"
import { useEffect } from "react";
import "../styles/login.css"; // Importera inloggningslayout
function SaveUser(user) {
    window.localStorage.setItem("user", user);
}


function loadUser() {
    var user = window.localStorage.getItem("user");
    return JSON.parse(user);
}


export default function Login() {
    // The OAuth client ID from the integration page!
    const oauth_client_id = "d0b58e75-fbe9-4e66-9e2b-c613671e6a6e";

    //bool to stop fetch from running twice at the same time
    var isFetching;
    // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
    useEffect(() => {
        const params = new URL(window.document.location).searchParams;
        const code = params.get("code");
        
        if (!code || isFetching) return;
        isFetching = true;
        fetch(`http://localhost:3002/login/${code}`).then(async (resp) => {
            SaveUser(JSON.stringify(await resp.json()));
            isFetching = false;
            window.location.href="http://localhost:3000/"

        });
    }, []);


    return (
        <div>
            <header>
                {/* <!-- Header rubrik --> */}
                <h1 className="outfit-font">Projekt.se</h1>
            </header>

            <div className="image-container">
                <img src={lockImage} alt="lock" style={{ width: '100px', height: 'auto' }} />
            </div>
            {/* <!--- Bestämmer plats på rutan--> */}
            <div className="container">
                {/* <!--- Forma rutan--> */}
                <div className="login-box">
                    <h2>Logga in med <span className="notion-logo">Notion</span></h2>

                    {loadUser() != null ?
                        <div>
                            <p> Du är inloggad som {loadUser().bot.owner.user.name}</p>
                            <a onClick={() => localStorage.removeItem("user")} href="http://localhost:3000/">Logga ut</a>
                        </div>

                        :

                        <a
                            id="notion-login-button"
                            href={`https://api.notion.com/v1/oauth/authorize?client_id=${oauth_client_id}&response_type=code&owner=user`}
                        >
                            Ta mig till Notion
                        </a>


                    }
                </div>
            </div>

            <footer>
                {/* <!-- Footer --> */}
                <p>&copy; 2024 Projekt.se. Alla rättigheter förbehållna.</p>
            </footer>
        </div>
    );
}