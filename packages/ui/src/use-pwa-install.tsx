"use client";

import { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PWAInstallState {
  isInstalled: boolean;
  isInstallable: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  install: () => Promise<void>;
}

export const checkPWAInstalled = (): boolean => {
  // スタンドアロンモードでの実行チェック
  if (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) {
    return true;
  }
  
  // iOS Safari PWA チェック
  if (typeof window !== 'undefined' && (window.navigator as any).standalone === true) {
    return true;
  }
  
  return false;
};

export const usePWAInstall = (): PWAInstallState => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // 初期チェック
    setIsInstalled(checkPWAInstalled());

    // beforeinstallprompt イベントリスナー
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // appinstalled イベントリスナー
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    // display-mode の変更を監視
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = () => {
      setIsInstalled(checkPWAInstalled());
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const install = async (): Promise<void> => {
    if (!deferredPrompt) {
      // iOS Safari などのフォールバック
      if (typeof navigator !== 'undefined' && /iPhone|iPad|iPod|Mac/.test(navigator.userAgent)) {
        alert('このアプリをインストールするには:\n1. 共有ボタン をタップ\n2. "ホーム画面に追加" を選択');
        return;
      }
      
      alert('このブラウザではPWAインストールがサポートされていません。');
      return;
    }

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWAインストールが承認されました');
      } else {
        console.log('PWAインストールが拒否されました');
      }
      
      setDeferredPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('PWAインストールエラー:', error);
    }
  };

  return {
    isInstalled,
    isInstallable,
    deferredPrompt,
    install
  };
};