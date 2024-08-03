import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage() {

  const navigate = useNavigate();

  const error = useRouteError();

  const back = () => {
    navigate(-1);
  }

  return (
    <div id="error-page" className="text-center min-h-screen flex justify-center items-center dark:bg-slate-900 text-white">
        <div className="space-y-4">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <button onClick={back} className="py-2 px-4 bg-red-500 rounded-lg">Back to last page</button>
        </div>
    </div>
  );
}