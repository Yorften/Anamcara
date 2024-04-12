import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Videos() {
  useDocumentTitle("Videos");

  return (
    <>
      <div className='text-5xl'>Videos</div>
    </>
  );
}
