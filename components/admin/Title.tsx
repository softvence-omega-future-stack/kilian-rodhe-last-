import React from "react";

// Define props interface
interface TitleProps {
  text: string;
  paragraph?: string; // optional if sometimes empty
}

const Title: React.FC<TitleProps> = ({ text, paragraph }) => {
  return (
    <div className="mb-6 text-center lg:text-left sm:text-left">
      {/* Main Title */}
      <h2
        className="
        
          text-[24px] 
          font-normal          
          mb-1 
          text-[#1A1410]
        "
      >
        {text}
      </h2>

      {/* Paragraph */}
      {paragraph && (
        <p
          className="
            text-[#6b6560] 
            text-[16px] 
            font-normal
            
          "
        >
          {paragraph}
        </p>
      )}
    </div>
  );
};

export default Title;
