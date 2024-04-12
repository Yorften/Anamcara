import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Not Found");

  return (
    <>
      <div className='text-5xl'>404 - Page Not Found</div>
    </>
  );
}
