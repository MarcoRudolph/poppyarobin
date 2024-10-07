import Image from 'next/image';
import "../globals.css";

const UnderConstruction = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      {/* Display the first image as in About component */}
      <div className="w-full">
        <Image
          src="/images/background2.PNG"  // Replace with the actual path to your image
          alt="Header Image"
          width={1427}
          height={321}
          layout="responsive"
          objectFit="cover"
        />
      </div>

      {/* Under Construction Text */}
      <div className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold">Under Construction</h1>
        <p className="text-lg mt-5">We're working hard to bring you something amazing. Please check back soon!</p>
      </div>
    </div>
  );
};

export default UnderConstruction;
