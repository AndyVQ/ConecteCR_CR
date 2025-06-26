
import Admin from "../components/Admin";
import AdminNavBar from "../components/AdminNavBar";
import FooterHighFashion from "../components/Footer";

const PagAdmin = () => {
  return (
    <>
      <header>
        <AdminNavBar />
      </header>
      <div className="pag-Admin">
        <Admin />
      </div>
      <footer>
        <FooterHighFashion />
      </footer>
    </>
  );
};
export default PagAdmin;
