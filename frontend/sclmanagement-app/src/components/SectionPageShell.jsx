import { Link } from "react-router-dom";

const SectionPageShell = ({ title, description, children }) => {
  return (
    <section className="container mx-auto px-4 py-8 scroll-mt-32">
      <div className="card-premium bg-white p-6 md:p-8 rounded-2xl card-shadow border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
          </div>
          <Link to="/" className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors">
            হোমে ফিরুন
          </Link>
        </div>

        {children}
      </div>
    </section>
  );
};

export default SectionPageShell;
