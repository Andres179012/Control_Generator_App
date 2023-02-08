import PanelAdmin from "./PanelAdmin";
import "../App.css";
import BaseLayout from "../Layout/BaseLayout";


function HomePage({username}) {
  return (
        <BaseLayout username={username}>
          <PanelAdmin/>
        </BaseLayout>
  );
}



export default HomePage;