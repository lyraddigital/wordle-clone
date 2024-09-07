import useModals from "../../../hooks/use-modals";
import useWordle from "../../../hooks/use-wordle";
import CenteredModalShell from "../shell/centered-modal-shell";

import StatisticsSummary from "./statistics-summary";
import DistributionGrid from "./distribution-grid";

export default function StatisticsModal() {
    const { isGameOver } = useWordle();
    const { showStatisticsModal, setShowStatisticsModal } = useModals();
    const handlePlayAgainClick = () => {
        window.location.reload();
    };

    const playAgainButtonEl = isGameOver ? (
        <div className="mt-[20px] flex justify-center">
            <button className="bg-green-500 text-white text-2xl uppercase font-bold px-[10px] py-[4px] rounded-lg" onClick={handlePlayAgainClick}>
                Play Again
            </button>
        </div>
    ) : undefined;

    return (
        <CenteredModalShell showModal={showStatisticsModal} showCloseBox={!isGameOver} onClose={() => setShowStatisticsModal(false)} title="Statistics" footerContent={playAgainButtonEl}>
            <StatisticsSummary />
            <DistributionGrid />
        </CenteredModalShell>
    );
}