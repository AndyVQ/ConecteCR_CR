
import RepAdmin from "../components/RepAdmin";
import AdminNavBar from "../components/AdminNavBar";  
import FooterHighFashion from "../components/Footer";
const PagRepAdmin = () => {
  return (
    <>
    <header>
        <AdminNavBar />
    </header>
    <div className="pag-Admin">
        <RepAdmin />
    </div>
      <footer>
        <FooterHighFashion />
      </footer>
    </>
  );
};
export default PagRepAdmin;
