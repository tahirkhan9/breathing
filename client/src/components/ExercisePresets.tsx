import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Wind, Zap } from "lucide-react";

const presets = [
  {
    id: "box-breathing",
    name: "Box Breathing",
    description: "Equal parts inhale, hold, and exhale",
    icon: Clock,
  },
  {
    id: "relaxing-breath",
    name: "Relaxing Breath",
    description: "Extended exhale for deep relaxation",
    icon: Wind,
  },
  {
    id: "energizing",
    name: "Energizing Breath",
    description: "Quick breaths to increase energy",
    icon: Zap,
  },
];

export default function ExercisePresets() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {presets.map((preset) => {
        const Icon = preset.icon;
        return (
          <Link key={preset.id} href={`/exercise/${preset.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <Icon className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle className="text-lg">{preset.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{preset.description}</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
