import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import CartModal from "../CartModal";

const Layout = ({ children }) => {
  return (
    <>
      <CartModal />
      <Header />
      {children}
      <Footer />
    </>
  );
  // const [showModal, setShowModal] = useState(false);

  // function openModal() {
  //   setShowModal(true);
  // }
  // const closeModal = () => {
  //   setShowModal(false);
  // };
  // return (
  //   <>
  //     {showModal && <CartModal closeModal={closeModal}/>}
  //     <Header openModal={openModal}/>
  //       {children}
  //     <Footer />
  //   </>
  // );
};

export default Layout;
