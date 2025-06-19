
import ForoAdmin from "../components/ForoAdmin";
import AdminNavBar from "../components/AdminNavBar";  
import FooterHighFashion from "../components/Footer";

const PagForoAdmin = () => {
  return (
    <>
    <header>
        <AdminNavBar />
    </header>
    <div className="pag-Admin">
        <ForoAdmin />
    </div>
      <footer>
        <FooterHighFashion />
      </footer>
    </>
  );
};
export default PagForoAdmin;
