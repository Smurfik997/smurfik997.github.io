draw(30, 30, 15, 15, 2, document.getElementById('main_block'), '#e9ebee');
var pl1 = {
    1: "8 3",
    2: "7 4",
    3: "8 4",
    4: "9 4",
    5: "6 5",
    6: "7 5",
    7: "8 5",
    8: "9 5",
    9: "10 5",
    10: "5 6",
    11: "6 6",
    12: "7 6",
    13: "8 6",
    14: "9 6",
    15: "10 6",
    16: "11 6",
    17: "4 7",
    18: "5 7",
    19: "6 7",
    20: "7 7",
    21: "8 7",
    22: "9 7",
    23: "10 7",
    24: "11 7",
    25: "12 7",
    26: "3 8",
    27: "4 8",
    28: "5 8",
    29: "6 8",
    30: "7 8",
    31: "8 8",
    32: "9 8",
    33: "10 8",
    34: "11 8",
    35: "12 8",
    36: "13 8",
    37: "2 9",
    38: "3 9",
    39: "4 9",
    40: "5 9",
    41: "6 9",
    42: "7 9",
    43: "8 9",
    44: "9 9",
    45: "10 9",
    46: "11 9",
    47: "12 9",
    48: "13 9",
    49: "14 9",
    50: "2 10",
    51: "3 10",
    52: "4 10",
    53: "5 10",
    54: "6 10",
    55: "7 10",
    56: "8 10",
    57: "9 10",
    58: "10 10",
    59: "11 10",
    60: "12 10",
    61: "13 10",
    62: "14 10",
    63: "2 11",
    64: "3 11",
    65: "4 11",
    66: "5 11",
    67: "6 11",
    68: "7 11",
    69: "8 11",
    70: "9 11",
    71: "10 11",
    72: "11 11",
    73: "12 11",
    74: "13 11",
    75: "14 11",
    76: "3 12",
    77: "4 12",
    78: "5 12",
    79: "6 12",
    80: "7 12",
    81: "9 12",
    82: "10 12",
    83: "11 12",
    84: "12 12",
    85: "13 12",
    86: "4 13",
    87: "5 13",
    88: "6 13",
    89: "10 13",
    90: "11 13",
    91: "12 13"
}; 
var pl2 = {
    1: "8 4",
    2: "7 5",
    3: "8 5",
    4: "9 5",
    5: "6 6",
    6: "7 6",
    7: "8 6",
    8: "9 6",
    9: "10 6",
    10: "5 7",
    11: "6 7",
    12: "7 7",
    13: "8 7",
    14: "9 7",
    15: "10 7",
    16: "11 7",
    17: "4 8",
    18: "5 8",
    19: "6 8",
    20: "7 8",
    21: "8 8",
    22: "9 8",
    23: "10 8",
    24: "11 8",
    25: "12 8",
    26: "3 9",
    27: "4 9",
    28: "5 9",
    29: "6 9",
    30: "7 9",
    31: "8 9",
    32: "9 9",
    33: "10 9",
    34: "11 9",
    35: "12 9",
    36: "13 9",
    37: "3 10",
    38: "4 10",
    39: "5 10",
    40: "6 10",
    41: "7 10",
    42: "8 10",
    43: "9 10",
    44: "10 10",
    45: "11 10",
    46: "12 10",
    47: "13 10",
    48: "4 11",
    49: "5 11",
    50: "6 11",
    51: "7 11",
    52: "9 11",
    53: "10 11",
    54: "11 11",
    55: "12 11",
    56: "5 12",
    57: "6 12",
    58: "10 12",
    59: "11 12"
}
var pl3 = {
    1: "8 5",
    2: "7 6",
    3: "8 6",
    4: "9 6",
    5: "6 7",
    6: "7 7",
    7: "8 7",
    8: "9 7",
    9: "10 7",
    10: "5 8",
    11: "6 8",
    12: "7 8",
    13: "8 8",
    14: "9 8",
    15: "10 8",
    16: "11 8",
    17: "4 9",
    18: "5 9",
    19: "6 9",
    20: "7 9",
    21: "8 9",
    22: "9 9",
    23: "10 9",
    24: "11 9",
    25: "12 9",
    26: "4 10",
    27: "5 10",
    28: "6 10",
    29: "7 10",
    30: "9 10",
    31: "10 10",
    32: "11 10",
    33: "12 10",
    34: "5 11",
    35: "6 11",
    36: "10 11",
    37: "11 11"
}

function first() {
    clear(15, 15, '#e9ebee');
    draw_plates(pl1, 91, 'red');
}
function second() {
    clear(15, 15, '#e9ebee');
    draw_plates(pl2, 59, 'red');
}
function third() {
    clear(15, 15, '#e9ebee');
    draw_plates(pl3, 37, 'red');
}
function main() {
    setTimeout(first, 0);
    setTimeout(second, 1000);
    setTimeout(third, 2000);
    setTimeout(second, 3000);
}

setTimeout(first, 0);
setTimeout(second, 1000);
setTimeout(third, 2000);
setTimeout(second, 3000);
setInterval(main, 4000);