import { type Functions } from "types/database-functions";

export default async function DishPage({
  dishs,
}: Readonly<{
  dishs: Functions<"menu">;
}>) {
  return (
    <div className="grid gap-200">
      {dishs.map((d) => {
        return (
          <div key={d.dish_id} className="grid gap-400 items-center" style={{gridTemplateColumns: "1fr 3fr 0.5fr 0.5fr 0.5fr 0.5fr"}}>
            <mds-text>{d.name}</mds-text>
            <mds-text>{d.description}</mds-text>
            <mds-text>{d.price.toFixed(2)}€</mds-text>
            <mds-button icon="mi/baseline/minus"></mds-button>
            <mds-input placeholder="0"></mds-input>
            <mds-button icon="mi/baseline/plus"></mds-button>
          </div>
        );
      })}
    </div>
  );
}
