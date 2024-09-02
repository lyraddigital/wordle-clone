import useWordle from "./use-wordle";

const useUsedKeys = (): { [key: string]: string } => {
  const { usedKeys } = useWordle();
  return usedKeys;
};

export default useUsedKeys;
