import { useEffect, useState } from "react";
import { layTatCaNguoiDung } from "../../../api/nguoi-dung-api";
import Body from "./Body";
import Header from "./Header";

function Home(props) {
  const [nguoiDungs, setNguoiDungs] = useState([]);

  useEffect(() => {
    const init = async () => {
      setNguoiDungs(await layTatCaNguoiDung());
    };

    init();
  }, []);

  return (
    <>
      <Header nguoiDungs={nguoiDungs} setNguoiDungs={setNguoiDungs} />
      <Body nguoiDungs={nguoiDungs} setNguoiDungs={setNguoiDungs} />
    </>
  );
}

export default Home;
