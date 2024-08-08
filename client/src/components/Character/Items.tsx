import { useContext, useEffect } from "react";
import { CharacterItemsContext } from "../../context/CharacterContext";


const Items = () => {
  const { gear, error, isLoading } = useContext(CharacterItemsContext);

  useEffect(() => {
    console.log('Gear: ', gear);
    console.log('Gear type: ', typeof gear);
    console.log('Error: ', error);
    console.log('Loading: ', isLoading);
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
