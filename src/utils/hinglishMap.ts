export const hinglishMap: Record<string, string> = {
  "aloo": "potato",
  "pyaaz": "onion", 
  "mirchi": "chili",
  "tamatar": "tomato",
  "jeera": "cumin",
  "dhania": "coriander",
  "haldi": "turmeric",
  "tel": "oil",
  "rajma": "kidney beans",
  "lahsun": "garlic",
  "adrak": "ginger",
  "murgh": "chicken",
  "nariyal": "coconut",
  "masala": "spices",
  "dal": "lentils",
  "palak": "spinach",
  "paneer": "cottage cheese",
  "malai": "cream",
  "machli": "fish",
  "ghee": "clarified butter"
};

export const normalizeIngredients = (input: string): string[] => {
  return input
    .split(',')
    .map(ingredient => {
      const trimmed = ingredient.trim().toLowerCase();
      return hinglishMap[trimmed] || trimmed;
    })
    .filter(ingredient => ingredient.length > 0);
};