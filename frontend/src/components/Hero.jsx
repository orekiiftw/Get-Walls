function Hero() {
  return (
    <div className="flex flex-col items-center mb-[40px] md:mb-[80px] mt-[60px] md:mt-[120px] font-arvo tracking-widest px-4">
      <h1 className="text-yellow-300 text-3xl md:text-6xl text-center">
        The Finest Collection of
      </h1>
      <h1 className="text-yellow-300 text-3xl md:text-6xl text-center mt-[3px]">
        Minimalist{" "}
        <span className="bg-gradient-to-r from-[#0077b6] to-[#0096c7] text-transparent bg-clip-text">
          Wallpapers
        </span>
      </h1>
      <p className="text-gray-400 text-center mt-4 md:mt-5 text-[10px] md:text-xs font-sans px-2">
        Carefully curated wallpapers that bring elegance and simplicity to your screens.
      </p>
      <p className="text-gray-400 text-center mt-1 text-[10px] md:text-xs font-sans px-2">
        Download and enjoy our growing collection.
      </p>
    </div>
  );
}

export default Hero;