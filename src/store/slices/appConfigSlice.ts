import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface AppConfig {
  [key: string]: any;
  appVariables?: any;
  appConfig?: any;
}

const initialState: AppConfig = {
  appVariables: {},
  appConfig: {},
  prefabs: {},
};

export const getServiceDefinitions = createAsyncThunk(
  "appConfig/getServiceDefinitions",
  async (baseUrl: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl ?? ""}/services/servicedefs${baseUrl ? "" : ".json"}`
      );
      const data = response?.data || {};
      const serviceDefinitions = data?.serviceDefs || {};
      dispatch(updateConfig(data));
      return serviceDefinitions;
    } catch (error) {
      return rejectWithValue("Failed to fetch service definitions");
    }
  }
);

export const getPrefabDefinitions = createAsyncThunk(
  "appConfig/getPrefabDefinitions",
  async (
    { prefabName, baseUrl, pages }: { prefabName: string; baseUrl: string; pages: any[] },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const url = `${baseUrl ?? ""}/services/prefabs/${prefabName}/servicedefs${baseUrl ? "" : ".json"}`;
      const response = await axios.get(url);
      const data = { serviceDefs: response?.data?.serviceDefs || {}, baseUrl: url, pages: pages };
      dispatch(addPrefab({ prefabName, data }));
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch prefab definitions");
    }
  }
);
const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<AppConfig>>) => {
      return { ...state, ...action.payload };
    },
    addPrefab: (state, action: PayloadAction<{ prefabName: string; data: any }>) => {
      state.prefabs[action.payload.prefabName] = action.payload.data;
    },
  },
});

export const { updateConfig, addPrefab } = appConfigSlice.actions;
export default appConfigSlice.reducer;
