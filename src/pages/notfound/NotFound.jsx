import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
       
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-300">
          <SearchX className="h-10 w-10 text-red-600 " />
        </div>

        <h1 className="text-8xl font-black tracking-tight text-slate-800">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, we couldn't find the page you're looking for.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg
                       bg-slate-900 px-5 py-3 font-medium text-white
                       transition hover:bg-slate-800"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 rounded-lg
                       border border-slate-300 bg-white px-5 py-3
                       font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
