import { useState } from "react";
import Hamburger from "hamburger-react";

export default function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Hamburger size={28} toggled={open} toggle={setOpen} />
    </div>
  );
}
