import { useEffect, useState } from "react";
import axios from "axios";
import { LuDownload } from "react-icons/lu";
import InfiniteScroll from 'react-infinite-scroll-component';

function MainSection() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/walls`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allWalls = data?.response || [];
  const desktopWalls = data?.response.filter(wall => wall.type === "desktop") || [];
  const mobileWalls = data?.response.filter(wall => wall.type === "mobile") || [];

  const getSpanClasses = (wall) => {
    const aspectRatio = wall.width / wall.height;
    if (wall.type === 'desktop') {
      
      return aspectRatio > 1 ? 'col-span-1 row-span-2' : 'col-span-2 row-span-1';
    } else {
      
      return aspectRatio > 1.5 ? 'col-span-2 row-span-1' : 'col-span-1 row-span-2';
    }
  };

  if (error) {
    return <div className="flex items-center justify-center min-h-[400px] text-red-500">{error}</div>;
  }

  return (
    <div className="w-[80%] mx-auto px-4 pb-16">
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          {["all", "desktop", "mobile"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab ? 'bg-white shadow text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Wallpapers
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-full"></div>
          ))}
        </div>
      )}

      {/* Wallpapers Grid */}
      {!loading && (
        <InfiniteScroll
          dataLength={data?.response.length || 0}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[250px] gap-4"> {/* Reduced gap */}
            {(activeTab === 'all' ? allWalls : activeTab === 'desktop' ? desktopWalls : mobileWalls).map((wall, index) => (
              <div key={index} className={`relative rounded-xl overflow-hidden group ${getSpanClasses(wall)}`}>
                <img
                  src={wall.optimizedUrls}
                  alt={`${wall.type} wallpaper`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/500';
                  }}
                />
                <div className="absolute top-2 left-2 flex gap-2">
                  <span className="bg-yellow-400/90 text-black text-xs px-2 py-1 rounded-full">{wall.quality || '1440p'}</span>
                  <span className="bg-gray-800/90 text-white text-xs px-2 py-1 rounded-full">{wall.type}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    className="absolute bottom-4 right-4 bg-black rounded-full p-3 shadow-lg transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      if(!wall.downloadUrl){
                        console.error("Download URL is missing for this wallpaper.");
                        return;
                      }
                      window.location.href = wall.downloadUrl
                    }
                    }
                  >
                    <LuDownload className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}

      {/* Counter */}
      <div className="mt-8 text-center text-gray-600">
        {!loading && (
          <p>
            Showing {activeTab === 'all' ? allWalls.length : activeTab === 'desktop' ? desktopWalls.length : mobileWalls.length} wallpapers
          </p>
        )}
      </div>
    </div>
  );
}

export default MainSection;