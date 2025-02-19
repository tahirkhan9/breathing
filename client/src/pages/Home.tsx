import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExercisePresets from "@/components/ExercisePresets";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Breathing Exercises
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Take a moment to breathe and relax in
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
          </CardHeader>
          <CardContent>
            <ExercisePresets />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
