import { buttonBlackColor } from "../../shared/constants";
import Button from "../Button";
import UserAvatar from "../UserAvatar";
import styles from './styles.module.scss';

const ButtonBar = () => {
  return (
    <div id={styles.toolbar}>
      <UserAvatar />
      <Button
        text="Share"
        border={`1px solid ${buttonBlackColor}`}
        backgroundColor={buttonBlackColor}
        color="white"
      />
      <Button
        text="Sign Up"
        border="1px solid #E8E8E8"
        backgroundColor="white"
        color={buttonBlackColor}
      />
    </div>
  );
};

export default ButtonBar;
