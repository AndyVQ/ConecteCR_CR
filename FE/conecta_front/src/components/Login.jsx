import { useState } from "react";
import { postData, postUser } from "../services/fetch";
import "../styles/Login.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState("password");
  const navigate = useNavigate();

  async function validarUsuario() {
    const usuarioObj = {
      username: usuario,
      password: clave,
    };

    const respuesta = await postUser("usuarios/login/", usuarioObj);

    if (respuesta.exito) {
      Swal.fire({
        title: "¡Bienvenido a ConecteCR!",
        text: "Inicio de sesión exitoso",
        icon: "success",
        confirmButtonText: "Continuar",
      });
      localStorage.setItem("token", respuesta.token);
      localStorage.setItem("id_usuario", respuesta.id);
      localStorage.setItem("grupo", respuesta.grupo);
      navigate("/home");
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  }

  return (
    <main className="cont-todo">
      <div className="login-container">
        <section className="cont-img">
          <img src="\src\img\logo.png" alt="Logo ConecteCR" className="logo" />
        </section>

        <section className="section-inputs">
          <h2 className="h2">Iniciar sesión</h2>
          <input
            placeholder="Usuario"
            onChange={(e) => setUsuario(e.target.value)}
            className="input-usuario"
          />
          <button
            className="boton-ojo"
            onClick={() =>
              verClave == "password"
                ? setVerClave("text")
                : setVerClave("password")
            }
          >
            {" "}
            {verClave === "password" ? <FaEye /> : <FaEyeSlash />}
          </button>
          <input
            type={verClave}
            placeholder="Clave"
            onChange={(e) => setClave(e.target.value)}
            className="input-password"
          />
          <button onClick={validarUsuario} className="botton-iniciar">
            Iniciar sesión
          </button>
          <p className="registerH2">
            <Link to="/Register">¡Registrarse!</Link>
          </p>
        </section>
      </div>
    </main>
  );
};

export default Login;
