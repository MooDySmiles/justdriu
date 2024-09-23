export default function OrderPage({
  params: { id: orderId },
}: {
  params: { id: string };
}) {
  return (
    <div>Qui ci sarà il mio bel dettaglio dell&apos;ordine di id {orderId}</div>
  );
}
