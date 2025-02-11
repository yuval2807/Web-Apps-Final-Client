import NavbarDrawer from "../../components/Common/Navbar";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {

  const navWidth = 12;

  return (
  <div className='layout' style={{display: "flex", flexDirection: "row-reverse"}}>
    <NavbarDrawer navWidth={`${navWidth}%`} />
    <div style={{ width:`${100-navWidth}%`, display: "flex", justifyContent: "center", flexDirection: "column"}}>
        {children}
    </div>
  </div>);
};

export default PageLayout;
