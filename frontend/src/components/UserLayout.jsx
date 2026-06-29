import Navbar from "../components/Navbar";
import AssistantWidget from "../components/AI/AssistantWidget";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      {/* <AssistantWidget /> */}
    </>
  );
};

export default UserLayout;