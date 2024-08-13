import { useContext, useEffect, useState } from "react";
import { CharacterItemsContext } from "../../context/CharacterContext";
import {Item} from '../../Models/characterModel'


const Items = () => {
  const { gear, error, isLoading } = useContext(CharacterItemsContext);
  const [itemsLeft, setItemsLeft] = useState<Item[]>([])
  const [itemsRight, setItemsRight] = useState<Item[]>([])


  useEffect(() => {
/*     console.log('Gear: ', gear);
    console.log('Error: ', error);
    console.log('Loading: ', isLoading); 
    console.log('Gear: ', gear);
*/
    if (gear) {
      for (const slot in gear) {
       // const item = gear[slot]
       console.log(`Slot: ${slot}`)
        const midpoint = Math.floor(Object.keys(gear).length / 2)
       // console.log(midpoint)
        const keys = Object.keys(gear)

        const leftItems: any[] = []
        const rightItems: any[] = []

        for (let i = 0; i < midpoint; i++) {
          const key = keys[i]
          const item = gear[key]  
          leftItems.push(item)
        }
        for (let i = midpoint; i < keys.length; i++) {
          const key = keys[i]
          const item = gear[key]  
          rightItems.push(item)
        }

        setItemsLeft(leftItems)
        setItemsRight(rightItems)

        console.log(itemsLeft)
        console.log(itemsRight)
      }
    } else {
      return 
    }
  }, [gear, error, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {gear ? (
        Object.entries(gear).map(([key, value]) => (
          <div key={key}>
            {/* Render the properties of gear */} 
            <b>{JSON.stringify(value.name)}</b>
          </div>
        ))
      ) : (
        <div>frick</div>
      )}
    </div>
  );
};

export default Items;
