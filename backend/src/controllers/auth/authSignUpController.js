import axios from "axios";

export async function createUserAuth(req, res){
  const { name, email, password, role } = req.body;
console.log(process.env.AUTH_DOMAIN)
  try {
    const response = await axios.post(
      `${process.env.AUTH_DOMAIN}/dbconnections/signup`,
      {
        client_id: process.env.AUTH_CLIENT_ID,
        email,
        password,
        connection: process.env.AUTH_CONNECTION,
        user_metadata: {
          name,
          role
        }
      },
      { headers: { "Content-Type": "application/json" } }
    );

    res.json({ message: "User signed up successfully", data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(400).json(err.response?.data || { error: err.message });
  }
}