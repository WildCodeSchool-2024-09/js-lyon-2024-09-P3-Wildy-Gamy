import Hamburger from "hamburger-react";
import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Hamburger size={28} toggled={open} toggle={setOpen} />
    </div>
  );
}
