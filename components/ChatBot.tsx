
import React, { useState } from 'react';
import { getWarholAdvice } from '../services/geminiService';
import { Sparkles, Send, Trash2, Info, X, MessageCircle } from 'lucide-react';

interface Props {
  inline?: boolean;
}

const ChatBot: React.FC<Props> = ({ inline = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: '안녕하세요! 워홀 원 모어의 AI 가이드 캡틴 워홀입니다. ✈️\n비자, 일자리, 숙소 등 무엇이든 물어보세요!' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const advice = await getWarholAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: advice || '' }]);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: 'ai', text: '안녕하세요! 워홀 원 모어의 AI 가이드 캡틴 워홀입니다. ✈️\n비자, 일자리, 숙소 등 무엇이든 물어보세요!' }]);
  };

  if (inline) {
    return (
      <div className="w-full max-w-4xl mx-auto h-[700px] flex flex-col neo-brutalism bg-white relative animate-in zoom-in-95 duration-300">
        <div className="bg-black text-white p-6 flex justify-between items-center border-b-4 border-black">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400 border-2 border-white rounded-lg">
               <Sparkles className="text-black" size={24} />
            </div>
            <div>
               <h3 className="font-black text-2xl italic tracking-tighter">AI Captain Warhol</h3>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={clearChat} className="text-gray-400 hover:text-red-500 transition-colors bg-white/10 p-2 rounded hover:bg-white/20">
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-6 bg-gray-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className="flex flex-col gap-1 max-w-[80%]">
                 <span className={`text-xs font-black uppercase ${m.role === 'user' ? 'text-right text-blue-600' : 'text-left text-gray-500'}`}>
                    {m.role === 'user' ? 'You' : 'Captain Warhol'}
                 </span>
                 <div 
                   className={`p-5 border-2 border-black font-bold text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-pre-line
                     ${m.role === 'user' ? 'bg-yellow-300 text-black rounded-tr-none' : 'bg-white text-black rounded-tl-none'}`}
                 >
                   {m.text}
                 </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
               <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-tl-none">
                  <div className="flex gap-1">
                     <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-100"></div>
                     <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-200"></div>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t-4 border-black">
          <div className="flex gap-4">
            <input 
              className="flex-grow p-4 border-2 border-black font-bold text-lg focus:outline-none focus:bg-blue-50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              placeholder="워킹홀리데이에 대해 물어보세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              className="bg-blue-600 text-white px-8 font-black border-2 border-black hover:bg-blue-700 active:translate-x-1 active:translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none flex items-center gap-2"
            >
              SEND <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Floating Widget Mode (Maintenance State)
  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-black text-white rounded-full flex items-center justify-center border-4 border-white shadow-xl hover:scale-110 transition-transform z-50 group"
        >
          <MessageCircle size={32} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-10 right-10 w-80 bg-white border-4 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 animate-in slide-in-from-bottom-10 rounded-xl overflow-hidden">
          {/* Header to close */}
          <div className="flex justify-end p-4">
             <button onClick={() => setIsOpen(false)}>
              <X size={24} className="hover:text-gray-500 transition-colors" />
            </button>
          </div>

          <div className="flex-grow flex flex-col items-center justify-center p-6 text-center pb-10">
             {/* Yellow Circle with Robot */}
             <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-4xl">🤖</span>
             </div>
             
             <h3 className="text-2xl font-black italic mb-2">AI Assistant</h3>
             
             <p className="font-bold text-gray-500 mb-6 text-sm leading-relaxed">
                현재 AI 서비스 시스템 점검 중입니다.<br/>
                더 똑똑해진 모습으로 곧 돌아올게요! 🚀
             </p>
             
             <button 
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 bg-black text-white font-black rounded-full text-sm hover:bg-gray-800 transition-colors shadow-[2px_2px_0px_0px_rgba(100,100,100,0.5)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
             >
                다른 기능 둘러보기
             </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
