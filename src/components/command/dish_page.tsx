import { type Functions } from "types/database-functions";

export default function DishPage({
  dishs,
}: Readonly<{
  dishs: Functions<"menu">;
}>) {

  return (
    <div className="grid gap-200">
      <div className="grid gap-400 items-center bg-justdriu-09 rounded-md px-100" style={{gridTemplateColumns: "1fr 3fr 0.5fr 0.5fr 0.5fr"}}>
            <mds-text>Piatto</mds-text>
            <mds-text>Descrizione</mds-text>
            <mds-text>Prezzo</mds-text>
            {/* <mds-button icon="mi/baseline/minus" onClick={() => count(d.dish_id, false)}></mds-button> */}
            <mds-text>Quantità</mds-text>
            {/* <mds-button icon="mi/baseline/plus" onClick={() => count(d.dish_id, true)}></mds-button> */}
      </div>
      {dishs.map((d) => {
        return (
          <div key={d.dish_id} className="grid gap-400 items-center" style={{gridTemplateColumns: "1fr 3fr 0.5fr 0.5fr 0.5fr"}}>
            <mds-text>{d.name}</mds-text>
            <mds-text>{d.description}</mds-text>
            <mds-text>{d.price.toFixed(2)}€</mds-text>
            {/* <mds-button icon="mi/baseline/minus" onClick={() => count(d.dish_id, false)}></mds-button> */}
            <mds-input type="number" placeholder="0" id={'dish_'+d.dish_id}></mds-input>
            {/* <mds-button icon="mi/baseline/plus" onClick={() => count(d.dish_id, true)}></mds-button> */}
          </div>
        );
      })}
    </div>
  );
}
