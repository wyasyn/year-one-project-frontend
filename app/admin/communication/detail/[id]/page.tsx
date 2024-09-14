import EditCommunication from "../../_components/edit-comm";

export default function page({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  return <EditCommunication communicationId={id} />;
}
