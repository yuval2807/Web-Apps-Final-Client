import { Outlet } from "react-router-dom";
import NavbarDrawer from "../../components/Common/Navbar";

interface PageLayoutProps {
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const navWidth = 12;
  console.log(children);
  return (
    <div
      className='layout'
      style={{ display: "flex", flexDirection: "row-reverse", height: "100%" }}>
      <NavbarDrawer navWidth={`${navWidth}%`} />
      <div
        style={{
          width: `${100 - navWidth}%`,
          display: "flex",
          justifyContent: "center",
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
