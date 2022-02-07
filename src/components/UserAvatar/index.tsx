import { useState } from "react";
import styles from "./styles.module.scss";
import Animal from "react-animals";
import { getRandomElementFromArray } from "../../shared/helpers";
import Tooltip from "../Tooltip";
import { animals } from "./animals";

const randomAnimal = getRandomElementFromArray(animals);

const UserAvatar = () => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  return (
    <div id={styles.userAvatar}>
      <div
        id={styles.avatar}
        onMouseEnter={() => setDisplayTooltip(true)}
        onMouseLeave={() => setDisplayTooltip(false)}
      >
        <Animal square size={"38px"} name={randomAnimal} />
      </div>
      {displayTooltip && <Tooltip text={`Anonymous ${randomAnimal} (You)`} />}
    </div>
  );
};

export default UserAvatar;
