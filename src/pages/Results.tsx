import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, Clock, ArrowLeft } from 'lucide-react';

interface Recipe {
  id: number;
  translated_name: string;
  translated_ingredients: string[];
  Diet?: string; // "Vegetarian" or "Non-vegetarian"
  time?: string;
  Instructions?: string[];
  TranslatedInstructions?: string[];
  URL?: string;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [dietFilter, setDietFilter] = useState<'both' | 'veg' | 'non-veg'>('both');

  const query = new URLSearchParams(location.search);
  const ingredients = query.get('ingredients')?.split(',').map(i => i.trim().toLowerCase()) || [];
  const initialDietary = query.get('dietary') || 'both';

  useEffect(() => {
    setDietFilter(initialDietary as 'both' | 'veg' | 'non-veg');

    const fetchRecipes = async () => {
      try {
        const response = await fetch('/recipes.json'); // Your JSON file in public folder
        const data: Recipe[] = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error loading recipes:', error);
      }
    };
    fetchRecipes();
  }, [initialDietary]);

  const applyFilters = () => {
    if (recipes.length > 0) {
      const strictMatches = recipes.filter(recipe => {
        const recipeIngredients = recipe.translated_ingredients.map(i => i.toLowerCase());

        // Apply dietary filter
        if (dietFilter === 'veg' && recipe.Diet?.toLowerCase() !== 'vegetarian') return false;
        if (dietFilter === 'non-veg' && recipe.Diet?.toLowerCase() === 'vegetarian') return false;

        // Strict match: All input ingredients must exist in recipe
        return ingredients.every(ing => recipeIngredients.some(ri => ri.includes(ing)));
      });

      if (strictMatches.length > 0) {
        setFilteredRecipes(strictMatches);
      } else {
        // Fallback: Partial match
        const fallbackMatches = recipes.filter(recipe => {
          const recipeIngredients = recipe.translated_ingredients.map(i => i.toLowerCase());

          if (dietFilter === 'veg' && recipe.Diet?.toLowerCase() !== 'vegetarian') return false;
          if (dietFilter === 'non-veg' && recipe.Diet?.toLowerCase() === 'vegetarian') return false;

          return ingredients.some(ing => recipeIngredients.some(ri => ri.includes(ing)));
        });

        setFilteredRecipes(fallbackMatches);
      }
    }
  };

  useEffect(() => {
    applyFilters();
  }, [recipes, ingredients, dietFilter]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-pakauu-purple hover:text-pakauu-orange transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          {/* Dietary Filter Toggle */}
          <div className="flex gap-4">
            <button
              onClick={() => setDietFilter('both')}
              className={`px-4 py-2 rounded-xl font-semibold ${
                dietFilter === 'both'
                  ? 'bg-pakauu-purple text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`px-4 py-2 rounded-xl font-semibold ${
                dietFilter === 'veg'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Veg
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`px-4 py-2 rounded-xl font-semibold ${
                dietFilter === 'non-veg'
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Non-Veg
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-pakauu-purple mb-4">
          Recipe Results
        </h1>

        {/* Show number of results */}
        <p className="text-center text-gray-600 mb-10">
          {filteredRecipes.length > 0
            ? `Showing ${filteredRecipes.length} recipe(s) for your ingredients`
            : 'No recipes found for your ingredients'}
        </p>

        {filteredRecipes.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">Try different ingredients or remove filters</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">{recipe.translated_name}</h2>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <Clock className="w-4 h-4" /> {recipe.time || 'N/A'}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Ingredients:</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {recipe.translated_ingredients.slice(0, 6).map((ing, idx) => (
                        <li key={idx}>{ing}</li>
                      ))}
                    </ul>
                  </div>

                  {recipe.TranslatedInstructions && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Steps:</h3>
                      <ol className="list-decimal list-inside text-gray-600 text-sm">
                        {recipe.TranslatedInstructions.slice(0, 3).map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {recipe.URL && (
                    <a
                      href={recipe.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-4 bg-pakauu-purple text-white px-4 py-2 rounded-xl hover:bg-pakauu-purple/90"
                    >
                      View Full Recipe
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
