import styles from "./styles.module.scss";
import { HiMenuAlt4 } from "react-icons/hi";
import { buttonBlackColor } from "../../shared/constants";
import ActionButtons from "./ActionButtons";
import Button from "../Button";

const Toolbar = () => {
  return (
    <div id={styles.toolbar}>
      <div>
        <HiMenuAlt4 size={"1.875rem"} color={buttonBlackColor} />
        <input placeholder="Enter a title" />
      </div>
      <ActionButtons />
      <div id={styles.buttonsWrapper}>
        <Button
          text="Help"
          border="1px solid #E8E8E8"
          backgroundColor="white"
          color={buttonBlackColor}
        />
        <Button
          text="Feedback"
          border="1px solid #E8E8E8"
          backgroundColor="white"
          color={buttonBlackColor}
        />
      </div>
    </div>
  );
};

export default Toolbar;
