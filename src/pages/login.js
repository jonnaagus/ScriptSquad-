import lockImage from "../images/lock.png"
import { useEffect , useState } from "react";
import "../styles/login.css"; // Importera inloggningslayout
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";


function SaveUser(user) {
    console.log("USER SAVED")
    window.localStorage.setItem("user", user);
}

function loadUser() {
    var user = window.localStorage.getItem("user");
    return JSON.parse(user);
}

export default function Login() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    //set location user tried to login from (broken: looses location when returning from notions login page)
    const from = location.state?.from?.pathname || "/overview";

    //bool to stop fetch from running twice at the same time
    var isFetching;

    //used to display loading if testing localstorage user
    const [validating, setValidating] = useState(false);
    
    // The OAuth client ID from the integration page!
    const oauth_client_id = "d0b58e75-fbe9-4e66-9e2b-c613671e6a6e";

    async function GetUser() {

        //if user is set in local storage login and send to page user tried to access
        if (loadUser() != null) {
            const temp = loadUser()
            const accessToken = temp.accessToken
            const userName = temp.userName
            const email = temp.email

            try {
                setValidating(true);
                //send access token in localstorage to see if user is in workspace
                const response = await axios.get(`http://localhost:3002/validate/${accessToken}`)

                //if user is in workspace compare email and send to desired page
                if (response.data.bot.owner.user.person.email === email) {
                    await setAuth({ accessToken, userName, email })
                    navigate(from, { replace: true });
                    setValidating(false);
                    console.log(false)
                }
                //if email dont match user in workspace clear user from localstorage and send to login page
                else {
                    localStorage.clear();
                    navigate("/");
                    setValidating(false);
                    console.log(false)
                }
                //if no respone from server clear and send to login page
            } catch (error) {
                console.log("clear")
                localStorage.clear();
                navigate("/");
                setValidating(false);
            }


        }

        //get code from url when returning from notion login page
        const params = new URL(window.document.location).searchParams;
        const code = params.get("code");
        //if no code in url dont run
        if (!code || isFetching) return;
        isFetching = true;

        //axios.get to get access token from notion and chek if user is in workspace
        try {
            //if user is in workspace return user information
            const response = await axios.get(`http://localhost:3002/login/${code}`);
            console.log(response);
            const accessToken = response.data.access_token
            const userName = response.data.owner.user.name
            const email = response.data.owner.user.person.email
            //set user info in Auth
            const user = {
                accessToken: accessToken,
                userName: userName,
                email: email,
            }

            setAuth({ accessToken, userName, email });
            SaveUser(JSON.stringify(user))
            //navigate to page user tried to login from (broken:"from" not working "/overview" used for now)
            navigate("/overview", { replace: true });

        } catch (error) {
            //if notion user was not a part of notion workspace return 401
            if (error.response?.status === 401) {
                //TODO tell user to contact admin or try another account
                console.log("USer not auth")
            }
        }
    }




    // When you open the app, this doesn't do anything, but after you sign into Notion, you'll be redirected back with a code at which point we call our backend.
    useEffect(() => {
        GetUser();
    });


    return (
        <div>
            <header>
                {/* <!-- Header rubrik --> */}
                <h1 className="outfit-font">Projekt.se</h1>
            </header>

            {validating && <p>LADDAR....</p>}

            {!validating && 
            <div>
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
                                    <div>
                                        <p> Du är inloggad som {loadUser().userName}</p>
                                        <a onClick={() => localStorage.clear()} href="http://localhost:3000/">Logga ut</a>
                                    </div>
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
                </div>
            }

            <footer>
                {/* <!-- Footer --> */}
                <p>&copy; 2024 Projekt.se. Alla rättigheter förbehållna.</p>
            </footer>
        </div>
    );
}