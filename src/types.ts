export interface TypeCabin {
  id: number;
  created_at: string;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
}
export interface TypeForm {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: File;
}
export interface TypeSettings {
  id: number;
  created_at: string;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
export interface TypeUpdateSetting {
  [x: string]: string;
}

// export interface TypBooking {
//   cabin: number;
//   guest: string;
//   date: number;
//   amount: number;
//   status: boolean;
// }
export interface TypeBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: string;
  guests: {
    fullName: string;
    email: string;
  };
  cabins: {
    name: string;
  };
}

export interface TypeDetailBooking {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  hasBreakfast: boolean;
  observations: string;
  isPaid: boolean;
  guests: {
    fullName: string;
    email: string;
    country: string;
    countryFlag: string;
    nationalID: string;
  };
  cabins: {
    name: string;
  };
  status: string;
}

export interface TypeQueryBooking {
  count: number;
  data: {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    status: string;
    guests: {
      fullName: string;
      email: string;
    };
    cabins: {
      name: string;
    };
  }[];
}

export interface TypeLogin {
  email: string;
  password: string;
}

export interface TypeSignUp {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface IStaysAfterDate {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinId: number;
  guestId: {
    guests: {
      fullName: string;
    };
  };
}

export interface IBookingsAfterDate {
  created_at: string;
  totalPrice: number;
  extrasPrice: number;
}

export interface ITodayActivity {
  cabinId: number;
  cabinPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  guests: {
    fullName: string;
    nationality: string;
    countryFlag: string;
  };
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: string;
  totalPrice: number;
}
