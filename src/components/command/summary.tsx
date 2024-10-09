"use client";
import { Fragment, useEffect, useState } from "react";
import { type Functions } from "types/database-functions";

type SelectedDish = {
  id: string;
  quantity: number;
};
export function Summary({
  dishs,
}: Readonly<{ dishs: Functions<"menu"> | null }>) {
  const [selectedDish, setSelectedDish] = useState({} as SelectedDish[]);

  useEffect(() => {
    const selectedDish = Array.from(document.querySelectorAll("mds-input"))
      .filter((input) => input.value && parseInt(input.value) > 0)
      .map((input) => ({ id: input.id, quantity: parseInt(input.value!) }));
    console.log(selectedDish);
    setSelectedDish(selectedDish);
  }, []);

  function getTotal() {
    // return selectedDish.map((d) => d.quantity).reduce((q1, q2) => q1 + q2, 0);
    return 0;
  }

  function setModal(open = false) {
    document
      .querySelector("#modal_summary")
      ?.setAttribute("opened", open.toString());
  }

  function order() {
    // TODO ORDER
    console.log("TODO order");
  }

  return (
    <Fragment>
      <mds-button variant="success" onClick={() => setModal(true)}>
        Procedi all&apos;ordine
      </mds-button>

      <mds-modal id="modal_summary" position="center">
        <div slot="window" className="bg-theme-default-07-primary-background p-400 rounded-lg flex flex-col gap-200  min-h-5600">
          <mds-text>Riepilogo</mds-text>
          <mds-table class="flex-1">
            <mds-table-header>
              <mds-table-cell>Piatto</mds-table-cell>
              <mds-table-cell>Quantita</mds-table-cell>
              <mds-table-cell>Prezzo</mds-table-cell>
            </mds-table-header>
            {/* {selectedDish.map((current) => {
            const d = dishs?.find((d) => d.dish_id === parseInt(current.id));
            return (
              <mds-table-row key={current.id}>
                <mds-table-cell>{d?.name}</mds-table-cell>
                <mds-table-cell>{current.quantity}</mds-table-cell>
                <mds-table-cell>{d?.price}</mds-table-cell>
              </mds-table-row>
            );
          })} */}
            <mds-table-row>
              <mds-table-cell>Totale</mds-table-cell>
              <mds-table-cell></mds-table-cell>
              <mds-table-cell>{getTotal()}</mds-table-cell>
            </mds-table-row>
          </mds-table>
          <div className="flex gap-100 justify-between">
            <mds-button variant="error" onClick={() => setModal(false)}>
              Annulla
            </mds-button>
            <mds-button variant="success" onClick={() => order()}>
              Conferma Ordine
            </mds-button>
          </div>
        </div>
      </mds-modal>
    </Fragment>
  );
}
