import { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { createContactMessage } from "../api/contactApi";

const Contact = () => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    contact_info: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.contact_info ||
      !formData.message
    ) {
      alert(t("fillAllFields"));
      return;
    }

    try {
      setLoading(true);

      await createContactMessage(formData);

      alert(t("successMessage"));

      setFormData({
        name: "",
        contact_info: "",
        message: "",
      });
    } catch {
      alert(t("errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="container mx-auto px-4 py-14 md:py-16 scroll-mt-32"
    >
      <h3
        className="text-2xl font-bold text-gray-800 mb-8 pb-3 border-b-2 border-green-600 inline-block"
        data-aos="fade-up"
      >
        {t("contactTitle")}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Contact */}
        <div
          className="card-premium bg-white p-6 rounded-2xl card-shadow border border-gray-100 space-y-5"
          data-aos="fade-right"
        >
          <h4 className="font-bold text-lg text-green-800">
            {t("contactHeading")}
          </h4>

          <div className="space-y-3 text-sm">
            <p>
              <strong>{t("address")}:</strong> ছমির মুন্সির রোড এলাকা, ইয়ারপুর, কাবিলপুর, নোয়াখালী।
            </p>

            <p>
              <strong>{t("mobile")}:</strong> +৮৮০১XXXXXXXXX
            </p>

            <p>
              <strong>{t("email")}:</strong> info@earpurhighschool.edu.bd
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            <input
              type="text"
              name="name"
              placeholder={t("contactFormName")}
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <input
              type="text"
              name="contact_info"
              placeholder={t("contactFormContact")}
              value={formData.contact_info}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <textarea
              rows="4"
              name="message"
              placeholder={t("contactFormMessage")}
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800"
            >
              {loading ? t("sending") : t("sendMessage")}
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div
          className="card-premium bg-white p-6 rounded-xl card-shadow border border-gray-100 flex flex-col justify-between"
          data-aos="fade-left"
        >
          <div>
          <h4 className="font-bold text-lg text-green-800 mb-4 ">
            {t("mapTitle")}
          </h4>
          <p className="text-sm text-gray-500 mb-4 font-semibold ">{t("mapDescription")}</p>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg  border-2 border-dashed border-gray-200 text-center flex flex-col items-center justify-center py-12">
            <i className="fas fa-map-marked-alt text-4xl text-green-700 mb-4"></i>

            <a
              href="https://www.google.com/maps/search/?api=1&query=W6Q7%2BJJQ%20Kabilpur"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
            >
              <i className="fas fa-navigation"></i> {t("navigateMap")}

            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;