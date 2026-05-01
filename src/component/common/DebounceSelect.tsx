"use client";

import { useEffect, useRef, useState, useCallback, KeyboardEvent } from "react";
import styles from "../../styles/DebounceSelect.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Tag {
  _id: string;
  tagName: string;
}

export interface DebounceSelectProps {
  value?: Tag[];
  onChange: (tags: Tag[]) => void;
  /** Async fn that resolves to matching tags for a query string */
  fetchTags: (query: string) => Promise<Tag[]>;
  /** Called when the user wants to create a brand-new tag by name */
  createTag: (name: string) => Promise<Tag | null>;
  multiple?: boolean;
  /** Omit for unlimited selection */
  max?: number;
  placeholder?: string;
  debounceMs?: number;
  disabled?: boolean;
}

// ─── useDebounce hook ─────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DebounceSelect({
  value = [],
  onChange,
  fetchTags,
  createTag,
  multiple = true,
  max,
  placeholder = "Search or add tag…",
  debounceMs = 300,
  disabled = false,
}: DebounceSelectProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debouncedInput = useDebounce(input.trim(), debounceMs);

  // ── Fetch on debounced input change ───────────────────────────────────────
  useEffect(() => {
    if (!debouncedInput) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetchTags(debouncedInput);
        if (!cancelled) {
          setSuggestions(
            (res ?? []).filter((t) => !value.some((v) => v._id === t._id)),
          );
          setIsOpen(true);
          setActiveIndex(-1);
        }
      } catch (err) {
        console.error("[DebounceSelect] fetchTags error:", err);
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Scroll active item into view ──────────────────────────────────────────
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const el = listRef.current.children[activeIndex] as
        | HTMLElement
        | undefined;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  // ── Derived state ─────────────────────────────────────────────────────────
  const isAtMax = max !== undefined && value.length >= max;

  const trimmedInput = input.trim();

  const canCreate =
    trimmedInput.length > 0 &&
    !loading &&
    !suggestions.some(
      (t) => t.tagName.toLowerCase() === trimmedInput.toLowerCase(),
    );

  const totalOptions = suggestions.length + (canCreate ? 1 : 0);

  // ── Add a resolved tag to selection ──────────────────────────────────────
  const addTag = useCallback(
    (tag: Tag) => {
      if (value.some((t) => t._id === tag._id)) return;
      if (isAtMax) return;
      onChange(multiple ? [...value, tag] : [tag]);
      setInput("");
      setSuggestions([]);
      setIsOpen(false);
      inputRef.current?.focus();
    },
    [value, multiple, isAtMax, onChange],
  );

  // ── Create a new tag via prop, then add it ────────────────────────────────
  const handleCreate = useCallback(async () => {
    const name = trimmedInput;
    if (!name || creating || isAtMax) return;

    setCreating(true);
    try {
      const newTag = await createTag(name);
      if (newTag) addTag(newTag);
    } catch (err) {
      console.error("[DebounceSelect] createTag error:", err);
    } finally {
      setCreating(false);
    }
  }, [trimmedInput, creating, isAtMax, createTag, addTag]);

  // ── Remove a tag by id ────────────────────────────────────────────────────
  const removeTag = useCallback(
    (id: string) => {
      onChange(value.filter((t) => t._id !== id));
    },
    [value, onChange],
  );

  // ── Keyboard navigation ───────────────────────────────────────────────────
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, totalOptions - 1));
        setIsOpen(true);
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < suggestions.length) {
          addTag(suggestions[activeIndex]);
        } else if (activeIndex === suggestions.length && canCreate) {
          handleCreate();
        } else if (trimmedInput) {
          handleCreate();
        }
        break;

      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;

      case "Backspace":
        if (input === "" && value.length > 0) {
          removeTag(value[value.length - 1]._id);
        }
        break;
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  const showFooter = multiple || value.length > 0;

  return (
    <div className={styles.root} ref={containerRef}>
      {/* ── Control ── */}
      <div
        className={[styles.control, disabled ? styles.disabled : ""].join(" ")}
        onClick={() => inputRef.current?.focus()}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {value.map((tag) => (
          <span key={tag._id} className={styles.chip}>
            {tag.tagName}
            <button
              type="button"
              className={styles.chipRemove}
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag._id);
              }}
              aria-label={`Remove ${tag.tagName}`}
            >
              ✕
            </button>
          </span>
        ))}

        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder={value.length === 0 ? placeholder : ""}
          disabled={disabled || isAtMax}
          aria-autocomplete="list"
          aria-controls="ds-listbox"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {/* ── Dropdown ── */}
      {isOpen && (
        <div className={styles.dropdown} role="listbox" id="ds-listbox">
          <ul className={styles.list} ref={listRef}>
            {/* Loading */}
            {loading && (
              <li className={styles.meta}>
                <span className={styles.spinner} />
                Searching…
              </li>
            )}

            {/* Empty */}
            {!loading && suggestions.length === 0 && !canCreate && (
              <li className={styles.meta}>No matching tags</li>
            )}

            {/* Suggestions */}
            {!loading &&
              suggestions.map((tag, i) => (
                <li
                  key={tag._id}
                  role="option"
                  aria-selected={activeIndex === i}
                  className={[
                    styles.option,
                    activeIndex === i ? styles.optionActive : "",
                  ].join(" ")}
                  onMouseEnter={() => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(-1)}
                  onClick={() => addTag(tag)}
                >
                  {tag.tagName}
                </li>
              ))}

            {/* Create option */}
            {!loading && canCreate && !isAtMax && (
              <li
                role="option"
                aria-selected={activeIndex === suggestions.length}
                className={[
                  styles.option,
                  styles.createOption,
                  activeIndex === suggestions.length ? styles.optionActive : "",
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(suggestions.length)}
                onMouseLeave={() => setActiveIndex(-1)}
                onClick={handleCreate}
              >
                <span className={styles.createIcon}>+</span>
                {creating ? "Creating…" : `Create "${trimmedInput}"`}
              </li>
            )}
          </ul>

          {/* Max banner */}
          {isAtMax && (
            <div className={styles.maxBanner}>
              Maximum of {max} tag{max !== 1 ? "s" : ""} reached
            </div>
          )}
        </div>
      )}

      {/* ── Footer ── */}
      {showFooter && (
        <div className={styles.footer}>
          <span
            className={[styles.count, isAtMax ? styles.countAtMax : ""].join(
              " ",
            )}
          >
            {max !== undefined
              ? `${value.length} / ${max}`
              : value.length > 0
                ? `${value.length} selected`
                : ""}
          </span>

          {value.length > 0 && (
            <button
              type="button"
              className={styles.clearAll}
              onClick={() => onChange([])}
            >
              <svg
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="1" y1="1" x2="11" y2="11" />
                <line x1="11" y1="1" x2="1" y2="11" />
              </svg>
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
