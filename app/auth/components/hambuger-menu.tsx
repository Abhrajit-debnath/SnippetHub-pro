import React from "react";
import { Menu } from "lucide-react";

export type HamburgerMenuProps = {
  toggleSidebar: boolean;
  setToggleSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const HamburgerMenu = ({
  toggleSidebar,
  setToggleSidebar,
}: HamburgerMenuProps) => {
  return (
    <button onClick={() => setToggleSidebar(!toggleSidebar)}>
      <Menu />
    </button>
  );
};

export default HamburgerMenu;
