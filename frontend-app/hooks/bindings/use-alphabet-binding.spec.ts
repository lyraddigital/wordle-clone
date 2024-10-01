import useModals from "@/hooks/modals/use-modals";
import useWordle from "@/hooks/wordle/use-wordle";

import useAlphabetBinding from "./use-alphabet-binding";

describe("useAlphabetBinding", () => {
  it("first scenario", () => {
    jest.mock<typeof import("@/hooks/modals/use-modals")>(
      "@/hooks/modals/use-modals",
      () => ({
        showStatisticsModal: false,
        showHelpModal: false,
        setShowStatisticsModal: jest.fn<Dispatch<SetStateAction<boolean>>>(),
        setShowHelpModal: jest.fn<Dispatch<SetStateAction<boolean>>>(),
      })
    );
  });
});
