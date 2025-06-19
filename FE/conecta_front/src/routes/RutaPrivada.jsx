import React from "react";
function RutaPrivada({ children, rol }) {
  const isAuthenticated = localStorage.getItem("token");
  const userGroup = localStorage.getItem("grupo");

  const usuarioValido = () => {
    if (isAuthenticated && userGroup === rol) {
      return true;
    }
    return false;
  };

  return <>{usuarioValido() ? children : <h1>INVALIDO</h1>}</>;
}

export default RutaPrivada;
