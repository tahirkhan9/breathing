import { useParams } from "wouter";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BreathingCircle from "@/components/BreathingCircle";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const presets = {
  "box-breathing": {
    name: "Box Breathing",
    inhaleTime: 4,
    holdTime: 4,
    exhaleTime: 4,
    rounds: 4
  },
  "relaxing-breath": {
    name: "Relaxing Breath",
    inhaleTime: 4,
    holdTime: 7,
    exhaleTime: 8,
    rounds: 4
  },
  "energizing": {
    name: "Energizing Breath",
    inhaleTime: 2,
    holdTime: 0,
    exhaleTime: 2,
    rounds: 10
  }
};

export default function Exercise() {
  const { name } = useParams();
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  const preset = presets[name as keyof typeof presets];

  const handleComplete = useCallback(async () => {
    try {
      await apiRequest("POST", "/api/sessions", {
        exerciseName: preset.name,
        inhaleTime: preset.inhaleTime,
        holdTime: preset.holdTime,
        exhaleTime: preset.exhaleTime,
        rounds: preset.rounds
      });
      toast({
        title: "Session Complete!",
        description: "Great job completing your breathing exercise.",
      });
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  }, [preset, toast]);

  useEffect(() => {
    if (!isActive) return;

    const phaseTime = {
      inhale: preset.inhaleTime,
      hold: preset.holdTime,
      exhale: preset.exhaleTime
    }[phase] * 1000;

    const timer = setTimeout(() => {
      if (phase === "inhale") {
        setPhase("hold");
      } else if (phase === "hold") {
        setPhase("exhale");
      } else {
        if (currentRound < preset.rounds) {
          setCurrentRound(r => r + 1);
          setPhase("inhale");
        } else {
          setIsActive(false);
          handleComplete();
        }
      }
    }, phaseTime);

    return () => clearTimeout(timer);
  }, [isActive, phase, currentRound, preset, handleComplete]);

  if (!preset) return <div>Exercise not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">{preset.name}</h1>
        
        <Card className="p-8 mb-6">
          <BreathingCircle 
            isActive={isActive}
            phase={phase}
            inhaleTime={preset.inhaleTime}
            holdTime={preset.holdTime}
            exhaleTime={preset.exhaleTime}
          />
          
          <div className="mt-4">
            <p className="text-2xl font-semibold text-blue-600 mb-2">
              {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </p>
            <p className="text-gray-600 mb-4">
              Round {currentRound} of {preset.rounds}
            </p>
            
            <Button
              size="lg"
              onClick={() => setIsActive(!isActive)}
              className="min-w-[120px]"
            >
              {isActive ? "Pause" : "Start"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
