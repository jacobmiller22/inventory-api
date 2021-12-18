export type TInventoryID = string;
export type TLocationID = string;

export interface IInventoryItem {
  name: string;
  inventory_id: TInventoryID;
  location_id: TLocationID;
  quantity: number;
  note: string;
  type: string;
}

export interface IInventoryItemMap {
  [inventory_id: TInventoryID]: IInventoryItem;
}

export interface IInventoryLocation {
  location_id: TLocationID;
  name: string;
  description: string;
  items: TInventoryID[];
}

export interface IInventoryLocationMap {
  [location_id: TLocationID]: IInventoryLocation;
}
