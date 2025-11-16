import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen w-full">

      
      <div 
        className="flex-1 relative flex flex-col justify-center items-center text-white"
      >

        
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/merkago-bg.jpg')" }}
        />

        
        <div className="absolute inset-0 bg-[#75c354]/85 backdrop-blur-sm"></div>

        
        <div className="relative z-10 flex flex-col justify-center items-center">
          <div className="bg-white text-[#75c354] w-36 h-36 rounded-2xl flex justify-center items-center text-7xl font-bold shadow-lg">
            
          <div className="shrink-0 relative">
            <Image src="/imageAssets/MERKAGOLOGO.svg" alt="MerkaGo" width={170} height={50}/>
            
            </div>  
          </div>

          <h1 className="text-5xl font-bold mt-6">MerkaGo</h1>

          <p className="text-lg mt-4 text-center leading-relaxed">
            Light & Fresh Shopping Experience <br />
            Always Near You
          </p>
        </div>
      </div>

      
      <div className="flex-1 flex justify-center items-center bg-[#F1F8E9]">
        <div className="w-80 bg-white shadow-lg p-6 rounded-xl">

          <h2 className="text-2xl font-semibold text-[#064232] mb-4">Log In</h2>

          <button className="w-full bg-[#ffde59] py-2 rounded border border-yellow-500 mb-4 text-[#231f20] font-semibold">
            Log in with QR
          </button>

          <input
            type="text"
            placeholder="Phone number / Username / Email"
            className="w-full border p-2 rounded mt-2 bg-[#FFFDE7]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded mt-2 bg-[#FFFDE7]"
          />

          <button className="w-full bg-[#ff6b35] text-white py-2 rounded font-bold mt-4 hover:bg-[#ff8845] transition">
            LOG IN
          </button>

          <a href="#" className="text-green-700 text-sm mt-2 block text-right">
            Forgot Password?
          </a>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-sm text-gray-600">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-2">
            <button className="flex-1 bg-[#3d6656] text-white py-2 rounded">
              Facebook
            </button>
            <button className="flex-1 bg-white border py-2 rounded">
              Google
            </button>
          </div>

          <p className="text-center text-sm mt-4 text-[#1d1d1b]">
            New to MerkaGo?{" "}
            <a href="#" className="text-[#75c354] font-semibold">
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
