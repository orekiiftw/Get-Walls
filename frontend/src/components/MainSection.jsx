import { useEffect, useState } from "react";
import axios from "axios";
import { LuDownload } from "react-icons/lu";
import InfiniteScroll from "react-infinite-scroll-component";

const TABS = ["all", "desktop", "mobile"];

function MainSection() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://getwalls.osc-fr1.scalingo.io/walls");
        setData(response.data?.response || []);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterWalls = () => {
    if (activeTab === "all") return data;
    return data.filter((wall) => wall.type === activeTab);
  };

  const getGridSpan = (wall) => {
    const isWide = wall.width / wall.height > 1.5;
    if (wall.type === "desktop") {
      return isWide ? "md:col-span-3 md:row-span-1" : "md:col-span-2 md:row-span-1";
    } else {
      return isWide ? "md:col-span-2 md:row-span-1" : "md:col-span-1 md:row-span-2";
    }
  };

  const walls = filterWalls();

  if (error) {
    return <div className="flex items-center justify-center min-h-[400px] text-red-500">{error}</div>;
  }

  return (
    <section className="w-[90%] mx-auto px-4 pb-16 max-w-7xl">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex gap-2 p-1 bg-gray-800/40 rounded-lg">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-medium capitalize transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/30"
              }`}
            >
              {tab} Wallpapers
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-[200px]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <InfiniteScroll dataLength={walls.length} hasMore={false} loader={<h4>Loading...</h4>}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-[200px]">
            {walls.map((wall, index) => (
              <div
                key={index}
                className={`relative rounded-xl overflow-hidden group ${getGridSpan(wall)}`}
              >
                <img
                  src={wall.optimizedUrls || "https://via.placeholder.com/500"}
                  alt={`${wall.type} wallpaper`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="bg-yellow-400/90 text-black text-xs px-2 py-1 rounded-full">
                    {wall.quality || "1440p"}
                  </span>
                  <span className="bg-gray-800/90 text-white text-xs px-2 py-1 rounded-full">
                    {wall.type}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                  <button
                    onClick={() => wall.downloadUrl && window.open(wall.downloadUrl, "_blank")}
                    className="bg-black rounded-full p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    <LuDownload className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* Counter */}
      {!loading && (
        <p className="mt-8 text-center text-gray-600 text-sm">
          Showing {walls.length} wallpapers
        </p>
      )}
    </section>
  );
}

export default MainSection;