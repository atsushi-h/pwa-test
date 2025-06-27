"use client";

import { usePWAInstall } from "./use-pwa-install";

interface PWAInstallButtonProps {
  className?: string;
  installText?: string;
  promptText?: string;
}

export const PWAInstallButton = ({
  className = "",
  installText = "アプリをインストール",
  promptText = "PWAをインストールしますか？"
}: PWAInstallButtonProps) => {
  const { isInstalled, isInstallable, install } = usePWAInstall();

  // インストール済みまたはインストール不可の場合は表示しない
  if (isInstalled || !isInstallable) {
    return null;
  }

  const defaultClassName = `
    inline-flex items-center justify-center
    px-4 py-2 
    bg-blue-600 hover:bg-blue-700 
    text-white font-medium rounded-lg
    transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `.replace(/\s+/g, ' ').trim();

  return (
    <button
      onClick={install}
      className={className || defaultClassName}
      aria-label={promptText}
      title={promptText}
    >
      <svg 
        className="w-4 h-4 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
        />
      </svg>
      {installText}
    </button>
  );
};