import { HealthData, OverallRiskAssessment, DietPlan, WorkoutPlan, LifestyleChange, FullRecommendation, DietType } from '../types';

export const generateDietPlan = (risk: OverallRiskAssessment, data: HealthData): DietPlan => {
  const isVegetarian = data.lifestyle.dietType === DietType.Vegetarian || data.lifestyle.dietType === DietType.Vegan;
  const calorieTarget = data.personalInfo.gender === 'Male' ? 2200 : 1800; // Simplified BMR logic
  let type = "Balanced Wellness";
  let nutritionTips = [
    "Stay hydrated with at least 3 liters of water.",
    "Eat slowly and mindful of portion sizes."
  ];

  if (risk.diabetes.level === 'High' || risk.diabetes.level === 'Very High') {
    type = "Low-Glycemic (Diabetic Friendly)";
    nutritionTips.push("Avoid sugary drinks and refined flours.");
    nutritionTips.push("Focus on fiber-rich foods to regulate blood sugar.");
  } else if (risk.cardiovascular.level === 'High' || risk.cardiovascular.level === 'Very High') {
    type = "Heart Healthy (DASH/Mediterranean)";
    nutritionTips.push("Limit saturated fats and sodium.");
    nutritionTips.push("Increase intake of Omega-3 fatty acids.");
  } else if (data.bmi > 25) {
    type = "Weight Management";
    nutritionTips.push("Create a calorie deficit.");
    nutritionTips.push("Focus on high-protein, low-carb meals.");
  }

  return {
    type,
    calories: calorieTarget,
    restrictions: ["Processed sugar", "Trans fats", "Excess sodium"],
    nutritionTips,
    meals: {
      breakfast: {
        name: "Breakfast",
        food: isVegetarian 
          ? ["Oatmeal with berries and nuts", "Greek yogurt or plant-based yogurt"] 
          : ["Egg white omelet with spinach", "Whole grain toast"],
        notes: "High fiber and protein start."
      },
      midMorning: {
        name: "Mid-Morning Snack",
        food: ["Apple or Pear", "Handful of almonds"],
        notes: "Keep energy steady."
      },
      lunch: {
        name: "Lunch",
        food: isVegetarian 
          ? ["Quinoa bowl with chickpeas/lentils", "Mixed green salad with olive oil"] 
          : ["Grilled chicken breast", "Steamed broccoli", "Brown rice"],
        notes: "Balanced macro-nutrients."
      },
      eveningSnack: {
        name: "Evening Snack",
        food: ["Carrot sticks with hummus", "Green tea"],
        notes: "Light and hydrating."
      },
      dinner: {
        name: "Dinner",
        food: isVegetarian 
          ? ["Grilled tofu or paneer stir-fry", "Vegetable soup"] 
          : ["Baked fish or lean turkey", "Roasted asparagus"],
        notes: "Eat 2 hours before bed. Lightest meal."
      }
    }
  };
};

export const generateWorkoutPlan = (risk: OverallRiskAssessment, data: HealthData): WorkoutPlan => {
  let level = "Beginner";
  if (data.lifestyle.exerciseFrequency === '3-4 days') level = "Intermediate";
  if (data.lifestyle.exerciseFrequency === '5+ days') level = "Advanced";

  const isObese = data.bmi > 30;
  const hasHeartRisk = risk.cardiovascular.level === 'High' || risk.cardiovascular.level === 'Very High';

  let exercises = [
    {
      name: "Brisk Walking",
      type: "Cardio",
      duration: "20-30 mins",
      intensity: "Low-Moderate",
      description: "Walk at a pace where you can talk but not sing.",
      benefits: "Improves cardiovascular health and burns calories."
    },
    {
      name: "Bodyweight Squats",
      type: "Strength",
      duration: "3 sets of 10",
      intensity: "Moderate",
      description: "Stand with feet shoulder-width apart, lower hips like sitting in a chair.",
      benefits: "Strengthens legs and core."
    }
  ];

  if (isObese || hasHeartRisk) {
    exercises = [
      {
        name: "Water Aerobics or Swimming",
        type: "Cardio",
        duration: "30 mins",
        intensity: "Low Impact",
        description: "Movement in water to reduce joint stress.",
        benefits: "Full body workout without impact."
      },
      {
        name: "Chair Yoga",
        type: "Flexibility",
        duration: "15 mins",
        intensity: "Low",
        description: "Gentle stretching while seated.",
        benefits: "Improves circulation and reduces stiffness."
      }
    ];
  } else if (level === "Advanced") {
    exercises.push({
      name: "HIIT Intervals",
      type: "Cardio",
      duration: "15 mins",
      intensity: "High",
      description: "30s sprint, 30s rest.",
      benefits: "Maximizes calorie burn."
    });
  }

  return {
    level,
    frequency: level === "Beginner" ? "3 days/week" : "5 days/week",
    durationPerSession: level === "Beginner" ? "30 mins" : "45-60 mins",
    schedule: ["Monday: Cardio", "Wednesday: Strength", "Friday: Flexibility/Cardio"],
    exercises,
    safetyGuidelines: [
      "Always warm up for 5 mins before starting.",
      "Hydrate before, during, and after exercise.",
      hasHeartRisk ? "Monitor heart rate and do not exceed 120 bpm without doctor approval." : "Listen to your body."
    ]
  };
};

export const generateLifestyleChanges = (risk: OverallRiskAssessment, data: HealthData): LifestyleChange[] => {
  const changes: LifestyleChange[] = [];

  // Sleep
  if (data.lifestyle.sleepHours < 7) {
    changes.push({
      category: "Sleep Hygiene",
      title: "Improve Sleep Duration",
      description: "You are getting less than recommended sleep, which increases cortisol and risk of chronic disease.",
      actionSteps: ["Set a consistent bedtime.", "No screens 1 hour before bed.", "Keep room cool and dark."],
      timeline: "2 weeks to establish habit"
    });
  }

  // Stress
  if (data.lifestyle.stressLevel > 3) {
    changes.push({
      category: "Mental Health",
      title: "Stress Management Protocol",
      description: "High stress negatively impacts blood pressure and heart health.",
      actionSteps: ["Practice 10 mins of daily meditation.", "Try 4-7-8 breathing technique.", "Schedule 'me-time' daily."],
      timeline: "Immediate start"
    });
  }

  // Smoking
  if (data.lifestyle.smoker) {
    changes.push({
      category: "Habit Cessation",
      title: "Quit Smoking",
      description: "Smoking is a primary driver for cardiovascular disease and hypertension.",
      actionSteps: ["Identify triggers.", "Consult a doctor for cessation aids.", "Join a support group."],
      timeline: "3-6 months"
    });
  }

  // Hydration
  if (data.lifestyle.waterIntake < 2) {
    changes.push({
      category: "Hydration",
      title: "Increase Water Intake",
      description: "Dehydration affects metabolism and energy levels.",
      actionSteps: ["Carry a water bottle.", "Set reminders to drink every hour."],
      timeline: "1 week"
    });
  }

  return changes;
};

export const getDetailedRecommendations = (risk: OverallRiskAssessment, data: HealthData): FullRecommendation => {
  return {
    diet: generateDietPlan(risk, data),
    workout: generateWorkoutPlan(risk, data),
    lifestyle: generateLifestyleChanges(risk, data),
  };
};
