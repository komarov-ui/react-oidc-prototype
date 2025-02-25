import { FC, PropsWithChildren } from "react";

export const NavBar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="nav-bar">
      {children}
    </div>
  );
}
