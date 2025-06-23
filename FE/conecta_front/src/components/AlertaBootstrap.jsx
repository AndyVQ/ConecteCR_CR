function AlertaBootstrap({ tipo, mensaje }) {
  return (
    <div className={`alert alert-${tipo}`} role="alert">
      {mensaje}
    </div>
  );
}
export default AlertaBootstrap;
