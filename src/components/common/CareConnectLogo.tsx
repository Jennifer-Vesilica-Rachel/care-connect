import React, { useState } from 'react';
import logoAsset from '../../assets/images/pomelli_business_profile_image_1008.png';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
}

export const CareConnectLogo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  variant = 'dark'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    sm: { iconDim: 'w-7 h-7', text: 'text-lg', subtext: 'text-[9px]' },
    md: { iconDim: 'w-9 h-9', text: 'text-xl', subtext: 'text-[10px]' },
    lg: { iconDim: 'w-11 h-11', text: 'text-2xl', subtext: 'text-xs' },
    xl: { iconDim: 'w-14 h-14', text: 'text-3xl', subtext: 'text-sm' }
  };

  const { iconDim, text } = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Exact CareConnect Logo from Assets */}
      <div
        className={`relative shrink-0 ${iconDim} rounded-xl overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-xs border border-slate-200/50 transition-transform duration-200 group-hover:scale-105`}
      >
        {!imageError ? (
          <img
            src={logoAsset}
            alt="CareConnect Logo"
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-fidelity SVG Fallback */
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="careConnectGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="35%" stopColor="#14B8A6" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="leafGrad" x1="20%" y1="20%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            <path
              d="M 36 6 L 64 6 C 68 6 71 9 71 13 L 71 29 L 87 29 C 91 29 94 32 94 36 L 94 64 C 94 68 91 71 87 71 L 71 71 L 71 87 C 71 91 68 94 64 94 L 36 94 C 32 94 29 91 29 87 L 29 71 L 13 71 C 9 71 6 68 6 64 L 6 36 C 6 32 9 29 13 29 L 29 29 L 29 13 C 29 9 32 6 36 6 Z"
              fill="none"
              stroke="url(#careConnectGrad)"
              strokeWidth="11"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M 37 54 C 35 44 44 37 56 38 C 63 39 67 42 63 46 C 56 53 43 56 37 54 Z"
              fill="url(#leafGrad)"
            />
            <path
              d="M 63 46 C 65 56 56 63 44 62 C 37 61 33 58 37 54 C 44 47 57 44 63 46 Z"
              fill="url(#leafGrad)"
            />
          </svg>
        )}
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline">
            <span
              className={`font-bold tracking-tight ${text} ${
                variant === 'light' ? 'text-white' : 'text-[#172B46]'
              }`}
            >
              Care
            </span>
            <span
              className={`font-semibold tracking-tight ${text} text-[#56B7AD]`}
            >
              Connect
            </span>
          </div>
          <span
            className={`font-medium tracking-wider uppercase text-[8px] mt-0.5 ${
              variant === 'light' ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Hospital System
          </span>
        </div>
      )}
    </div>
  );
};

