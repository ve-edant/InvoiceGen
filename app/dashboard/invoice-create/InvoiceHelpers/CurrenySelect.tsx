// @ts-expect-error - currency-symbol-map/map is not typed but returns a map
import currencyToSymbolMap from "currency-symbol-map/map";
import getSymbolFromCurrency from "currency-symbol-map";
import React, { useEffect, useRef, useState } from "react";

// Type-safe currency map
export const currenciesWithSymbols: Record<string, string> =
  currencyToSymbolMap;

export const formatCurrencyText = (currency: string, amount: number) => {
  return `${getSymbolFromCurrency(currency)} ${amount.toFixed(2)}`;
};

export interface Currency {
  code: string;
  symbol: string;
}

interface CurrencySelectProps {
  value: string;
  onChange: (currencyCode: string) => void;
}

const currencyList: Currency[] = Object.entries(currenciesWithSymbols).map(
  ([code, symbol]) => ({ code, symbol })
);

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCurrency =
    currencyList.find((c) => c.code === value) || currencyList[0];

  // Close on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-left shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      >
        {selectedCurrency.code} {selectedCurrency.symbol}
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto text-sm"
        >
          {currencyList.map((currency) => (
            <li
              role="option"
              aria-selected={currency.code === value}
              key={currency.code}
              onClick={() => {
                onChange(currency.code);
                setOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                currency.code === value ? "bg-gray-100 font-medium" : ""
              }`}
            >
              {currency.code} {currency.symbol}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
