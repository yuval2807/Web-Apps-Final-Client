import NavbarDrawer from "../../components/Common/Navbar";

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {

  const navWidth = 10;

  return (
  <div className='layout' style={{ width:`${100-navWidth}%`}}>
    <NavbarDrawer navWidth={`${navWidth}%`} />
    {children}
  </div>);
};

export default PageLayout;
