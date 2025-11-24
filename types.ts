export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum DietType {
  Vegetarian = 'Vegetarian',
  NonVegetarian = 'Non-Vegetarian',
  Vegan = 'Vegan',
}

export enum RiskLevel {
  Low = 'Low',
  Moderate = 'Moderate',
  High = 'High',
  VeryHigh = 'Very High',
}

export interface PersonalInfo {
  age: number;
  gender: Gender;
  height: number; // cm
  weight: number; // kg
  occupation: string;
  location: string;
}

export interface LifestyleData {
  smoker: boolean;
  alcohol: string; // 'None', 'Occasional', 'Frequent'
  exerciseFrequency: string; // 'None', '1-2 days', '3-4 days', '5+ days'
  dietType: DietType;
  sleepHours: number;
  stressLevel: number; // 1-5
  waterIntake: number; // liters
}

export interface SymptomsData {
  selectedSymptoms: string[];
}

export interface FamilyHistoryData {
  diabetes: boolean;
  hypertension: boolean;
  heartDisease: boolean;
  stroke: boolean;
  obesity: boolean;
}

export interface VitalsData {
  systolicBP?: number;
  diastolicBP?: number;
  heartRate?: number;
  glucose?: number;
  cholesterol?: number;
}

export interface HealthData {
  personalInfo: PersonalInfo;
  lifestyle: LifestyleData;
  symptoms: SymptomsData;
  familyHistory: FamilyHistoryData;
  vitals: VitalsData;
  bmi: number;
}

export interface RiskResult {
  score: number;
  level: RiskLevel;
  factors: string[];
  recommendations: string[];
}

export interface OverallRiskAssessment {
  diabetes: RiskResult;
  hypertension: RiskResult;
  cardiovascular: RiskResult;
  overall: RiskResult;
}

export interface DietMeal {
  name: string;
  food: string[];
  notes: string;
}

export interface DietPlan {
  type: string;
  calories: number;
  restrictions: string[];
  meals: {
    breakfast: DietMeal;
    midMorning: DietMeal;
    lunch: DietMeal;
    eveningSnack: DietMeal;
    dinner: DietMeal;
  };
  nutritionTips: string[];
}

export interface Exercise {
  name: string;
  type: string;
  duration: string;
  intensity: string;
  description: string;
  benefits: string;
}

export interface WorkoutPlan {
  level: string;
  frequency: string;
  durationPerSession: string;
  schedule: string[];
  exercises: Exercise[];
  safetyGuidelines: string[];
}

export interface LifestyleChange {
  category: string;
  title: string;
  description: string;
  actionSteps: string[];
  timeline: string;
}

export interface FullRecommendation {
  diet: DietPlan;
  workout: WorkoutPlan;
  lifestyle: LifestyleChange[];
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  distance: string;
  rating: number;
  isOpen: boolean;
}
