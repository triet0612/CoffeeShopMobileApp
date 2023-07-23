export module ImageAssets {
  const WhiteCoffee = require('../assets/WhiteCoffee.png');
  const BlackCoffee = require('../assets/BlackCoffee.png'); 
  const Cappucino = require('../assets/Cappucino.png');
  const Latte = require('../assets/Latte.png');
  export function ImageChooser(name: string) {
    return name == 'Black Coffee' || name == 'BlackCoffee' ? BlackCoffee
    : name == 'White Coffee' || name == 'WhiteCoffee'? WhiteCoffee
    : name == 'Cappucino'? Cappucino
    : name === 'Latte'? Latte: ''
  }
}

export module Color {
  export const AppThemeColor = "#324A59";
  export const TextColor = "white";
}
