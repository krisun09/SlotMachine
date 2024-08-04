export const PAYLINES = [
    [0, 0, 0, 0, 0], // Top row
    [1, 1, 1, 1, 1], // Middle row
    [2, 2, 2, 2, 2], // Bottom row
    [0, 1, 2, 1, 0], // V: top left to bottom right
    [2, 1, 0, 1, 2], // V: bottom left to top right

    [0, 0, 0],
    [1, 1, 1],
    [2, 2, 2]

];

export const symbolWidth = 75;
export const centerX = innerWidth / 2 - 2.5 * symbolWidth;
export const centerY = innerHeight / 2 - 2 * symbolWidth // 1.5*symbolPosition is the proper center. but 2 looks prettier XD

export const SYMBOLS = ["bar", "bell", "cherry", "clover", "coin"];

export const numOfReel = 5;
export const visibleSymbolsPerReel = 3;
export const totalSymbolsPerReel = visibleSymbolsPerReel + 3;
export const visibleYPos = [centerY-symbolWidth, centerY, centerY+symbolWidth];
export const possibleYPos: number[] = [];
for (let i = 0; i < totalSymbolsPerReel; i++) {
    // (232.5, 307.5, 382.5, 457.5, 532.5, 607.5)
    possibleYPos.push(centerY + (i - 1) * symbolWidth)
    //7.5, 82.5, 157.5,
}
