function Hero() {
  return (
    <div className="flex flex-col items-center mb-[80px] mt-[120px] font-arvo tracking-widest">
      <h1 className="text-yellow-300 text-6xl text-center">
        The Finest Collection of
      </h1>
      <h1 className="text-yellow-300 text-6xl text-center mt-[3px]">
        Minimalist{" "}
        <span className="bg-gradient-to-r from-[#0077b6] to-[#0096c7] text-transparent bg-clip-text">
          Wallpapers
        </span>
      </h1>
      <p className="text-gray-400 text-center mt-5 text-xs font-sans">
        Carefully curated wallpapers that bring elegance and simplicity to your screens.
      </p>
      <p className="text-gray-400 text-center mt-1 text-xs font-sans">
        Download and enjoy our growing collection.
      </p>
    </div>
  );
}

export default Hero;