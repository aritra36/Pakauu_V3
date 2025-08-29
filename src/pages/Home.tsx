import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChefHat, Clock, Users, Sparkles } from 'lucide-react';
import { normalizeIngredients } from '@/utils/hinglishMap';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [people, setPeople] = useState('2');
  const [dietary, setDietary] = useState('both');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!ingredients.trim()) return;
    
    const normalizedIngredients = normalizeIngredients(ingredients);
    const params = new URLSearchParams({
      ingredients: normalizedIngredients.join(','),
      people: people,
      dietary: dietary
    });
    
    navigate(`/results?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pakauu-purple-light via-white to-pakauu-orange-light">
      {/* Hero Section - Two Column Layout */}
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Column - Form */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <ChefHat className="w-5 h-5 text-pakauu-purple" />
                <span className="text-sm font-medium text-pakauu-purple">AI-Powered Recipe Discovery</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-pakauu-purple to-pakauu-orange bg-clip-text text-transparent leading-tight mb-4">
                Pakauu
              </h1>
              
              <p className="text-xl text-gray-600 max-w-md">
                Don't know what to cook? Just tell us what you have.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What ingredients do you have?
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., aloo, pyaaz, tamatar, paneer..."
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="text-base py-6 px-4 rounded-2xl border-2 border-gray-200 focus:border-pakauu-purple focus:ring-pakauu-purple transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-1" />
                      Serves
                    </label>
                    <Select value={people} onValueChange={setPeople}>
                      <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-pakauu-purple">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 person</SelectItem>
                        <SelectItem value="2">2 people</SelectItem>
                        <SelectItem value="3">3 people</SelectItem>
                        <SelectItem value="4">4 people</SelectItem>
                        <SelectItem value="5">5+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      Dietary
                    </label>
                    <Select value={dietary} onValueChange={setDietary}>
                      <SelectTrigger className="rounded-2xl border-2 border-gray-200 focus:border-pakauu-purple">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="both">Both</SelectItem>
                        <SelectItem value="veg">🥬 Veg Only</SelectItem>
                        <SelectItem value="non-veg">🍖 Non-Veg Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSearch}
                disabled={!ingredients.trim()}
                className="w-full text-lg py-7 bg-gradient-to-r from-pakauu-purple to-pakauu-orange hover:from-pakauu-purple/90 hover:to-pakauu-orange/90 text-white rounded-2xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                Generate Recipes
              </Button>

              <div className="text-center p-4 bg-pakauu-orange-light/50 rounded-2xl">
                <p className="text-sm text-gray-600">
                  💡 <strong>Pro Tip:</strong> You can type in Hinglish like "aloo, pyaaz, mirchi"
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="relative lg:block hidden">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="aspect-[4/5] bg-gradient-to-br from-pakauu-orange via-pakauu-purple to-pakauu-orange-light">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Delicious Indian Cuisine</h3>
                  <p className="text-white/90">Discover authentic recipes from your ingredients</p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ChefHat className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Props Section */}
      <div className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Pakauu?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your cooking experience with our intelligent recipe suggestions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pakauu-purple to-pakauu-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reduce Food Waste</h3>
              <p className="text-gray-600">
                Use up ingredients you already have at home and minimize food wastage while creating delicious meals.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pakauu-orange to-pakauu-purple rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Save Time on Meal Planning</h3>
              <p className="text-gray-600">
                No more wondering what to cook. Get instant recipe suggestions based on what you have available.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pakauu-purple to-pakauu-orange rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cook with Limited Ingredients</h3>
              <p className="text-gray-600">
                Create amazing dishes even when your pantry seems empty. Our smart matching finds the perfect recipes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;