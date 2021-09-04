// https://data.cdc.gov/resource/vbim-akqf.json
// https://api.covidtracking.com/v1/us/daily.json
import axios from "axios";

import { IDayRecord } from "../../interfaces/Record";

const DataController = async (): Promise<any> => {
  // const { data: historical_cases }: { data: [IDayRecord] } = await axios.get(
  //   "https://api.covidtracking.com/v1/us/daily.json"
  // );

  return null;
};

export default DataController;
