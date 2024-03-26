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
    const response = await axios({
        method: "POST",
        url: "https://api.notion.com/v1/oauth/token",
        auth: { username: notionClientId, password: notionClientSecret },
        headers: { "Content-Type": "application/json" },
        data: { code, grant_type: "authorization_code" },
    });


    //get list of users in workspace
    const users = await axios({
        method: "GET",
        url: "https://api.notion.com/v1/users/",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${NOTION_INTERNAL_API_KEY}`,
            "Notion-Version": "2022-06-28",
        }
    });

    //filter user list to only get type person
    const u = users.data.results
    const personUsers = u.filter(user => user.type === 'person')

    //check list if user doing auth is in workspace
    let foundUser = false;
    await personUsers.forEach(user => {
        if (user.person.email === response.data.owner.user.person.email) {
            foundUser = true;
        }

    });

    //if user is in workspace return data
    if (foundUser) {
        console.log("resp sent")
        res.send(response.data)
    }
    else {
        res.status(401).json({ message: 'user not found' });
    }

});


app.get("/validate/:accessToken", async (req, res) => {
    const { accessToken } = req.params;


    try {

        //get owner of access token
        const tokenUser = await axios({
            method: "GET",
            url: "https://api.notion.com/v1/users/me",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "Notion-Version": "2022-06-28",
            }
        });


        //get list of users in workspace
        const users = await axios({
            method: "GET",
            url: "https://api.notion.com/v1/users/",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${NOTION_INTERNAL_API_KEY}`,
                "Notion-Version": "2022-06-28",
            }
        });

        //filter user list to only get type person
        const u = users.data.results
        const personUsers = u.filter(user => user.type === 'person')


        let foundUser = false;
        await personUsers.forEach(user => {
            if (user.person.email === tokenUser.data.bot.owner.user.person.email) {
                foundUser = true;
            }

        });
        //if user is in workspace return data
        if (foundUser) {
            console.log(tokenUser.data)
            console.log("resp sent")
            res.send(tokenUser.data)
        }
        else {
            res.status(401).json({ message: 'user not found' });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }


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

app.post('/api/projects', async (req, res) => {


    try {
        // Anropa Notion API med inkommande förfrågningsdata
        const response = await axios.post(`https://api.notion.com/v1/databases/085c0b7eab1d4242b4d0d7f0280154d5/query`, req.body, {
            headers: {
                'Authorization': `Bearer ${NOTION_INTERNAL_API_KEY}`,
                "Content-Type": "application/json",
                'Notion-Version': '2021-05-13'
            }
        });
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/people', async (req, res) => {
    try {
        // Anropa Notion API med inkommande förfrågningsdata
        const response = await axios.post(`https://api.notion.com/v1/databases/caaa73848db940698e5a9404701078ff/query`, req.body, {
            headers: {
                'Authorization': `Bearer ${NOTION_INTERNAL_API_KEY}`,
                'Notion-Version': '2021-05-13'
            }
        });
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post("/api/timeReports", async (req, res) => {
    try {
        // Anropa Notion API med inkommande förfrågningsdata
        const response = await axios.post(`https://api.notion.com/v1/databases/c2dcd975b12248588431b2de1d1022c9/query`, req.body, {
            headers: {
                'Authorization': `Bearer ${NOTION_INTERNAL_API_KEY}`,
                'Notion-Version': '2021-05-13'
            }
        });
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});