import Animal from "react-animals";
import { getRandomElementFromArray } from "../../shared/helpers";
import Tooltip from "../Tooltip";
import { animals } from "./animals";

const randomAnimal = getRandomElementFromArray(animals);

const UserAvatar = () => {
  return (
    <div>
      <Animal square size={"38px"} name={randomAnimal} />
      <Tooltip text={`Anonymous ${randomAnimal} (You)`} />
    </div>
  );
};

export default UserAvatar;
