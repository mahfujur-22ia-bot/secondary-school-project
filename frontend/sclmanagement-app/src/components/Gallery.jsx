import { useEffect, useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { fetchAllGalleryImages } from "../api/galleryapi";

const Gallery = ({ limit }) => {
  const { t } = useI18n();
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGallery() {
      try {
        const data = await fetchAllGalleryImages();
        setGalleryImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  return (
    <>
      <section
        id="gallery"
        className="bg-gray-100 py-14 md:py-16 border-t border-b border-gray-200 scroll-mt-32"
      >
        <div className="container mx-auto px-4">
         <div className="relative mb-8">
          <h3
            className="text-2xl font-bold text-center text-gray-800 mb-2"
            data-aos="fade-up"
          >
            {t("photoGallery")}
          </h3>

          <p
            className="text-center text-sm text-gray-500 font-semibold"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            {t("galleryDescription")}
          </p>

          <a
            href="/gallery"
            className="absolute top-0 right-0 group inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
          >
            {t("viewPhotos")}
            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </a>
        </div>

          {loading ? (
            <p className="text-center text-gray-500 py-10">
              {t("loadingGallery")}
            </p>
          ) : galleryImages.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              {t("noGallery")}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {(limit ? galleryImages.slice(0, limit) : galleryImages).map((item, index) => (
                <div
                  key={item.id}
                  data-aos="zoom-in"
                  data-aos-delay={index * 100}
                  onClick={() => setSelectedImage(item)}
                  className="gallery-card cursor-pointer h-52 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative"
                >
                  <img
                    src={item.image}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />

                  <div className="gallery-overlay"></div>

                  <i className="gallery-icon fas fa-expand text-white"></i>

                  <span className="absolute bottom-4 left-4 right-4 text-white font-semibold text-sm">
                    {item.caption}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-red-400"
            >
              <i className="fas fa-times"></i>
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.caption}
              className="rounded-2xl w-full max-h-[80vh] object-contain shadow-2xl"
            />

            <h3 className="text-center text-white font-bold text-lg mt-5">
              {selectedImage.caption}
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
