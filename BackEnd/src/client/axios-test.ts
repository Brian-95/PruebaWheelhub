import axios from "axios";

async function createUser() {
  try {
    const response = await axios.post("http://localhost:8080/create", {
      username: "axiosuser",
      password: "axiospass"
    });

    console.log("Respuesta del servidor:", response.data);
  } catch (error: any) {
    if (error.response) {
      console.error("Error del servidor:", error.response.data);
    } else {
      console.error("Error de red:", error.message);
    }
  }
}

createUser();
