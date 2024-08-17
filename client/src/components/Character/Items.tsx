import { useContext } from "react";
import { CharacterItemsContext } from "../../context/CharacterContext";

interface ItemProps {
  side: string
}

const Items = ({side}: ItemProps) => {
  const { leftItems, rightItems, error, isLoading } = useContext(CharacterItemsContext);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(leftItems)
  console.log(rightItems)

  const returnCorrectSide = () => {
    if (side === 'left') {
      return leftItems.map(item => <div>{item}</div>)
    } else {
      return rightItems.map(item => <div>{item}</div>)
    }
  }

  return (
    <div>
      {returnCorrectSide()}
    </div>
  );
};

export default Items;
