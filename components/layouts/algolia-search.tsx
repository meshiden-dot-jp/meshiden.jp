"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  InstantSearch,
  Configure,
  Hits,
  Highlight,
  Snippet,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch";
import type { Hit } from "instantsearch.js";
import Link from "next/link";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY;
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "";

const searchClient =
  appId && apiKey ? algoliasearch(appId, apiKey) : null;

type ContentHit = Hit<{
  type: "blog" | "work" | "news";
  title: string;
  body?: string;
  publishedAt?: string;
  url: string;
}>;


function HitComponent({ hit, onClose }: { hit: ContentHit; onClose: () => void }) {
  return (
    <Link
      href={hit.url ?? '#'}
      onClick={onClose}
      className="flex items-start gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="min-w-0">
        <p className="text-sm text-gray-900 line-clamp-2">
          <Highlight attribute="title" hit={hit} />
        </p>
        {hit.body && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
            <Snippet attribute="body" hit={hit} />
          </p>
        )}
        {hit.publishedAt && (
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(hit.publishedAt).toLocaleDateString("ja-JP")}
          </p>
        )}
      </div>
    </Link>
  );
}

const PLACEHOLDERS = [
  "サイト内のすべての記事を検索できます",
  "例えば「Next.js」などで検索してみてください",
  "例えば「Unity」などで検索してみてください",
];

function CustomSearchBox({ placeholder }: { placeholder: string }) {
  const { refine, query } = useSearchBox();
  const [inputValue, setInputValue] = useState(query);
  const isComposing = useRef(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    if (!isComposing.current) {
      refine(e.currentTarget.value);
    }
  };

  return (
    <input
      type="search"
      value={inputValue}
      onChange={handleChange}
      onCompositionStart={() => { isComposing.current = true; }}
      onCompositionEnd={(e) => {
        isComposing.current = false;
        refine(e.currentTarget.value);
      }}
      placeholder={placeholder}
      className="font-normal flex-1 min-w-0 w-full text-sm outline-none bg-transparent placeholder:text-gray-400 [&::-webkit-search-cancel-button]:hidden py-1"
    />
  );
}

function SearchBody({ onClose }: { onClose: () => void }) {
  const { indexUiState, results } = useInstantSearch();
  const hasQuery = !!indexUiState.query;
  const noResults = hasQuery && results && results.nbHits === 0;

  return (
    <div className="max-h-[60vh] overflow-y-auto p-2 font-normal">
      {!hasQuery && (
        <p className="text-center text-sm text-gray-400 py-8 sm:py-16">
          キーワードを入力して検索
        </p>
      )}
      {hasQuery && !noResults && (
        <Hits
          hitComponent={({ hit }) => (
            <HitComponent hit={hit as unknown as ContentHit} onClose={onClose} />
          )}
          classNames={{ root: "", list: "", item: "" }}
        />
      )}
      {noResults && (
        <p className="text-center text-sm text-gray-400 py-8">
          「{results!.query}」の検索結果はありません
        </p>
      )}
    </div>
  );
}

export default function AlgoliaSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  const open = useCallback(() => {
    setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  // モーダルが開いたらコンテナにフォーカスし、入力欄への自動フォーカスを防ぐ
  useEffect(() => {
    if (isOpen) {
      containerRef.current?.focus();
    }
  }, [isOpen]);

  if (!searchClient) return null;

  return (
    <>
      <button
        onClick={open}
        aria-label="検索"
        className="p-2 hover:opacity-60 transition-opacity"
      >
        <i className="fa-solid fa-magnifying-glass text-sm" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-16 px-4 h-screen bg-black/50"
          onClick={close}
        >
          <div
            ref={containerRef}
            tabIndex={-1}
            className="bg-white rounded-3xl shadow-2xl w-full sm:max-w-[70%] lg:max-w-[50%] overflow-hidden outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <InstantSearch searchClient={searchClient} indexName={indexName}>
              <Configure distinct={1} />
              <div className="flex items-center gap-3 px-5 py-3 border-b">
                <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm flex-shrink-0" />
                <CustomSearchBox placeholder={placeholder} />
                <button
                  onClick={close}
                  aria-label="閉じる"
                  className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                >
                  <i className="fa-solid fa-xmark text-sm" />
                </button>
              </div>
              <SearchBody onClose={close} />
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
