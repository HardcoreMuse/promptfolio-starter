// components/Modal.tsx
"use client";
export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="max-w-2xl w-[92vw] bg-white rounded p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
