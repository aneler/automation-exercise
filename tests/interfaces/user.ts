export interface RequiredUserData {
    customerfullname: string;
    email: string;
    password: string,
    firstName: string,
    lastName: string,
    address: string,
    state: string,
    city: string,
    zipcode: string,
    mobileNumber: string,
} 

export interface OptionalUserData {
  title?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  company?: string;
  address2?: string;
  news?: boolean;
  offers?: boolean;
}

export type UserData = RequiredUserData & OptionalUserData;