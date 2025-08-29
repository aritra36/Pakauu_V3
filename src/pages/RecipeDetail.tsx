import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, ChefHat, ThumbsUp, ThumbsDown, Play, Sparkles } from 'lucide-react';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  ingredients_hinglish: string[];
  veg: boolean;
  time: string;
  steps: string[];
  video_url?: string;
}

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/recipes.json')
      .then(response => response.json())
      .then(data => {
        const foundRecipe = data.find((r: Recipe) => r.id === parseInt(id!));
        setRecipe(foundRecipe || null);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading recipe:', error);
        setLoading(false);
      });
  }, [id]);

  const handleFeedback = (type: 'useful' | 'not-useful') => {
    console.log(`Feedback given: ${type === 'useful' ? 'Useful' : 'Not Useful'}`);
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('/').pop() || url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pakauu-purple-light via-white to-pakauu-orange-light">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <Skeleton className="h-12 w-3/4 mb-6" />
            <div className="flex gap-4 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-64 w-full mb-8" />
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pakauu-purple-light via-white to-pakauu-orange-light flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md shadow-xl">
          <ChefHat className="w-16 h-16 text-pakauu-purple/60 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Recipe not found</h2>
          <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-pakauu-purple to-pakauu-orange hover:from-pakauu-purple/90 hover:to-pakauu-orange/90 text-white rounded-xl"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pakauu-purple-light via-white to-pakauu-orange-light">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6 rounded-full border-2 border-pakauu-purple text-pakauu-purple hover:bg-pakauu-purple hover:text-white transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Results
        </Button>

        {/* Recipe Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pakauu-purple/10 to-pakauu-orange/10 border-b border-pakauu-purple/10">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <CardTitle className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pakauu-purple to-pakauu-orange bg-clip-text text-transparent leading-tight mb-4">
                  {recipe.name}
                </CardTitle>
                
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-lg text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span className="font-medium">{recipe.time}</span>
                  </div>
                  
                  <Badge 
                    variant={recipe.veg ? "secondary" : "destructive"}
                    className={`${
                      recipe.veg 
                        ? "bg-green-100 text-green-800 border-green-200" 
                        : "bg-red-100 text-red-800 border-red-200"
                    } text-base px-4 py-2 font-medium`}
                  >
                    {recipe.veg ? "🥬 Vegetarian" : "🍖 Non-Vegetarian"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 space-y-8">
            {/* Ingredients Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-pakauu-purple" />
                Ingredients
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-pakauu-purple-light/50 rounded-xl">
                    <div className="w-2 h-2 bg-gradient-to-r from-pakauu-purple to-pakauu-orange rounded-full" />
                    <span className="text-gray-800 font-medium capitalize">
                      {ingredient}
                      {recipe.ingredients_hinglish[index] && (
                        <span className="text-pakauu-purple ml-2">({recipe.ingredients_hinglish[index]})</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* YouTube Video */}
            {recipe.video_url && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Play className="w-6 h-6 text-pakauu-orange" />
                  Video Tutorial
                </h3>
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                  <iframe
                    src={getYouTubeEmbedUrl(recipe.video_url)}
                    title="Recipe Video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Cooking Steps */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-pakauu-purple" />
                Cooking Instructions
              </h3>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white/60 rounded-2xl border-l-4 border-gradient-to-b from-pakauu-purple to-pakauu-orange">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pakauu-purple to-pakauu-orange text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feedback Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">How was this recipe?</h3>
              <div className="flex gap-4">
                <Button 
                  onClick={() => handleFeedback('useful')}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl px-6 py-3 font-medium transition-all duration-300 transform hover:scale-105"
                >
                  <ThumbsUp className="w-5 h-5 mr-2" />
                  Useful
                </Button>
                <Button 
                  onClick={() => handleFeedback('not-useful')}
                  variant="outline"
                  className="border-2 border-red-200 text-red-600 hover:bg-red-50 rounded-xl px-6 py-3 font-medium transition-all duration-300"
                >
                  <ThumbsDown className="w-5 h-5 mr-2" />
                  Not Useful
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipeDetail;