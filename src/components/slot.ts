import { get, writable } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { cubicInOut as easing } from 'svelte/easing';

const SYMBOLS = ["bar", "bell", "cherry", "clover", "coin"] as const;

export const SYMBOL_SIZE = 70;

type RawSymbol = typeof SYMBOLS[number];

const INITIAL_BOARD: RawSymbol[][] = [
    ["bar", "bar", "bar"],
    ["bell", "bell", "bell"],
    ["cherry", "cherry", "cherry"],
    ["clover", "clover", "clover"],
    ["coin", "coin", "coin"],
];

const ROWS_LENGTH = INITIAL_BOARD[0].length;

const generateSymbol = ({ rawSymbol }: { rawSymbol: RawSymbol }) => {
  const positionY = tweened(0);
  const symbolValue = writable<RawSymbol>(rawSymbol);

  return {
    positionY,
    symbolValue,
  };
};

export type SymbolType = ReturnType<typeof generateSymbol>;

const getRandomSymbol = () => {
  const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
  const symbol = SYMBOLS[randomIndex];
  return symbol;
};

const generateReel = ({ rawSymbols, reelIndex }: { rawSymbols: RawSymbol[], reelIndex: number }) => {
  const symbols = writable<SymbolType[]>([]);
  let targetSymbols: SymbolType[] = [];

  const move = async ({ type, duration }: { type: 'lastRowToBottom' | 'firstRowToTop'; duration: number; }) => {
    const symbolsValue = get(symbols);
    const length = symbolsValue.length;

    const MOVE_TARGET_METHOD_MAP = {
      lastRowToBottom: ({ symbolIndex }: { symbolIndex: number }) => (ROWS_LENGTH - length + symbolIndex) * SYMBOL_SIZE,
      firstRowToTop: ({ symbolIndex }: { symbolIndex: number }) => symbolIndex * SYMBOL_SIZE,
    };

    await Promise.all(
      symbolsValue.map(async (symbol, symbolIndex) => {
        const targetY = MOVE_TARGET_METHOD_MAP[type]({ symbolIndex });
        await symbol.positionY.set(targetY, { duration, easing });
      })
    );
  };

  const init = () => {
    const initialSymbols = rawSymbols.map((rawSymbol) => generateSymbol({ rawSymbol }));
    symbols.set(initialSymbols);
    move({ type: 'lastRowToBottom', duration: 0 });
  };

  const build = () => {
    const paddingRawSymbols = Array(ROWS_LENGTH).fill(null).map(() => getRandomSymbol());
    const paddingSymbols = paddingRawSymbols.map((rawSymbol) => generateSymbol({ rawSymbol }));

    symbols.update(symbolsValue => ([...targetSymbols, ...paddingSymbols, ...symbolsValue]));

    move({ type: 'lastRowToBottom', duration: 0 });
  };

  const clear = () => {
    symbols.set(targetSymbols);

    move({ type: 'lastRowToBottom', duration: 0 });
  };

  const spin = async () => {
    const tarGetRawSymbols = Array(ROWS_LENGTH).fill(null).map(() => getRandomSymbol());
    targetSymbols = tarGetRawSymbols.map((rawSymbol) => generateSymbol({ rawSymbol }));

    build();
    await move({ type: 'firstRowToTop', duration: 1000 });
    clear();
  };

  init();

  return {
    reelIndex,
    symbols,
    spin,
  };
};

export type ReelType = ReturnType<typeof generateReel>;

export const slotReels = INITIAL_BOARD.map((rawSymbols, reelIndex) => generateReel({ rawSymbols, reelIndex }));