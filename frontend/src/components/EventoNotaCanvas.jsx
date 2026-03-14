import React, { useRef, useEffect } from 'react';

const EventoNotaCanvas = ({ foto_url, nome, cidade, animal_nome, nota }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 1242;
    canvas.height = 159;

    const draw = async () => {
      ctx.fillStyle = '#F9F8F6';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6D4C3D';
      ctx.fillRect(0, 0, canvas.width, 60);

      ctx.fillStyle = '#C97E4B';
      ctx.fillRect(0, 60, canvas.width, 4);

      ctx.fillStyle = '#333333';
      ctx.font = 'bold 52px "Playfair Display", serif';
      ctx.textAlign = 'left';
      ctx.fillText(nota.toFixed(2), 32, 110);

      ctx.font = 'bold 24px "Montserrat", sans-serif';
      ctx.fillText(nome, 200, 90);

      ctx.font = '16px "Montserrat", sans-serif';
      ctx.fillText(cidade, 200, 115);

      ctx.font = 'italic 14px "Montserrat", sans-serif';
      ctx.fillText(`Montaria: ${animal_nome}`, 200, 135);

      if (foto_url) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(105, 79, 38, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(img, 67, 41, 76, 76);
          ctx.restore();
        };
        img.onerror = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(105, 79, 38, 0, Math.PI * 2);
          ctx.clip();
          ctx.fillStyle = '#F5E6DC';
          ctx.fillRect(67, 41, 76, 76);
          ctx.restore();
        };
        img.src = foto_url;
      }
    };

    draw();
  }, [foto_url, nome, cidade, animal_nome, nota]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `nota-${nome.replace(/\s+/g, '-')}-${nota.toFixed(2)}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-[#F9F8F6] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
      <canvas ref={canvasRef} className="rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.06)]" />
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-[#6D4C3D] text-white font-['Montserrat'] font-semibold rounded-lg shadow-md hover:bg-[#5a3d30] hover:scale-[1.02] active:scale-95 transition-all duration-300"
      >
        Baixar Imagem
      </button>
    </div>
  );
};

export default EventoNotaCanvas;