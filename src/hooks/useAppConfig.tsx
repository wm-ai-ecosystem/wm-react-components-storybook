import { useAppDispatch } from "../store";
import { getServiceDefinitions } from "@wavemaker/react-runtime/store/slices/appConfigSlice";

export const useAppConfig = () => {
  const dispatch = useAppDispatch();

  const getServiceDefinitionsData = async (baseURL: string) => {
    if (!baseURL) {
      return Promise.resolve({});
    }
    return await dispatch(getServiceDefinitions(baseURL)).unwrap();
  };

  return {
    getServiceDefinitionsData,
  };
};
