"use client";
import HamburgerMenu from "@/app/auth/components/hambuger-menu";

type Props = {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DashboardHeader = ({ toggleSidebar, setToggleSidebar }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 text-white">
      <HamburgerMenu
        toggleSidebar={toggleSidebar}
        setToggleSidebar={setToggleSidebar}
      />
    
    </div>
  );
};

export default DashboardHeader;
