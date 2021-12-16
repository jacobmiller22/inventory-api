import { readFile, writeFile } from 'fs/promises';
import {
  TLocationID,
  TInventoryID,
  IInventoryItem,
  IInventoryLocation,
  IInventoryLocationMap,
  IInventoryItemMap,
} from '../../interfaces/Inventory';
import { DB_PATH, ALL_FILE, LOCATIONS_FILE } from '../../consts';

interface IDataController {
  getEntireInventory: () => Promise<IInventoryItemMap>;
  createInventoryItem: (new_item: IInventoryItem) => Promise<any>;
  updateInventoryItem: (i_id: TInventoryID, new_item: IInventoryItem) => Promise<any>;
  searchInventoryItem: (field: string, value: string | number | TInventoryID | TLocationID) => Promise<any>;
  getLocationInventory: (location_id: TLocationID) => Promise<IInventoryItem[]>;
  createInventoryLocation: () => Promise<any>;
  updateInventoryLocation: () => Promise<any>;
  searchInventoryItemByLocation: () => Promise<any>;
}

const DataController = (): IDataController => {
  const getEntireInventory = async (): Promise<IInventoryItemMap> => {
    const all_string = await readFile(`${DB_PATH}/${ALL_FILE}`, 'utf8');
    const all: IInventoryItemMap = JSON.parse(all_string);
    return all;
  };

  /** Inventory Items */

  const createInventoryItem = async (new_item: IInventoryItem): Promise<any> => {
    const all: IInventoryItemMap = await getEntireInventory();

    const newAll = { ...all, [new_item.inventory_id]: { new_item } };

    const file_promise = writeFile(`${DB_PATH}/${ALL_FILE}`, JSON.stringify(newAll));

    return file_promise;
  };

  const updateInventoryItem = async (i_id: TInventoryID, newItem: IInventoryItem): Promise<any> => {
    return null;
  };

  const searchInventoryItem = async (
    field: string,
    value: string | number | TInventoryID | TLocationID
  ): Promise<any> => {
    return null;
  };

  /** Inventory Locations */

  const getLocationInventory = async (location_id: TLocationID): Promise<IInventoryItem[]> => {
    const locations_string: string = await readFile(`${DB_PATH}/${LOCATIONS_FILE}`, 'utf8');
    const locations: IInventoryLocationMap = JSON.parse(locations_string);

    const location = locations[location_id];

    const items = await getEntireInventory();

    const inventory_items: IInventoryItem[] = location.items.map((i_id: TInventoryID) => {
      return items[i_id];
    });

    return inventory_items;
  };

  const createInventoryLocation = async (): Promise<any> => {
    return null;
  };

  const updateInventoryLocation = async (): Promise<any> => {
    return null;
  };

  const searchInventoryItemByLocation = async (): Promise<any> => {
    return null;
  };

  const addItemToLocation = async (location_id: TLocationID, item_id: TInventoryID): Promise<any> => {
    return null;
  };

  const deleteItemFromLocation = async (location_id: TLocationID, item_id: TInventoryID): Promise<any> => {
    return null;
  };

  return {
    getEntireInventory,
    createInventoryItem,
    updateInventoryItem,
    searchInventoryItem,

    getLocationInventory,
    updateInventoryLocation,
    createInventoryLocation,
    searchInventoryItemByLocation,
  };
};

export default DataController;
