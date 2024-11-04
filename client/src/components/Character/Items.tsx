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

  const returnCorrectSide = () => {
    if (side === 'left') {
      return leftItems.map((item, id) => <div key={id}>{item}</div>)
    } else {
      return rightItems.map((item, id) => <div key={id}>{item}</div>)
    }
  }

  return (
    <div>
      {returnCorrectSide()}
    </div>
  );
};

export default Items;
