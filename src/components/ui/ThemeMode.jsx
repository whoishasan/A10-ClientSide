import { useEffect, useState } from "react";
import { CiDark } from "react-icons/ci";
import { IoSunnyOutline } from "react-icons/io5";

const ThemeMode = () => {
  const [mode, setMode] = useState(
    localStorage.getItem('mode') === 'dark'
  );

  useEffect(() => {
    if (mode) {
      document.body.setAttribute('data-mode', 'dark')
    } else {
      document.body.setAttribute('data-mode', 'light')
    }
    localStorage.setItem('mode', mode ? 'dark' : 'light');
  }, [mode]);

  const toggleMode = () => {
    setMode(!mode);
  };

  return (
    <button data-tooltip-id="tooltip" data-tooltip-content="Mode" onClick={toggleMode} className="text-2xl cursor-pointer mt-2 outline-none">
      {mode ? <IoSunnyOutline color="#ffec99"/> : <CiDark />}
    </button>
  );
};

export default ThemeMode;