async function postData(endpoint, data) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    const respuesta = peticion.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
  
}

async function postUser(endpoint, data) {
  try {
    const peticion = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const respuesta = peticion.json();
    return respuesta;
  } catch (error) {
    console.log(error);
  }
}

async function getData(endpoint, id = "") {
  try {
    const response = await fetch(`http://127.0.0.1:8000/${endpoint}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function updateData(data, endpoint, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/${endpoint}/` + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error update user:", error);
    throw error;
  }
}

async function deleteData(endpoint, id) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting user with id ${id}`);
    }

    return { message: `User with id ${id} deleted successfully` };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export { postData, getData, updateData, deleteData, postUser };
