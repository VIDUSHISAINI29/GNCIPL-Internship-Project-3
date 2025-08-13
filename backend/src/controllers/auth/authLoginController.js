import axios from "axios";

export async function loginUserAuth(req, res) {
  const { email, password } = req.body;

  try {
    const response = await axios.post(
      `${process.env.AUTH_DOMAIN}/oauth/token`,
      {
        
        grant_type: "http://auth0.com/oauth/grant-type/password-realm",
        username: email,
        password,
        audience: process.env.AUTH_AUDIENCE, // optional, if you need API access token
        scope: "openid profile email",
        client_id: process.env.AUTH_CLIENT_ID,
        client_secret: process.env.AUTH_CLIENT_SECRET,
        realm: process.env.AUTH_CONNECTION // 🔹 FIX: tell Auth0 which DB connection to use
      },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({
      message: "User logged in successfully",
      data: response.data
    });
    // console.log(response.data)
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json(err.response?.data || { error: err.message });
  }
}
