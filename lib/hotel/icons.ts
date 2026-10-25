import {
  Bath,
  DoorOpen,
  Flower2,
  Ship,
  Sprout,
  Sun,
  Thermometer,
  Waves,
  Wine,
} from 'lucide-react';

export const amenityIcons = {
  Bath,
  DoorOpen,
  Flower2,
  Ship,
  Sprout,
  Sun,
  Thermometer,
  Waves,
  Wine,
} as const;

export type AmenityIconName = keyof typeof amenityIcons;