"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { recipeSchema } from "@/app/api/structured-data/schema";
import FeatureLayout from "../../components/FeatureLayout";

export default function StructuredDataPage() {
  const [dishName, setDishName] = useState("");

  const { submit, object, isLoading, error, stop } = useObject({
    api: "/api/structured-data",
    schema: recipeSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dishName.trim()) return;
    submit({ dish: dishName });
    setDishName("");
  };

  const exampleDishes = [
    "Chocolate Chip Cookies",
    "Spaghetti Carbonara",
    "Chicken Tikka Masala",
    "Caesar Salad",
    "Beef Stir Fry"
  ];

  return (
    <FeatureLayout
      title="Structured Data"
      description="Generate responses with predefined schemas and structured output. This demonstrates AI's ability to produce consistent, well-formatted data according to specific requirements."
      icon="📊"
      category="Data"
    >
      <div className="space-y-6">
        {/* Recipe Display */}
        {object?.recipe && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden h-[600px] sm:h-[700px] lg:h-[800px] flex flex-col">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-white">Generated Recipe</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">{object.recipe.name}</h2>

              {object?.recipe?.ingredients && (
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-4">Ingredients</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {object.recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg"
                      >
                        <p className="font-medium text-slate-900 dark:text-white">{ingredient?.name}</p>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                          {ingredient?.amount}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {object?.recipe?.steps && (
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-4">Steps</h3>
                  <ol className="space-y-3 sm:space-y-4">
                    {object.recipe.steps.map((step, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Generate a recipe</h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <input
                className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter a dish name (e.g., Chocolate Chip Cookies)"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !dishName.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl transition-colors flex items-center justify-center space-x-1 sm:space-x-2 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Generate Recipe</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 dark:text-red-400 font-medium">Error</span>
            </div>
            <p className="text-red-600 dark:text-red-300 text-sm mt-1">{error.message}</p>
          </div>
        )}

        {/* Example Dishes */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">Try these examples</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exampleDishes.map((dish, index) => (
              <button
                key={index}
                onClick={() => setDishName(dish)}
                disabled={isLoading}
                className="text-left p-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {dish}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 sm:p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">About this feature</h3>
          <ul className="text-md text-blue-800 dark:text-blue-200 space-y-2">
            <li>• Structured output with predefined schemas</li>
            <li>• Consistent data formatting and validation</li>
            <li>• Type-safe responses with TypeScript</li>
            <li>• Recipe generation with ingredients and steps</li>
            <li>• Real-time structured data creation</li>
          </ul>
        </div>
      </div>
    </FeatureLayout>
  );
}