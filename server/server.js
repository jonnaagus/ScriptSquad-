require('dotenv').config();
console.log(process.env)
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT;



// The OAuth client ID from the integration page!
const notionClientId = process.env.NOTION_CLIENT_ID;

// The OAuth client secret from the integration page!
const notionClientSecret = process.env.NOTION_CLIENT_SECRET; 

// Internal Integration Secret
const NOTION_INTERNAL_API_KEY = process.env.NOTION_INTERNAL_API_KEY

app.use(cors());
app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


app.get("/login/:code", async (req, res) => {
    const { code } = req.params;
    // Generate an access token with the code we got earlier and the client_id and client_secret we retrived earlier
    const resp = await axios({
        method: "POST",
        url: "https://api.notion.com/v1/oauth/token",
        auth: { username: notionClientId, password: notionClientSecret },
        headers: { "Content-Type": "application/json" },
        data: { code, grant_type: "authorization_code" },
    });


    


    //Get and send User that is owner of Acess token as response
    axios({
        method: 'get',
        url: 'https://api.notion.com/v1/users/me',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resp.data.access_token}`,
            "Notion-Version": "2022-06-28",
        }
    })
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

});


app.post('/api/query/:databaseId', async (req, res) => {

    const { databaseId } = req.params;

    try {
        // Anropa Notion API med inkommande förfrågningsdata
        const response = await axios.post(`https://api.notion.com/v1/databases/${databaseId}/query`, req.body, {
            headers: {
                'Authorization': `Bearer ${NOTION_INTERNAL_API_KEY}`,
                'Notion-Version': '2021-05-13'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/addRow', async (req, res) => {  
    try {
        const response = await axios.post(`https://api.notion.com/v1/pages`, req.body, {
            headers: {
                'Authorization': `Bearer ${NOTION_INTERNAL_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2021-05-13'
            },
           
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get("/api/timeReports", async (req, res) => {
    try {
        const response = await axios.post(`https://api.notion.com/v1/databases/c2dcd975b12248588431b2de1d1022c9/query`,{}, {
            headers: {
                'Authorization': `Bearer ${NOTION_INTERNAL_API_KEY}`,
                'Content-Type': 'application/json',
                "Notion-Version": "2021-05-13"
            }
        });

        const timeReports = response.data.results;
        console.log(timeReports)
        res.json(timeReports);
    } catch (error) {
        console.error("Error fetching time reports:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});