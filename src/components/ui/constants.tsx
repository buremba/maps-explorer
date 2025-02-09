// data from https://developers.google.com/maps/documentation/places/web-service/place-types
import {
  Car,
  Building2,
  Palette,
  GraduationCap,
  Ticket,
  Building,
  BadgeDollarSign,
  UtensilsCrossed,
  LucideIcon,
  Church,
  MapPin,
  Home,
  Bed,
  HeartPulse,
  ShoppingCart,
  Trophy,
  Bus,
  Hammer,
  Sun,
  Building2 as City,
} from "lucide-react";

type VenueType = {
  id: string;
  label: string;
  icon: LucideIcon;
};

type VenueCategory = {
  [key: string]: VenueType;
};

export const automotive: VenueCategory = {
  car_dealer: { id: "car_dealer", label: "Car Dealer", icon: Car },
  car_rental: { id: "car_rental", label: "Car Rental", icon: Car },
  car_repair: { id: "car_repair", label: "Car Repair", icon: Car },
  car_wash: { id: "car_wash", label: "Car Wash", icon: Car },
  electric_vehicle_charging_station: {
    id: "electric_vehicle_charging_station",
    label: "EV Charging Station",
    icon: Car,
  },
  gas_station: { id: "gas_station", label: "Gas Station", icon: Car },
  parking: { id: "parking", label: "Parking", icon: Car },
  rest_stop: { id: "rest_stop", label: "Rest Stop", icon: Car },
};

export const business: VenueCategory = {
  corporate_office: {
    id: "corporate_office",
    label: "Corporate Office",
    icon: Building2,
  },
  farm: { id: "farm", label: "Farm", icon: Building2 },
  ranch: { id: "ranch", label: "Ranch", icon: Building2 },
};

export const culture: VenueCategory = {
  art_gallery: { id: "art_gallery", label: "Art Gallery", icon: Palette },
  art_studio: { id: "art_studio", label: "Art Studio", icon: Palette },
  auditorium: { id: "auditorium", label: "Auditorium", icon: Palette },
  cultural_landmark: {
    id: "cultural_landmark",
    label: "Cultural Landmark",
    icon: Palette,
  },
  historical_place: {
    id: "historical_place",
    label: "Historical Place",
    icon: Palette,
  },
  monument: { id: "monument", label: "Monument", icon: Palette },
  museum: { id: "museum", label: "Museum", icon: Palette },
  performing_arts_theater: {
    id: "performing_arts_theater",
    label: "Theater",
    icon: Palette,
  },
  sculpture: { id: "sculpture", label: "Sculpture", icon: Palette },
};

export const education: VenueCategory = {
  library: { id: "library", label: "Library", icon: GraduationCap },
  preschool: { id: "preschool", label: "Preschool", icon: GraduationCap },
  primary_school: {
    id: "primary_school",
    label: "Primary School",
    icon: GraduationCap,
  },
  secondary_school: {
    id: "secondary_school",
    label: "Secondary School",
    icon: GraduationCap,
  },
  university: { id: "university", label: "University", icon: GraduationCap },
};

export const entertainment: VenueCategory = {
  adventure_sports_center: {
    id: "adventure_sports_center",
    label: "Adventure Sports",
    icon: Ticket,
  },
  amphitheatre: { id: "amphitheatre", label: "Amphitheatre", icon: Ticket },
  amusement_center: {
    id: "amusement_center",
    label: "Amusement Center",
    icon: Ticket,
  },
  amusement_park: {
    id: "amusement_park",
    label: "Amusement Park",
    icon: Ticket,
  },
  aquarium: { id: "aquarium", label: "Aquarium", icon: Ticket },
  banquet_hall: { id: "banquet_hall", label: "Banquet Hall", icon: Ticket },
  bowling_alley: { id: "bowling_alley", label: "Bowling Alley", icon: Ticket },
  casino: { id: "casino", label: "Casino", icon: Ticket },
  community_center: {
    id: "community_center",
    label: "Community Center",
    icon: Ticket,
  },
  convention_center: {
    id: "convention_center",
    label: "Convention Center",
    icon: Ticket,
  },
  cultural_center: {
    id: "cultural_center",
    label: "Cultural Center",
    icon: Ticket,
  },
  dog_park: { id: "dog_park", label: "Dog Park", icon: Ticket },
  event_venue: { id: "event_venue", label: "Event Venue", icon: Ticket },
  marina: { id: "marina", label: "Marina", icon: Ticket },
  movie_rental: { id: "movie_rental", label: "Movie Rental", icon: Ticket },
  movie_theater: { id: "movie_theater", label: "Movie Theater", icon: Ticket },
  national_park: { id: "national_park", label: "National Park", icon: Ticket },
  night_club: { id: "night_club", label: "Night Club", icon: Ticket },
  park: { id: "park", label: "Park", icon: Ticket },
  tourist_attraction: {
    id: "tourist_attraction",
    label: "Tourist Attraction",
    icon: Ticket,
  },
  visitor_center: {
    id: "visitor_center",
    label: "Visitor Center",
    icon: Ticket,
  },
  zoo: { id: "zoo", label: "Zoo", icon: Ticket },
};

export const facilities: VenueCategory = {
  public_bath: { id: "public_bath", label: "Public Bath", icon: Building },
  public_bathroom: {
    id: "public_bathroom",
    label: "Public Bathroom",
    icon: Building,
  },
  stable: { id: "stable", label: "Stable", icon: Building },
};

export const finance: VenueCategory = {
  accounting: { id: "accounting", label: "Accounting", icon: BadgeDollarSign },
  atm: { id: "atm", label: "ATM", icon: BadgeDollarSign },
  bank: { id: "bank", label: "Bank", icon: BadgeDollarSign },
};

export const foodAndDrink: VenueCategory = {
  acai_shop: { id: "acai_shop", label: "Acai Shop", icon: UtensilsCrossed },
  afghani_restaurant: {
    id: "afghani_restaurant",
    label: "Afghani Restaurant",
    icon: UtensilsCrossed,
  },
  african_restaurant: {
    id: "african_restaurant",
    label: "African Restaurant",
    icon: UtensilsCrossed,
  },
  american_restaurant: {
    id: "american_restaurant",
    label: "American Restaurant",
    icon: UtensilsCrossed,
  },
  bakery: { id: "bakery", label: "Bakery", icon: UtensilsCrossed },
  bar: { id: "bar", label: "Bar", icon: UtensilsCrossed },
  bar_and_grill: {
    id: "bar_and_grill",
    label: "Bar & Grill",
    icon: UtensilsCrossed,
  },
  barbecue_restaurant: {
    id: "barbecue_restaurant",
    label: "BBQ Restaurant",
    icon: UtensilsCrossed,
  },
  brazilian_restaurant: {
    id: "brazilian_restaurant",
    label: "Brazilian Restaurant",
    icon: UtensilsCrossed,
  },
  breakfast_restaurant: {
    id: "breakfast_restaurant",
    label: "Breakfast Restaurant",
    icon: UtensilsCrossed,
  },
  brunch_restaurant: {
    id: "brunch_restaurant",
    label: "Brunch Restaurant",
    icon: UtensilsCrossed,
  },
  buffet_restaurant: {
    id: "buffet_restaurant",
    label: "Buffet Restaurant",
    icon: UtensilsCrossed,
  },
  cafe: { id: "cafe", label: "Cafe", icon: UtensilsCrossed },
  cafeteria: { id: "cafeteria", label: "Cafeteria", icon: UtensilsCrossed },
  candy_store: {
    id: "candy_store",
    label: "Candy Store",
    icon: UtensilsCrossed,
  },
  cat_cafe: { id: "cat_cafe", label: "Cat Cafe", icon: UtensilsCrossed },
  chinese_restaurant: {
    id: "chinese_restaurant",
    label: "Chinese Restaurant",
    icon: UtensilsCrossed,
  },
  chocolate_factory: {
    id: "chocolate_factory",
    label: "Chocolate Factory",
    icon: UtensilsCrossed,
  },
  chocolate_shop: {
    id: "chocolate_shop",
    label: "Chocolate Shop",
    icon: UtensilsCrossed,
  },
  coffee_shop: {
    id: "coffee_shop",
    label: "Coffee Shop",
    icon: UtensilsCrossed,
  },
  confectionery: {
    id: "confectionery",
    label: "Confectionery",
    icon: UtensilsCrossed,
  },
  deli: { id: "deli", label: "Deli", icon: UtensilsCrossed },
  dessert_restaurant: {
    id: "dessert_restaurant",
    label: "Dessert Restaurant",
    icon: UtensilsCrossed,
  },
  dessert_shop: {
    id: "dessert_shop",
    label: "Dessert Shop",
    icon: UtensilsCrossed,
  },
  diner: { id: "diner", label: "Diner", icon: UtensilsCrossed },
  dog_cafe: { id: "dog_cafe", label: "Dog Cafe", icon: UtensilsCrossed },
  donut_shop: { id: "donut_shop", label: "Donut Shop", icon: UtensilsCrossed },
  fast_food_restaurant: {
    id: "fast_food_restaurant",
    label: "Fast Food Restaurant",
    icon: UtensilsCrossed,
  },
  fine_dining_restaurant: {
    id: "fine_dining_restaurant",
    label: "Fine Dining Restaurant",
    icon: UtensilsCrossed,
  },
  food_court: { id: "food_court", label: "Food Court", icon: UtensilsCrossed },
  french_restaurant: {
    id: "french_restaurant",
    label: "French Restaurant",
    icon: UtensilsCrossed,
  },
  greek_restaurant: {
    id: "greek_restaurant",
    label: "Greek Restaurant",
    icon: UtensilsCrossed,
  },
  hamburger_restaurant: {
    id: "hamburger_restaurant",
    label: "Hamburger Restaurant",
    icon: UtensilsCrossed,
  },
  ice_cream_shop: {
    id: "ice_cream_shop",
    label: "Ice Cream Shop",
    icon: UtensilsCrossed,
  },
  indian_restaurant: {
    id: "indian_restaurant",
    label: "Indian Restaurant",
    icon: UtensilsCrossed,
  },
  indonesian_restaurant: {
    id: "indonesian_restaurant",
    label: "Indonesian Restaurant",
    icon: UtensilsCrossed,
  },
  italian_restaurant: {
    id: "italian_restaurant",
    label: "Italian Restaurant",
    icon: UtensilsCrossed,
  },
  japanese_restaurant: {
    id: "japanese_restaurant",
    label: "Japanese Restaurant",
    icon: UtensilsCrossed,
  },
  juice_shop: { id: "juice_shop", label: "Juice Shop", icon: UtensilsCrossed },
  korean_restaurant: {
    id: "korean_restaurant",
    label: "Korean Restaurant",
    icon: UtensilsCrossed,
  },
  lebanese_restaurant: {
    id: "lebanese_restaurant",
    label: "Lebanese Restaurant",
    icon: UtensilsCrossed,
  },
  meal_delivery: {
    id: "meal_delivery",
    label: "Meal Delivery",
    icon: UtensilsCrossed,
  },
  meal_takeaway: {
    id: "meal_takeaway",
    label: "Meal Takeaway",
    icon: UtensilsCrossed,
  },
  mediterranean_restaurant: {
    id: "mediterranean_restaurant",
    label: "Mediterranean Restaurant",
    icon: UtensilsCrossed,
  },
  mexican_restaurant: {
    id: "mexican_restaurant",
    label: "Mexican Restaurant",
    icon: UtensilsCrossed,
  },
  middle_eastern_restaurant: {
    id: "middle_eastern_restaurant",
    label: "Middle Eastern Restaurant",
    icon: UtensilsCrossed,
  },
  pizza_restaurant: {
    id: "pizza_restaurant",
    label: "Pizza Restaurant",
    icon: UtensilsCrossed,
  },
  pub: { id: "pub", label: "Pub", icon: UtensilsCrossed },
  ramen_restaurant: {
    id: "ramen_restaurant",
    label: "Ramen Restaurant",
    icon: UtensilsCrossed,
  },
  restaurant: { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  asian_restaurant: {
    id: "asian_restaurant",
    label: "Asian Restaurant",
    icon: UtensilsCrossed,
  },
  bagel_shop: { id: "bagel_shop", label: "Bagel Shop", icon: UtensilsCrossed },
  sandwich_shop: {
    id: "sandwich_shop",
    label: "Sandwich Shop",
    icon: UtensilsCrossed,
  },
  seafood_restaurant: {
    id: "seafood_restaurant",
    label: "Seafood Restaurant",
    icon: UtensilsCrossed,
  },
  spanish_restaurant: {
    id: "spanish_restaurant",
    label: "Spanish Restaurant",
    icon: UtensilsCrossed,
  },
  steak_house: {
    id: "steak_house",
    label: "Steak House",
    icon: UtensilsCrossed,
  },
  sushi_restaurant: {
    id: "sushi_restaurant",
    label: "Sushi Restaurant",
    icon: UtensilsCrossed,
  },
  tea_house: { id: "tea_house", label: "Tea House", icon: UtensilsCrossed },
  thai_restaurant: {
    id: "thai_restaurant",
    label: "Thai Restaurant",
    icon: UtensilsCrossed,
  },
  turkish_restaurant: {
    id: "turkish_restaurant",
    label: "Turkish Restaurant",
    icon: UtensilsCrossed,
  },
  vegan_restaurant: {
    id: "vegan_restaurant",
    label: "Vegan Restaurant",
    icon: UtensilsCrossed,
  },
  vegetarian_restaurant: {
    id: "vegetarian_restaurant",
    label: "Vegetarian Restaurant",
    icon: UtensilsCrossed,
  },
  vietnamese_restaurant: {
    id: "vietnamese_restaurant",
    label: "Vietnamese Restaurant",
    icon: UtensilsCrossed,
  },
  wine_bar: { id: "wine_bar", label: "Wine Bar", icon: UtensilsCrossed },
};

export const geographicalAreas: VenueCategory = {
  administrative_area_level_1: {
    id: "administrative_area_level_1",
    label: "Administrative Area Level 1",
    icon: MapPin,
  },
  administrative_area_level_2: {
    id: "administrative_area_level_2",
    label: "Administrative Area Level 2",
    icon: MapPin,
  },
  country: { id: "country", label: "Country", icon: MapPin },
  locality: { id: "locality", label: "Locality", icon: MapPin },
  postal_code: { id: "postal_code", label: "Postal Code", icon: MapPin },
  school_district: {
    id: "school_district",
    label: "School District",
    icon: MapPin,
  },
};

export const government: VenueCategory = {
  city_hall: { id: "city_hall", label: "City Hall", icon: City },
  courthouse: { id: "courthouse", label: "Courthouse", icon: City },
  embassy: { id: "embassy", label: "Embassy", icon: City },
  fire_station: { id: "fire_station", label: "Fire Station", icon: City },
  government_office: {
    id: "government_office",
    label: "Government Office",
    icon: City,
  },
  local_government_office: {
    id: "local_government_office",
    label: "Local Government Office",
    icon: City,
  },
  neighborhood_police_station: {
    id: "neighborhood_police_station",
    label: "Neighborhood Police Station",
    icon: City,
  },
  police: { id: "police", label: "Police", icon: City },
  post_office: { id: "post_office", label: "Post Office", icon: City },
};

export const healthAndWellness: VenueCategory = {
  chiropractor: { id: "chiropractor", label: "Chiropractor", icon: HeartPulse },
  dental_clinic: {
    id: "dental_clinic",
    label: "Dental Clinic",
    icon: HeartPulse,
  },
  dentist: { id: "dentist", label: "Dentist", icon: HeartPulse },
  doctor: { id: "doctor", label: "Doctor", icon: HeartPulse },
  drugstore: { id: "drugstore", label: "Drugstore", icon: HeartPulse },
  hospital: { id: "hospital", label: "Hospital", icon: HeartPulse },
  massage: { id: "massage", label: "Massage", icon: HeartPulse },
  medical_lab: { id: "medical_lab", label: "Medical Lab", icon: HeartPulse },
  pharmacy: { id: "pharmacy", label: "Pharmacy", icon: HeartPulse },
  physiotherapist: {
    id: "physiotherapist",
    label: "Physiotherapist",
    icon: HeartPulse,
  },
  sauna: { id: "sauna", label: "Sauna", icon: HeartPulse },
  skin_care_clinic: {
    id: "skin_care_clinic",
    label: "Skin Care Clinic",
    icon: HeartPulse,
  },
  spa: { id: "spa", label: "Spa", icon: HeartPulse },
  tanning_studio: {
    id: "tanning_studio",
    label: "Tanning Studio",
    icon: HeartPulse,
  },
  wellness_center: {
    id: "wellness_center",
    label: "Wellness Center",
    icon: HeartPulse,
  },
  yoga_studio: { id: "yoga_studio", label: "Yoga Studio", icon: HeartPulse },
};

export const housing: VenueCategory = {
  apartment_building: {
    id: "apartment_building",
    label: "Apartment Building",
    icon: Home,
  },
  apartment_complex: {
    id: "apartment_complex",
    label: "Apartment Complex",
    icon: Home,
  },
  condominium_complex: {
    id: "condominium_complex",
    label: "Condominium Complex",
    icon: Home,
  },
  housing_complex: {
    id: "housing_complex",
    label: "Housing Complex",
    icon: Home,
  },
};

export const lodging: VenueCategory = {
  bed_and_breakfast: {
    id: "bed_and_breakfast",
    label: "Bed and Breakfast",
    icon: Bed,
  },
  budget_japanese_inn: {
    id: "budget_japanese_inn",
    label: "Budget Japanese Inn",
    icon: Bed,
  },
  campground: { id: "campground", label: "Campground", icon: Bed },
  camping_cabin: { id: "camping_cabin", label: "Camping Cabin", icon: Bed },
  cottage: { id: "cottage", label: "Cottage", icon: Bed },
  extended_stay_hotel: {
    id: "extended_stay_hotel",
    label: "Extended Stay Hotel",
    icon: Bed,
  },
  farmstay: { id: "farmstay", label: "Farmstay", icon: Bed },
  guest_house: { id: "guest_house", label: "Guest House", icon: Bed },
  hostel: { id: "hostel", label: "Hostel", icon: Bed },
  hotel: { id: "hotel", label: "Hotel", icon: Bed },
  inn: { id: "inn", label: "Inn", icon: Bed },
  japanese_inn: { id: "japanese_inn", label: "Japanese Inn", icon: Bed },
  lodging: { id: "lodging", label: "Lodging", icon: Bed },
  mobile_home_park: {
    id: "mobile_home_park",
    label: "Mobile Home Park",
    icon: Bed,
  },
  motel: { id: "motel", label: "Motel", icon: Bed },
  private_guest_room: {
    id: "private_guest_room",
    label: "Private Guest Room",
    icon: Bed,
  },
  resort_hotel: { id: "resort_hotel", label: "Resort Hotel", icon: Bed },
  rv_park: { id: "rv_park", label: "RV Park", icon: Bed },
};

export const naturalFeatures: VenueCategory = {
  beach: { id: "beach", label: "Beach", icon: Sun },
};

export const placesOfWorship: VenueCategory = {
  church: { id: "church", label: "Church", icon: Church },
  hindu_temple: { id: "hindu_temple", label: "Hindu Temple", icon: Church },
  mosque: { id: "mosque", label: "Mosque", icon: Church },
  synagogue: { id: "synagogue", label: "Synagogue", icon: Church },
};

export const services: VenueCategory = {
  astrologer: { id: "astrologer", label: "Astrologer", icon: Hammer },
  barber_shop: { id: "barber_shop", label: "Barber Shop", icon: Hammer },
  beautician: { id: "beautician", label: "Beautician", icon: Hammer },
  beauty_salon: { id: "beauty_salon", label: "Beauty Salon", icon: Hammer },
  body_art_service: {
    id: "body_art_service",
    label: "Body Art Service",
    icon: Hammer,
  },
  catering_service: {
    id: "catering_service",
    label: "Catering Service",
    icon: Hammer,
  },
  cemetery: { id: "cemetery", label: "Cemetery", icon: Hammer },
  child_care_agency: {
    id: "child_care_agency",
    label: "Child Care Agency",
    icon: Hammer,
  },
  consultant: { id: "consultant", label: "Consultant", icon: Hammer },
  courier_service: {
    id: "courier_service",
    label: "Courier Service",
    icon: Hammer,
  },
  electrician: { id: "electrician", label: "Electrician", icon: Hammer },
  florist: { id: "florist", label: "Florist", icon: Hammer },
  food_delivery: { id: "food_delivery", label: "Food Delivery", icon: Hammer },
  foot_care: { id: "foot_care", label: "Foot Care", icon: Hammer },
  funeral_home: { id: "funeral_home", label: "Funeral Home", icon: Hammer },
  hair_care: { id: "hair_care", label: "Hair Care", icon: Hammer },
  hair_salon: { id: "hair_salon", label: "Hair Salon", icon: Hammer },
  insurance_agency: {
    id: "insurance_agency",
    label: "Insurance Agency",
    icon: Hammer,
  },
  laundry: { id: "laundry", label: "Laundry", icon: Hammer },
  lawyer: { id: "lawyer", label: "Lawyer", icon: Hammer },
  locksmith: { id: "locksmith", label: "Locksmith", icon: Hammer },
  makeup_artist: { id: "makeup_artist", label: "Makeup Artist", icon: Hammer },
  moving_company: {
    id: "moving_company",
    label: "Moving Company",
    icon: Hammer,
  },
  nail_salon: { id: "nail_salon", label: "Nail Salon", icon: Hammer },
  painter: { id: "painter", label: "Painter", icon: Hammer },
  plumber: { id: "plumber", label: "Plumber", icon: Hammer },
  psychic: { id: "psychic", label: "Psychic", icon: Hammer },
  real_estate_agency: {
    id: "real_estate_agency",
    label: "Real Estate Agency",
    icon: Hammer,
  },
  roofing_contractor: {
    id: "roofing_contractor",
    label: "Roofing Contractor",
    icon: Hammer,
  },
  storage: { id: "storage", label: "Storage", icon: Hammer },
  summer_camp_organizer: {
    id: "summer_camp_organizer",
    label: "Summer Camp Organizer",
    icon: Hammer,
  },
  tailor: { id: "tailor", label: "Tailor", icon: Hammer },
  telecommunications_service_provider: {
    id: "telecommunications_service_provider",
    label: "Telecommunications Service Provider",
    icon: Hammer,
  },
  tour_agency: { id: "tour_agency", label: "Tour Agency", icon: Hammer },
  tourist_information_center: {
    id: "tourist_information_center",
    label: "Tourist Information Center",
    icon: Hammer,
  },
  travel_agency: { id: "travel_agency", label: "Travel Agency", icon: Hammer },
  veterinary_care: {
    id: "veterinary_care",
    label: "Veterinary Care",
    icon: Hammer,
  },
};

export const shopping: VenueCategory = {
  asian_grocery_store: {
    id: "asian_grocery_store",
    label: "Asian Grocery Store",
    icon: ShoppingCart,
  },
  auto_parts_store: {
    id: "auto_parts_store",
    label: "Auto Parts Store",
    icon: ShoppingCart,
  },
  bicycle_store: {
    id: "bicycle_store",
    label: "Bicycle Store",
    icon: ShoppingCart,
  },
  book_store: { id: "book_store", label: "Book Store", icon: ShoppingCart },
  butcher_shop: {
    id: "butcher_shop",
    label: "Butcher Shop",
    icon: ShoppingCart,
  },
  cell_phone_store: {
    id: "cell_phone_store",
    label: "Cell Phone Store",
    icon: ShoppingCart,
  },
  clothing_store: {
    id: "clothing_store",
    label: "Clothing Store",
    icon: ShoppingCart,
  },
  convenience_store: {
    id: "convenience_store",
    label: "Convenience Store",
    icon: ShoppingCart,
  },
  department_store: {
    id: "department_store",
    label: "Department Store",
    icon: ShoppingCart,
  },
  discount_store: {
    id: "discount_store",
    label: "Discount Store",
    icon: ShoppingCart,
  },
  electronics_store: {
    id: "electronics_store",
    label: "Electronics Store",
    icon: ShoppingCart,
  },
  food_store: { id: "food_store", label: "Food Store", icon: ShoppingCart },
  furniture_store: {
    id: "furniture_store",
    label: "Furniture Store",
    icon: ShoppingCart,
  },
  gift_shop: { id: "gift_shop", label: "Gift Shop", icon: ShoppingCart },
  grocery_store: {
    id: "grocery_store",
    label: "Grocery Store",
    icon: ShoppingCart,
  },
  hardware_store: {
    id: "hardware_store",
    label: "Hardware Store",
    icon: ShoppingCart,
  },
  home_goods_store: {
    id: "home_goods_store",
    label: "Home Goods Store",
    icon: ShoppingCart,
  },
  home_improvement_store: {
    id: "home_improvement_store",
    label: "Home Improvement Store",
    icon: ShoppingCart,
  },
  jewelry_store: {
    id: "jewelry_store",
    label: "Jewelry Store",
    icon: ShoppingCart,
  },
  liquor_store: {
    id: "liquor_store",
    label: "Liquor Store",
    icon: ShoppingCart,
  },
  market: { id: "market", label: "Market", icon: ShoppingCart },
  pet_store: { id: "pet_store", label: "Pet Store", icon: ShoppingCart },
  shoe_store: { id: "shoe_store", label: "Shoe Store", icon: ShoppingCart },
  shopping_mall: {
    id: "shopping_mall",
    label: "Shopping Mall",
    icon: ShoppingCart,
  },
  sporting_goods_store: {
    id: "sporting_goods_store",
    label: "Sporting Goods Store",
    icon: ShoppingCart,
  },
  store: { id: "store", label: "Store", icon: ShoppingCart },
  supermarket: { id: "supermarket", label: "Supermarket", icon: ShoppingCart },
  warehouse_store: {
    id: "warehouse_store",
    label: "Warehouse Store",
    icon: ShoppingCart,
  },
  wholesaler: { id: "wholesaler", label: "Wholesaler", icon: ShoppingCart },
};

export const sports: VenueCategory = {
  arena: { id: "arena", label: "Arena", icon: Trophy },
  athletic_field: {
    id: "athletic_field",
    label: "Athletic Field",
    icon: Trophy,
  },
  fishing_charter: {
    id: "fishing_charter",
    label: "Fishing Charter",
    icon: Trophy,
  },
  fishing_pond: { id: "fishing_pond", label: "Fishing Pond", icon: Trophy },
  fitness_center: {
    id: "fitness_center",
    label: "Fitness Center",
    icon: Trophy,
  },
  golf_course: { id: "golf_course", label: "Golf Course", icon: Trophy },
  gym: { id: "gym", label: "Gym", icon: Trophy },
  ice_skating_rink: {
    id: "ice_skating_rink",
    label: "Ice Skating Rink",
    icon: Trophy,
  },
  playground: { id: "playground", label: "Playground", icon: Trophy },
  ski_resort: { id: "ski_resort", label: "Ski Resort", icon: Trophy },
  sports_activity_location: {
    id: "sports_activity_location",
    label: "Sports Activity Location",
    icon: Trophy,
  },
  sports_club: { id: "sports_club", label: "Sports Club", icon: Trophy },
  sports_coaching: {
    id: "sports_coaching",
    label: "Sports Coaching",
    icon: Trophy,
  },
  sports_complex: {
    id: "sports_complex",
    label: "Sports Complex",
    icon: Trophy,
  },
  stadium: { id: "stadium", label: "Stadium", icon: Trophy },
  swimming_pool: { id: "swimming_pool", label: "Swimming Pool", icon: Trophy },
};

export const transportation: VenueCategory = {
  airport: { id: "airport", label: "Airport", icon: Bus },
  airstrip: { id: "airstrip", label: "Airstrip", icon: Bus },
  bus_station: { id: "bus_station", label: "Bus Station", icon: Bus },
  bus_stop: { id: "bus_stop", label: "Bus Stop", icon: Bus },
  ferry_terminal: { id: "ferry_terminal", label: "Ferry Terminal", icon: Bus },
  heliport: { id: "heliport", label: "Heliport", icon: Bus },
  international_airport: {
    id: "international_airport",
    label: "International Airport",
    icon: Bus,
  },
  light_rail_station: {
    id: "light_rail_station",
    label: "Light Rail Station",
    icon: Bus,
  },
};

// Merge all categories
export const allVenues: VenueCategory = {
  ...automotive,
  ...business,
  ...culture,
  ...education,
  ...entertainment,
  ...facilities,
  ...finance,
  ...foodAndDrink,
  ...geographicalAreas,
  ...government,
  ...healthAndWellness,
  ...housing,
  ...lodging,
  ...naturalFeatures,
  ...placesOfWorship,
  ...services,
  ...shopping,
  ...sports,
  ...transportation,
};
