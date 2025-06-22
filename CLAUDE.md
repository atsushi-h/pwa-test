# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

**重要**: 今後の全ての回答とコミュニケーションは日本語で行ってください。

## プロジェクトアーキテクチャ

これは複数のPWA（Progressive Web App）アプリケーションと共有パッケージを含む**Turboorepoモノレポ**です。このリポジトリは、Next.jsとViteの両方を使用したPWA実装のデモンストレーションです。

### モノレポ構造
- **apps/**: 2つのアプリケーションを含む
  - `next/`: `next-pwa`を使用したPWAサポート付きNext.jsアプリ（ポート3000）
  - `vite/`: `vite-plugin-pwa`を使用したPWAサポート付きVite Reactアプリ
- **packages/**: 共有ワークスペースパッケージ
  - `@repo/ui`: 共有Reactコンポーネントライブラリ
  - `@repo/eslint-config`: 共有ESLint設定
  - `@repo/typescript-config`: 共有TypeScript設定

### PWA設定
- **Next.js PWA**: `apps/next/next.config.js`で`next-pwa`を使用して設定
  - 開発環境ではPWA機能は無効
  - サービスワーカーとマニフェストは自動生成
- **Vite PWA**: `apps/vite/vite.config.ts`で`vite-plugin-pwa`を使用して設定
  - 自動更新登録
  - アプリメタデータとアイコン付きカスタムマニフェスト

## 開発コマンド

### グローバルコマンド（ルートから実行）
- `pnpm dev`: 全てのアプリを開発モードで起動
- `pnpm build`: 全てのアプリとパッケージをビルド
- `pnpm lint`: 全パッケージでリンティングを実行
- `pnpm check-types`: 全パッケージでTypeScript型チェックを実行
- `pnpm format`: Prettierを使用してコードフォーマット

### アプリ固有コマンド
- `pnpm next`: Next.jsアプリ専用のコマンドを実行
- `pnpm vite`: Viteアプリ専用のコマンドを実行

### 個別アプリ開発
- **Next.jsアプリ**: `pnpm next dev`（Turbopackを使用、ポート3000）
- **Viteアプリ**: `pnpm vite dev`

## ビルドとデプロイメント

### ビルドプロセス
- 最適化されたビルドのためにTurboの依存関係グラフを使用
- 全てのアプリはそれぞれの出力ディレクトリにビルド
- PWAアセットはビルドプロセス中に生成

### 型チェック
- 個別アプリ: アプリディレクトリで`pnpm check-types`
- グローバル: ルートから`pnpm check-types`

### リンティング
- `@repo/eslint-config`の共有ESLint設定を使用
- Next.jsアプリは厳密なリンティングのため`--max-warnings 0`を使用
- Viteアプリは標準ESLint設定を使用

## パッケージ管理

- **パッケージマネージャー**: ワークスペースサポート付きpnpm
- **Nodeバージョン**: >= 18
- **TypeScript**: 全パッケージでバージョン5.8.2
- **React**: バージョン19.1.0

## 主要技術

- **Turborepo**: キャッシュ機能付きモノレポビルドシステム
- **Next.js 15.3**: App RouterとPWAサポート
- **Vite 6.3**: ReactとPWAプラグイン
- **TypeScript**: 全パッケージで厳密な型付け
- **PWAライブラリ**: `next-pwa`と`vite-plugin-pwa`

## 開発ノート

- 両方のPWAアプリはオフライン機能が設定済み
- 共有UIコンポーネントは`@repo/ui`ワークスペースパッケージから利用可能
- 開発サーバーは競合を避けるため異なるポートで実行
- Turboはビルド依存関係とキャッシュを自動的に処理