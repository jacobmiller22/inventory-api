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
  // Inventory
  getEntireInventory: () => Promise<IInventoryItemMap>;
  createInventoryItem: (newItem: IInventoryItem) => Promise<TInventoryID | null>;
  updateInventoryItem: (i_id: TInventoryID, newItem: IInventoryItem) => Promise<TInventoryID | null>;
  searchInventoryItem: (field: string, value: string | number | TInventoryID | TLocationID) => Promise<any>;
  // Locations
  getAllLocations: () => Promise<IInventoryLocationMap>;
  getLocationInventory: (location_id: TLocationID) => Promise<IInventoryItem[]>;
  createInventoryLocation: (location: IInventoryLocation) => Promise<TLocationID | null>;
  updateInventoryLocation: (location_id: TLocationID, newLocation: IInventoryLocation) => Promise<TLocationID | null>;
  searchInventoryItemByLocation: () => Promise<any>;
  addItemToLocation: (location_id: TLocationID, item_id: TInventoryID) => Promise<any>;
  deleteItemFromLocation: (location_id: TLocationID, item_id: TInventoryID) => Promise<any>;
}

const DataController = (): IDataController => {
  /** Inventory Items */

  /**
   *
   * Gets the entire inventory from the database
   *
   * @returns A Promise that resolves to a map of all inventory items.
   */
  const getEntireInventory = async (): Promise<IInventoryItemMap> => {
    const all_string = await readFile(`${DB_PATH}/${ALL_FILE}`, 'utf8');
    const all: IInventoryItemMap = JSON.parse(all_string);
    return all;
  };

  /**
   *
   * @param newItem The new item to be added to the inventory
   * @returns A promise that resolves to the new item's inventory_id, null if the item already exists, or if an error occurred.
   */
  const createInventoryItem = async (newItem: IInventoryItem): Promise<TInventoryID | null> => {
    const all: IInventoryItemMap = await getEntireInventory();

    if (all[newItem.inventory_id]) {
      // Item already exists.. Update should be called
      return null;
    }

    const newAll = { ...all, [newItem.inventory_id]: newItem };

    writeFile(`${DB_PATH}/${ALL_FILE}`, JSON.stringify(newAll));

    return newItem.inventory_id;
  };

  /**
   *
   * @param i_id The inventory_id of the item to be updated
   * @param newItem The new item to be added to the inventory
   * @returns A promise that resolves to the updated item's inventory_id, null if the item doesn't exist, or if an error occurred.
   */
  const updateInventoryItem = async (
    inventory_id: TInventoryID,
    newItem: IInventoryItem
  ): Promise<TInventoryID | null> => {
    const all: IInventoryItemMap = await getEntireInventory();

    if (!all[inventory_id]) {
      // Item already exists.. Create should be called
      return null;
    }

    if (newItem.inventory_id !== inventory_id) {
      // This is an error if the new item has a different inventory_id than the one specified
      return null;
    }

    const newAll = { ...all, [inventory_id]: newItem };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newAll));

    return inventory_id;
  };

  const searchInventoryItem = async (
    field: string,
    value: string | number | TInventoryID | TLocationID
  ): Promise<any> => {
    return null;
  };

  /** Inventory Locations */

  /**
   *
   * Retrive all locations from the database
   *
   * @returns A Promise that resolves to a map of all inventory locations.
   */
  const getAllLocations = async (): Promise<IInventoryLocationMap> => {
    const locations_string: string = await readFile(`${DB_PATH}/${LOCATIONS_FILE}`, 'utf8');
    const locations: IInventoryLocationMap = JSON.parse(locations_string);
    return locations;
  };

  /**
   *
   * Retrieve all items in a location
   *
   * @param location_id The id of the location to be retrieved
   * @returns An array containing of the InventoryItems in the location
   */
  const getLocationInventory = async (location_id: TLocationID): Promise<IInventoryItem[]> => {
    const locations: IInventoryLocationMap = await getAllLocations();

    const location = locations[location_id];

    const items = await getEntireInventory();

    const inventory_items: IInventoryItem[] = location.items.map((i_id: TInventoryID) => {
      return items[i_id];
    });

    return inventory_items;
  };

  /**
   *
   * Create a new location in the database
   *
   * @param location The location to be added to the database
   * @returns A promise that resolves to the location's location_id, null if the location already exists, or if an error occurred.
   */
  const createInventoryLocation = async (location: IInventoryLocation): Promise<TLocationID | null> => {
    const locations: IInventoryLocationMap = await getAllLocations();

    if (locations[location.location_id]) {
      // Location already exists.. Update should be called
      return null;
    }

    const newLocations = { ...locations, [location.location_id]: location };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location.location_id;
  };

  /**
   *
   * @param location_id The id of the location to be updated
   * @param newLocation The new location to be added to the database
   * @returns A promise that resolves to the location's location_id, null if the location doesn't exist, or if an error occurred.
   */
  const updateInventoryLocation = async (
    location_id: TLocationID,
    newLocation: IInventoryLocation
  ): Promise<TLocationID | null> => {
    const locations: IInventoryLocationMap = await getAllLocations();

    if (!locations[location_id]) {
      // Location doesn't exist.. Create should be called
      return null;
    }

    if (newLocation.location_id !== location_id) {
      // This is an error if the new location has a different location_id than the one specified
      return null;
    }

    const newLocations = { ...locations, [location_id]: newLocation };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location_id;
  };

  const searchInventoryItemByLocation = async (): Promise<any> => {
    return null;
  };

  /**
   *
   * Adds an item to a new location
   *
   * @param location_id The id of the location for the item to be added
   * @param item_id The id of the item to be added
   * @returns Returns a promise that resolves to the new location_id, null if the item exists at the new location already, or if an error occurred.
   */
  const addItemToLocation = async (location_id: TLocationID, item_id: TInventoryID): Promise<any> => {
    const locations: IInventoryLocationMap = await getAllLocations();

    if (locations[location_id].items.includes(item_id)) {
      // The item already exists in this location.. Nothing to add
      return null;
    }

    const newLocations = {
      ...locations,
      [location_id]: { ...locations[location_id], items: [...locations[location_id].items, item_id] },
    };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location_id;
  };

  /**
   *
   * Deletes an item from a location
   *
   * @param location_id The id of the location for which the item should be removed
   * @param item_id The id of the item to be removed
   * @returns Returns a promise that resolves to the new location_id, null if the item doesn't exist in the location, or if an error occurred.
   */
  const deleteItemFromLocation = async (location_id: TLocationID, item_id: TInventoryID): Promise<any> => {
    const locations: IInventoryLocationMap = await getAllLocations();

    const itemIndex = locations[location_id].items.indexOf(item_id);

    if (itemIndex === -1) {
      // The item does not exist at this location.. Nothing to delete
      return null;
    }

    const newItems = locations[location_id].items.filter((i_id: TInventoryID) => i_id !== item_id);

    const newLocations = {
      ...locations,
      [location_id]: { ...locations[location_id], items: newItems },
    };

    writeFile(`${DB_PATH}/${LOCATIONS_FILE}`, JSON.stringify(newLocations));

    return location_id;
  };

  return {
    getEntireInventory,
    createInventoryItem,
    updateInventoryItem,
    searchInventoryItem,
    getAllLocations,
    getLocationInventory,
    createInventoryLocation,
    updateInventoryLocation,
    searchInventoryItemByLocation,
    addItemToLocation,
    deleteItemFromLocation,
  };
};

export default DataController;
