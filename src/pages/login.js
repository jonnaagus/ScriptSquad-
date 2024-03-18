import lockImage from "../images/lock.png"
import { useEffect } from "react";
import "../styles/login.css"; // Importera inloggningslayout
import axios from "axios";
function SaveUser(user) {
    window.localStorage.setItem("user", user);
}


function loadUser() {
    var user = window.localStorage.getItem("user");
    return JSON.parse(user);
}

function loadPeople() {
    var user = window.localStorage.getItem("people");
    return JSON.parse(user);
}

//bool to stop fetch from running twice at the same time
var isFetching;

async function GetUser() {

    //bool to stop fetch from running twice at the same time

    const params = new URL(window.document.location).searchParams;
    const code = params.get("code");

    if (!code || isFetching) return;
    isFetching = true;
    await fetch(`http://localhost:3002/login/${code}`).then(async (resp) => {
        SaveUser(JSON.stringify(await resp.json()));
        isFetching = false;
        // window.location.href="http://localhost:3000/overview"

    });


    const user = JSON.parse(window.localStorage.getItem("user")).bot.owner.user.name

    //add username to filter
    const payload = {
        filter: {
            property: "Name",
            title: {
                contains: user
            }
        }
    };


    await axios.post(`http://localhost:3002/api/query/caaa73848db940698e5a9404701078ff`, payload)
        .then(async (resp) => {

            //if username found get id from first result
            if (await resp.data.results.length > 0) {
                const people = resp.data.results[0].id;
                console.log("PERSON RESULT:", people);
                window.localStorage.setItem("people", people);
                window.location.href = "http://localhost:3000/overview"

            }
            //if no results found add id from user "unknown"
            else {
                console.log("NO USER FOUND")
                window.location.href = "http://localhost:3000"
            }
        });


}

export default function Login() {
    // The OAuth client ID from the integration page!
    const oauth_client_id = "d0b58e75-fbe9-4e66-9e2b-c613671e6a6e";


    // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
    useEffect(() => {
        GetUser();
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

                            {loadPeople() != null ?
                                <div>
                                    <p> Du är inloggad som {loadUser().bot.owner.user.name}</p>
                                    <a onClick={() => localStorage.clear()} href="http://localhost:3000/">Logga ut</a>
                                </div>

                                :

                                <div>
                                    <p> {loadUser().bot.owner.user.name} finns inte i databasen. kontakta administratör</p>
                                    <a onClick={() => localStorage.clear()} href="http://localhost:3000/">Prova annat konto</a>
                                </div>
                        
                        }
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