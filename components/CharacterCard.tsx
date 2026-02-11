
import React from 'react';
import { CharacterInfo } from '../types';

interface Props {
  character: CharacterInfo;
  imageSource: string; // The base64 or source from the user prompt
}

const CharacterCard: React.FC<Props> = ({ character, imageSource }) => {
  return (
    <div className={`flex flex-col neo-brutalism ${character.color} overflow-hidden transition-transform hover:scale-105`}>
      <div className="h-64 bg-white border-b-3 border-black relative overflow-hidden">
        {/* We use object-fit and position to zoom into the "Front View" of the blueprint images */}
        <img 
          src={imageSource} 
          alt={character.name} 
          className="w-[300%] max-w-none h-full object-cover object-left" 
        />
        <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-xs font-bold uppercase">
          Expert Mode
        </div>
      </div>
      <div className="p-6 bg-white flex-grow">
        <h3 className="text-2xl font-black mb-1 italic uppercase tracking-tighter">{character.name}</h3>
        <p className="text-sm font-bold text-gray-600 mb-4">{character.role}</p>
        <p className="text-gray-800 leading-tight">{character.description}</p>
        <button className="mt-6 w-full py-3 bg-black text-white font-black hover:bg-gray-800 transition-colors uppercase italic">
          Learn More →
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
